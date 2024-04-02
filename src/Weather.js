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
        // get geological coordinates from postcode input
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
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p className='title'>Weather</p>
                    <p className='subtitle'>Check UK weather by entering postcode</p>
                </form>
            </div>
        )
    }
}

export default Weather
