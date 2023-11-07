import React from 'react'
import fetch from 'isomorphic-fetch'
import locationsData from './locations'
import { debounce, metersToMiles, secondsToTime } from './helpers'

const config = {
  baseURL: 'https://api.mapbox.com',
  geocodePath: '/geocoding/v5/mapbox.places/',
  matrixPath: '/directions-matrix/v1/mapbox/driving/',
  storeCoordinateGroups: [[]],
}

// Add store coordinates to groups in config
// Max 25 coordinates per group (MapBox limit). Leaving 1 spot open for the source coordinates.
locationsData.forEach(loc => {
  // Check if group is full
  if (config.storeCoordinateGroups[config.storeCoordinateGroups.length - 1].length === 24) {
    // Start a new group
    config.storeCoordinateGroups.push([])
  }
  const groupNumber = config.storeCoordinateGroups.length - 1
  config.storeCoordinateGroups[groupNumber].push(`${loc.geolocation.lng},${loc.geolocation.lat}`)
})

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      searchCoords: [],
      error: '',
      loading: false,
      success: '',
      suggestions: [],
      suggestionsHidden: true,
      locations: locationsData,
    }

    this.handleChange = this.handleChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.getMatrix = this.getMatrix.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onError = this.onError.bind(this)
    this.updateDistances = this.updateDistances.bind(this)
    this.fetchSuggestions = debounce(this.fetchSuggestions, 400)
    this.updateWithSuggestion = this.updateWithSuggestion.bind(this)
    this.hideSuggestions = this.hideSuggestions.bind(this)
    this.showSuggestions = this.showSuggestions.bind(this)
  }
  handleChange(e) {
    this.setState({
      search: e.target.value,
    })
    if (e.target.value) {
      this.fetchSuggestions()
    }
  }
  hideSuggestions() {
    if (!this.state.suggestionsHidden) {
      this.setState({
        suggestionsHidden: true,
      })
    }
  }
  showSuggestions() {
    if (this.state.suggestionsHidden) {
      this.setState({
        suggestionsHidden: false,
      })
    }
  }
  fetchSuggestions() {
    this.onSearch()
  }
  updateWithSuggestion(e) {
    if (this.state.search === e.target.innerHTML) return

    let suggestionObj = this.state.suggestions.find(
      suggestion => suggestion.name.toLowerCase() === e.target.innerHTML.toLowerCase()
    )

    this.setState({
      search: e.target.innerHTML,
      searchCoords: suggestionObj.coords,
      suggestionsHidden: true,
    })

    this.getMatrix(suggestionObj.coords)
  }
  async getMatrix(searchCoords) {
    const output = []
    for (let i = 0; i < config.storeCoordinateGroups.length; i++) {
      const searchURL =
        config.baseURL +
        config.matrixPath +
        searchCoords.join(',') +
        ';' +
        config.storeCoordinateGroups[i].join(';') +
        '/?access_token=' +
        process.env.REACT_APP_MAPBOX_TOKEN +
        '&annotations=duration,distance&sources=0'

      await fetch(searchURL, {
        method: 'GET',
      })
        .then(res => {
          if (res.status !== 200) {
            this.onError(`Error: ${res.statusText}`)
          }
          return res.json()
        })
        .then(data => {
          output.push(data)
        })
        .catch(err => {
          this.onError(`Error: ${err}`)
        })
    }
    // Combine responses
    const data = output.reduce((acc, obj) => {
      // Remove source from each
      obj.distances[0].shift()
      obj.durations[0].shift()
      obj.destinations.shift()
      // Add them
      acc.distances[0].push(...obj.distances[0])
      acc.durations[0].push(...obj.durations[0])
      acc.destinations.push(...obj.destinations)
      return acc
    })
    this.updateDistances(data)
  }
  updateDistances(body) {
    const updatedLocations = [...locationsData]

    for (let i = 0; i < updatedLocations.length; i++) {
      let time = body.durations[0][i + 1]
      updatedLocations[i].duration = time
      let distance = body.distances[0][i + 1]
      updatedLocations[i].distance = distance
    }

    updatedLocations.sort((a, b) => {
      if (a.duration < b.duration) {
        return -1
      }
      if (a.duration > b.duration) {
        return 1
      }
      return 0
    })

    this.setState({
      locations: updatedLocations,
    })
  }
  async onSearch() {
    let searchURL =
      config.baseURL +
      config.geocodePath +
      encodeURIComponent(this.state.search) +
      '.json?access_token=' +
      process.env.REACT_APP_MAPBOX_TOKEN
    let res, body

    try {
      res = await fetch(searchURL, {
        method: `get`,
      })
    } catch (err) {
      return this.onError(`Connection error`)
    }

    if (res.status !== 200) {
      return this.onError(`Error: ${res.statusText}`)
    }

    try {
      body = await res.json()
    } catch (err) {
      return this.onError(`Error parsing JSON`)
    }

    this.onSuccess(body)
  }
  onSuccess(body) {
    if (!body.features[0]) return

    let locations = []

    let len = body.features.length

    if (len > 5) {
      len = 5
    }

    for (let i = 0; i < len; i++) {
      locations.push({
        name: body.features[i].place_name,
        coords: body.features[i].geometry.coordinates,
      })
    }

    this.setState({
      loading: false,
      success: body,
      error: false,
      suggestions: locations,
      suggestionsHidden: false,
    })
  }
  onError(err) {
    this.setState({
      loading: false,
      error: err,
      success: false,
    })
  }
  componentDidMount() {
    document.addEventListener('click', d => {
      if (d.target.id === 'search' || d.target.class === 'search-item') {
        this.showSuggestions()
      } else {
        this.hideSuggestions()
      }
    })
  }
  render() {
    return (
      <div className='main'>
        <div className='search'>
          <div>
            <input
              type='text'
              id='search'
              className='search-bar'
              onClick={this.showSuggestions}
              onChange={this.handleChange}
              value={this.state.search}
              autoFocus
              placeholder='Search...'
            />
            {this.state.suggestions.length > 0 && (
              <ul
                className='suggestions-list'
                style={!this.state.suggestionsHidden ? { display: 'block' } : { display: 'none' }}
              >
                {this.state.suggestions.map((suggestion, key) => (
                  <li key={key} className='search-item' onClick={this.updateWithSuggestion}>
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='results'>
          <table className='results-table'>
            <tbody>
              <tr>
                <th>Location</th>
                {/* <th>Phone</th>
                <th>After Hours Parts</th>
                <th>After Hours Service</th> */}
                <th>Distance</th>
                <th>Drive Time</th>
              </tr>
              {this.state.locations.map((location, key) => (
                <tr key={key}>
                  <td>
                    <div className='location-header'>
                      <h3>
                        <a href={`https://www.hutsoninc.com/locations/${location.handle}/`}>
                          {location.title}
                        </a>
                      </h3>
                    </div>
                    <p className='location-address'>
                      <a href={location.googleMapsLink}>
                        {location.address}, {location.city}, {location.state} {location.zip}
                      </a>
                    </p>
                  </td>
                  {/* <td>
                    <span className='mobile-label'>Phone</span>
                    <p className='phone-number'>{location.phoneNumber}</p>
                  </td>
                  <td>
                    <span className='mobile-label'>After Hours Parts</span>
                    <p className='phone-number'>{location.partsPhoneNumber || '-'}</p>
                  </td>
                  <td>
                    <span className='mobile-label'>After Hours Service</span>
                    <p className='phone-number'>{location.servicePhoneNumber || '-'}</p>
                  </td> */}
                  <td>
                    <span className='mobile-label'>Distance</span>
                    {location.distance ? <p>{metersToMiles(location.distance)} miles</p> : <p>-</p>}
                  </td>
                  <td>
                    <span className='mobile-label'>Drive Time</span>
                    {location.duration ? <p>{secondsToTime(location.duration)}</p> : <p>-</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
