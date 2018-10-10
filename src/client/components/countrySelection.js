import React, {Component} from 'react';

export default class CountrySelection extends Component {
  state = {};

  render() {
    return (<div className='countries-select'>{this.renderOptions()}</div>);
  }

  renderOptions = () => {
    return this.props.countries.map((country) => {
      return (
        <div
          key={country.iso}
          className='countries-select__item'>
          <input
            checked={this.state.selectedCountryIso === country.iso}
            onChange={this.handleChange}
            name='countries-select'
            id={country.iso}
            value={country.iso}
            type='radio'/>
          <label htmlFor={country.iso}>{country.country}</label>
        </div>
      );
    });
  }

  handleChange = (event) => {
    const selectedCountryIso = event.target.value;

    this.setState({selectedCountryIso});
    this.props.onChange(selectedCountryIso);
  }
};
