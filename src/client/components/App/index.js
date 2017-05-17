import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import ZipInputForm from '../ZipInputForm';
import Daily from '../Daily';
import Forecast from '../Forecast';
import BackgroundImage from '../BackgroundImage';

import { loadZip } from '../../lib/weatherService';
import { loadHistory, saveHistory } from '../../lib/historyService';
import { cullWeek } from '../../util/functions';


class App extends Component {
  state ={
    zip: '',
    today: '',
    week: [],
    city: 'This area',
    zipHistory: [],
    errMessage: '',
    conditionCode: '',
  }
  componentDidMount() {
    // get search history;
    // This api call should be outside of the didMount
    loadHistory()
     .then(x => this.setState({ zipHistory: x.sort((a, b) => a.city.charCodeAt(0) - b.city.charCodeAt(0)) }));
  }

  setErrorMessage = (message) => {
    this.setState({ errMessage: message });
  }
/*
Too much stuff going on in this handler.
Needs to be pulled out and simplified.
*/
  submitZipcode = (zip) => {
    const zipInput = zip;
    const hist = this.state.zipHistory;
    loadZip(zipInput)
     .then(response => {
      //  console.log(response);
       if (response.today.cod === 200) {
         const newZip = { zipcode: zipInput, id: (+zipInput), city: response.today.name };
         const newHist = (!hist.map(x => x.zipcode).includes(newZip.zipcode)) ? hist.concat(newZip) : hist;
         const conditionCode = response.today ? response.today.weather[0].id.toString() : '';

         this.setState({
           zip: '',
           today: response.today,
           city: response.today.name,
           week: cullWeek(response.week),
           zipHistory: newHist,
           conditionCode,
           errMessage: '',
         });
         if (newHist !== hist) {
           saveHistory(newZip);
         }
       } else {
         this.setErrorMessage('No city exists with this zip code.');
         this.setState({ zip: '' });
       }
     });
  };

  render() {
    // console.log('render APP');
    const errMessage = this.state.errMessage || '';
    return (
      <div className="App" >
        <BackgroundImage conditionCode={this.state.conditionCode} />
        <div className="App-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-2 col-sm-12"><img src={logo} className="App-logo" alt="logo" /></div>
              <div className="col-xs-10 col-sm-12"><h2>Find your local forecast</h2></div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <ZipInputForm
            zip={this.state.zip}
            submitZipcode={this.submitZipcode}
            setErrorMessage={this.setErrorMessage}
            history={this.state.zipHistory}
            errMessage={errMessage}
          />
          {this.state.today &&
            <Daily day={this.state.today} />
          }
          {this.state.week.length > 0 &&
            <Forecast days={this.state.week} />
          }
        </div>
      </div>
    );
  }
}

export default App;
