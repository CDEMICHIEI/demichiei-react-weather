import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import {loadZip} from './lib/weatherService';
import {getDay, cullWeek, firstLettersUpper} from './util/functions';

const monday = {
    dt_txt:"Monday",
    main:{
      temp:75
    },
    weather:[{
      icon:"01d",
      description:"Sunny"}
    ]
}
const ZipInput = (props) => {


  return(
    <div className='row'>
      <form onSubmit={props.handleSubmit} className=''>
        <div className='form-group col-xs-2 col-xs-offset-5'>
          <label>Zip Code</label>
          <input type="text"
            className='zipInput form-control'
            onChange={props.handleInputChange}
            value={props.zip} />
        </div>
      </form>
    </div>
  )
}

const Weather = (props) => {
  const day = props.day
  const date = getDay(day.dt)
  return (
  <div className="fancybox">
    <div className="day">{date}</div>
    <div className="temp">{day.main.temp.toFixed(0)}°</div>
    <div className="">
      <img className="icon" alt="sunny" src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}/>
    </div>
    <div className="weather">{firstLettersUpper(day.weather[0].description)}</div>
  </div>
)}

Weather.requiredProps = {
  day: PropTypes.object
}
Weather.defaultProps = {
  day:{
    dt_txt:"---day",
    main:{
      temp:0
    },
    weather:[{
      icon:"01d",
      description:"--"}
    ]
  }}

const Daily = (props) => {
  return(
    <div className="row daily">
      <h2>Today's Forecast {props.day.name}</h2>
      <div className="center-block today">
        <Weather {...props}/>
      </div>
    </div>
  )
}

const Forecast = (props) => {
  const week = props.days.map((day,i) =>
  <div className='col-xs-2' key={i}>
    <Weather day={day} />
  </div>)
  return (
    <div className="row forecast">
      <h3>5-day Forecast</h3>
      <div className='col-xs-1'/>
      {week}
    </div>
  )
}

class App extends Component {
  state ={
    zip:'12345',
    today:monday,
    week:[],
    city:"This area",
    zipHistory:[]
  }

  handleInputChange = (e) => {
    const val =  e.target.value
    this.setState({zip:val})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const zip =  this.state.zip
    if (zip.match(/^\d{5}$/)) {
    loadZip(zip)
     .then(response => this.setState({
       today: response.today,
       city: response.today.name,
       week : cullWeek(response.week)
     }))
   }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Find your local forcast</h2>
        </div>
        <div className="container">
          <ZipInput
            zip={this.state.zip}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
          />
          <Daily day={this.state.today}/>
          <Forecast days={this.state.week}/>
        </div>
      </div>
    );
  }
}

export default App;
