import React from 'react';
import PropTypes from 'prop-types';
import ZipHistoryList from '../ZipHistoryList';
import ErrorMessage from '../ErrorMessage';

class ZipInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ zipcode: e.target.value.trim() });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.zipcode.match(/^\d{5}$/)) {
      this.props.submitZipcode(this.state.zipcode);
      this.setState({ zipcode: '' });
      this.props.setErrorMessage('');
    } else {
      this.setState({ zipcode: '' });
      this.props.setErrorMessage('Zip code must be a five-digit number.');
    }
  }

  render() {
    // console.log('render zip input form');
    return (
      <div className="row">
        <div className="fancybox col-xs-12 col-sm-4 col-sm-offset-4">
          <ErrorMessage errMessage={this.props.errMessage} />
          <label className="" htmlFor="zipInput">Zip Code</label>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input
                className="form-control"
                id="zipInput"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.zipcode}
                list="history"
              />
              <span className="input-group-btn"><button className="btn btn-primary" type="submit" >Go</button></span>
            </div>
            <ZipHistoryList history={this.props.history} />
          </form>
        </div>
      </div>
    );
  }
}

ZipInputForm.propTypes = {
  submitZipcode: PropTypes.func,
  setErrorMessage: PropTypes.func,
  history: PropTypes.array,
  zip: PropTypes.string,
  errMessage: PropTypes.string,
};

export default ZipInputForm;
