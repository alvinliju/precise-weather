import React from 'react';
import WeatherResult from './WeatherResult';
import axios from 'axios';


class Weather extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          addressData: [],
          coordinate: [],
          postcodeInput: '',
          displayResult: false
        };
    this.handleINputChange = this.handleINputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    async getCoord() {
        const postcodeAPI = `http://api.postcodes.io/postcodes/${this.state.postcodeInput}`;
    
        let response = await fetch(postcodeAPI);
        await response.json().then(response => {
            this.setState({
                addressData: response,
                coordinate: [response.result.latitude, response.result.longitude]
            });
            let coord = {
                latitude: this.state.coordinate[0],
                longitude: this.state.coordinate[1]
            }
            axios.post('http://localhost:4001/search-location', coord)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        displayResult: true
                    });
                }, (error) => {
                    console.log(error);
                });
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.getCoord();
    }

    handleINputChange(e){
        this.setState({
            postcodeInput: e.target.value,
            displayResult:false
        });
    }
    render() {
        return (
             <div>
                <form onSubmit={this.handleSubmit}>
                    <p className="title">Precise Weather</p>
                    <p className="subtitle">A complete full stcak weather app using node js and react js</p>
                    <div>
                        <div className="field">
                            <label className="label"></label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Type UK postcode here" onChange={this.handleInputChange} required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input type='submit' className="button is-light is-large" value='Search' />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="column">
                    {this.state.displayResult ? <WeatherResult /> : null}
                </div>
            </div>
        )
    }
}

export default Weather;
