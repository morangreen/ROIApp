import React, {Component} from 'react';
import {fetchCountries, fetchCompanies, fetchCompanyDetails} from '../services/apiService';
import WorldMap from '../components/worldMap';
import CompanySelection from '../components/companySelection';
import CountrySelection from '../components/countrySelection';
import {parseCountriesByIso, calcCompanyROI, calcIndustryROI, findCompanyDetailsInCountry} from '../utils/parserUtil';

export default class ROIContainer extends Component {
  state = {
    companies: [],
    indexedCompanies: {},
    countries: [],
    indexedCountries: {}
  };

  componentDidMount() {
    fetchCompanies(this.handleFetchCompaniesSuccess);
    fetchCountries(this.handleFetchCountriesSuccess);
  }

  render() {
    const {companies, indexedCompanies, countries, indexedCountries, selectedCountryIso, selectedCompanyId} = this.state;
    const companyDetails = findCompanyDetailsInCountry(indexedCompanies[selectedCompanyId], selectedCountryIso);
    const countryDetails = indexedCountries[selectedCountryIso];

    return (
      <div className='roi-app'>
        <div className='roi-app__companies'>
          <CompanySelection
            companies={companies}
            onChange={this.handleCompanyChange}
          />
        </div>
        <div className='roi-app__map'>
          <WorldMap
            countryName={countryDetails && countryDetails.country}
            countryIso={selectedCountryIso}
            companyROI={companyDetails && calcCompanyROI(companyDetails)}
            industryROI={companyDetails && calcIndustryROI(companyDetails, countryDetails)}
          />
          <CountrySelection
            countries={countries}
            onChange={this.handleCountryChange}
          />
        </div>
      </div>
    );
  }

  handleCompanyChange = (selectedCompanyId) => {
    this.setState({selectedCompanyId}, () => {
      selectedCompanyId && fetchCompanyDetails(selectedCompanyId, this.handleFetchCompanyDetailsSuccess);
    });
  }

  handleCountryChange = (selectedCountryIso) => {
    this.setState({selectedCountryIso});
  }

  handleFetchCompaniesSuccess = (companies) => {
    this.setState({companies});
  }

  handleFetchCountriesSuccess = (countries) => {
    this.setState({countries});
    this.setState({indexedCountries: parseCountriesByIso(countries)});
  }

  handleFetchCompanyDetailsSuccess = (companyDetails) => {
    this.setState({
      indexedCompanies: {
        ...this.state.indexedCompanies,
        [this.state.selectedCompanyId]: companyDetails
      }
    });
  }
};
