import React from 'react';
import fetch from 'isomorphic-fetch';
import hutsonData from 'hutson-location-data';
import { debounce, metersToMiles, secondsToTime, formatPhoneNumber } from './helpers';

require('dotenv').config();

const config = {
    baseURL: 'https://api.mapbox.com',
    geocodePath: '/geocoding/v5/mapbox.places/',
    matrixPath: '/directions-matrix/v1/mapbox/driving/',
    hutsonCoords: []
};

let data = hutsonData;

data.map(loc => {
    config.hutsonCoords.push(loc.coordinates.join(','));
    loc.phone = formatPhoneNumber(loc.phone);
    loc.partsPhone = formatPhoneNumber(loc.partsPhone);
    loc.servicePhone = formatPhoneNumber(loc.servicePhone);
    return loc;
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            searchCoords: [],
            error: '',
            loading: false,
            success: '',
            suggestions: [],
            suggestionsHidden: true,
            locations: data
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getMatrix = this.getMatrix.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.updateDistances = this.updateDistances.bind(this);
        this.fetchSuggestions = debounce(this.fetchSuggestions, 400);
        this.updateWithSuggestion = this.updateWithSuggestion.bind(this);
        this.hideSuggestions = this.hideSuggestions.bind(this);
        this.showSuggestions = this.showSuggestions.bind(this);
    }
    handleChange(e) {
        this.setState({
            search: e.target.value
        });
        if (e.target.value) {
            this.fetchSuggestions();
        }
    }
    hideSuggestions() {
        if (!this.state.suggestionsHidden) {
            this.setState({
                suggestionsHidden: true
            });
        }
    }
    showSuggestions() {
        if (this.state.suggestionsHidden) {
            this.setState({
                suggestionsHidden: false
            });
        }
    }
    fetchSuggestions() {
        this.onSearch();
    }
    updateWithSuggestion(e) {
        if (this.state.search === e.target.innerHTML) return;

        let suggestionObj = this.state.suggestions.find(suggestion => suggestion.name.toLowerCase() === e.target.innerHTML.toLowerCase());

        this.setState({
            search: e.target.innerHTML,
            searchCoords: suggestionObj.coords,
            suggestionsHidden: true
        });

        this.getMatrix(suggestionObj.coords);
    }
    async getMatrix(searchCoords) {
        let searchURL = config.baseURL + config.matrixPath + searchCoords.join(',') + ';' + config.hutsonCoords.join(';') + '/?access_token=' + process.env.REACT_APP_MAPBOX_TOKEN + '&annotations=duration,distance&sources=0';
        let res, body;

        try {
            res = await fetch(searchURL, {
                method: `get`
            });
        } catch (err) {
            return this.onError(`Connection error`);
        }

        if (res.status !== 200) {
            return this.onError(`Error: ${res.statusText}`);
        }

        try {
            body = await res.json();
        } catch (err) {
            return this.onError(`Error parsing JSON`);
        }

        this.updateDistances(body);
    }
    updateDistances(body) {
        let updatedLocations = data;

        for (let i = 0; i < updatedLocations.length; i++) {
            let time = body.durations[0][i + 1];
            updatedLocations[i].duration = time;
            let distance = body.distances[0][i + 1];
            updatedLocations[i].distance = distance;
        }

        let sortedLocations = Array.from(updatedLocations);

        sortedLocations.sort((a, b) => {
            if (a.duration < b.duration) {
                return -1;
            }
            if (a.duration > b.duration) {
                return 1;
            }
            return 0;
        });

        this.setState({
            locations: sortedLocations
        });

    }
    async onSearch() {

        let searchURL = config.baseURL + config.geocodePath + encodeURIComponent(this.state.search) + '.json?access_token=' + process.env.REACT_APP_MAPBOX_TOKEN;
        let res, body;

        try {
            res = await fetch(searchURL, {
                method: `get`
            });
        }
        catch (err) {
            return this.onError(`Connection error`);
        }

        if (res.status !== 200) {
            return this.onError(`Error: ${res.statusText}`);
        }

        try {
            body = await res.json();
        }
        catch (err) {
            return this.onError(`Error parsing JSON`);
        }

        this.onSuccess(body);
    }
    onSuccess(body) {

        if (!body.features[0]) return;

        let locations = [];

        for (let i = 0; i < 5; i++) {
            locations.push({
                name: body.features[i].place_name,
                coords: body.features[i].geometry.coordinates
            });
        }

        this.setState({
            loading: false,
            success: body,
            error: false,
            suggestions: locations,
            suggestionsHidden: false
        });
    }
    onError(err) {
        this.setState({
            loading: false,
            error: err,
            success: false,
        });
    }
    componentDidMount() {
        document.addEventListener('click', d => {
            if (d.target.id === 'search' || d.target.class === 'search-item') {
                this.showSuggestions();
            } else {
                this.hideSuggestions();
            }
        });
    }
    render() {
        return (
            <div className="main">
                <div className="search">
                    <div>
                        <input type="text" id="search" className="search-bar" onClick={this.showSuggestions} onChange={this.handleChange} value={this.state.search} autoFocus placeholder="Search..." />
                        {this.state.suggestions.length > 0 &&
                            <ul className="suggestions-list" style={!this.state.suggestionsHidden ? { display: 'block' } : { display: 'none' }}>
                                {this.state.suggestions.map((suggestion, key) => (
                                    <li key={key} className="search-item" onClick={this.updateWithSuggestion}>{suggestion.name}</li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
                <div className="results">
                    <table className="results-table">
                        <tbody>
                            <tr>
                                <th>
                                    Location
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th>
                                    Parts
                                </th>
                                <th>
                                    Service
                                </th>
                                <th>
                                    Drive Time
                                </th>
                            </tr>
                            {this.state.locations.map((location, key) => (
                                <tr key={key}>
                                    <td>
                                        <div className="location-header">
                                            <h3>{location.title}</h3>
                                            {location.distance &&
                                                <span>
                                                    ({metersToMiles(location.distance)} miles)
                                                </span>
                                            }
                                        </div>
                                        <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                                    </td>
                                    <td>
                                        <p>{location.phone}</p>
                                    </td>
                                    <td>
                                        <p>{location.partsPhone || '-'}</p>
                                    </td>
                                    <td>
                                        <p>{location.servicePhone || '-'}</p>
                                    </td>
                                    <td>
                                        {location.duration &&
                                            <p>{secondsToTime(location.duration)}</p>
                                        }
                                        {!location.duration &&
                                            <p>-</p>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}