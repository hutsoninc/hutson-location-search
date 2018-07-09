import React from 'react';
import fetch from 'isomorphic-fetch';
import data from '../data/store-data';
import { debounce } from './helpers';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const config = {
    baseURL: 'https://api.mapbox.com',
    geocodePath: '/geocoding/v5/mapbox.places/',
    matrixPath: '/directions-matrix/v1/mapbox/driving/',
    hutsonCoords: []
};

data.forEach(loc => {
    config.hutsonCoords.push(loc.coordinates.join(','));
});

function metersToMiles(meters){
    return meters / 1609.344;
}

function secondsToTime(seconds){
    let h, m;
    let out = [];

    if(seconds / 3600 > 1) {
        h = Math.floor(seconds / 3600);
        seconds = seconds - h * 3600;
        out.push(h + 'h');
    }

    m = Math.floor(seconds / 60);
    out.push(m + 'm');

    return out.join(' ');
}

export default class extends React.Component {
    constructor(props){
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
    }

    handleChange(e) {
        
        this.setState({
            search: e.target.value
        });

        if(e.target.value){
            this.fetchSuggestions();
        }
    }

    fetchSuggestions(){
        this.onSearch();
    }

    updateWithSuggestion(e){
        let suggestionObj = this.state.suggestions.find(suggestion => suggestion.name.toLowerCase() === e.target.innerHTML.toLowerCase());
        
        this.setState({
            search: e.target.innerHTML,
            searchCoords: suggestionObj.coords,
            suggestionsHidden: true
        });

        this.getMatrix(suggestionObj.coords);
    }

    async getMatrix(searchCoords){
        let searchURL = config.baseURL + config.matrixPath + searchCoords.join(',') + ';' + config.hutsonCoords.join(';') + '/?access_token=' + process.env.REACT_APP_MAPBOX_TOKEN;
        let res, body;

        try {
			res = await fetch(searchURL, {
				method: `get`
			});
		}
		catch(err) {
            // return this.onError(`Connection error`);
            console.log(err);
        }
        
		if (res.status !== 200) {
			return this.onError(`Error: ${res.statusText}`);
        }
        
		try {
			body = await res.json();
        }
        catch(err) {
			return this.onError(`Error parsing JSON`);
        }

        console.log(body);

        this.updateDistances(body);
    }

    updateDistances(body){
        let updatedLocations = this.state.locations;

        for(let i = 0; i < updatedLocations.length; i++){
            let time = body.durations[0][i + 1];
            updatedLocations[i].duration = time;
        }
          
        updatedLocations.sort((a, b) => {
            if (a.duration < b.duration)
              return -1;
            if (a.duration > b.duration)
              return 1;
            return 0;
        });

        this.setState({
            locations: updatedLocations
        })

    }

    async onSearch(){

        let searchURL = config.baseURL + config.geocodePath + encodeURIComponent(this.state.search) + '.json' + '?access_token=' + process.env.REACT_APP_MAPBOX_TOKEN;
        let res, body;

        try {
			res = await fetch(searchURL, {
				method: `get`
			});
		}
		catch(err) {
            // return this.onError(`Connection error`);
            console.log(err);
        }
        
		if (res.status !== 200) {
			return this.onError(`Error: ${res.statusText}`);
        }
        
		try {
			body = await res.json();
        }
        catch(err) {
			return this.onError(`Error parsing JSON`);
        }

        this.onSuccess(body);
    }

    onSuccess(body) {

        let locations = [];

        for(let i = 0; i < 5; i++) {
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
        
        console.log(this.state.success);
    }
    
	onError(err) {
        console.error(err);
                
		this.setState({
			loading: false,
			error: err,
			success: false,
		});
    }
    
    render(){
        return (
            <div className="main">
                <div className="search">
                    <h2>Enter an address</h2>
                    <div>
                        <input type="text" className="search-bar" onChange={this.handleChange} value={this.state.search} placeholder="Search..." />
                        {this.state.suggestions.length > 0 && !this.state.suggestionsHidden &&
                            <ul className="suggestions-list">
                                {this.state.suggestions.map((suggestion, key) => (
                                    <li key={key} onClick={this.updateWithSuggestion}>{suggestion.name}</li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
                <div className="results">
                    <ul className="results-list">
                        {this.state.locations.map((location, key) => (
                            <li key={key}>
                                <h3>{location.name}</h3>
                                <p>{location.address}</p>
                                {location.duration &&
                                    <p>Drive time: {secondsToTime(location.duration)}</p>
                                }
                                <p>Phone: {location.phone}</p>
                                {location.parts &&
                                    <p>Parts: {location.parts}</p>
                                }
                                {location.service &&
                                    <p>Service: {location.service}</p>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}