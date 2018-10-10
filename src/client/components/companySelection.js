import React, {Component} from 'react';

const defaultCompanyId = '0';

export default class CompanySelection extends Component {
  state = {selectedCompanyId: defaultCompanyId};

  render() {
    return (
      <select
        value={this.state.selectedCompanyId}
        onChange={this.handleChange}
        className='companies-select'>
        <option value={defaultCompanyId}>-- select a company --</option>
        {this.renderOptions()}
      </select>
    );
  }

  renderOptions = () => {
    return this.props.companies.map((company) => {
      return (
        <option
          key={company.id}
          value={company.id}>
          {company.display_name}
        </option>
      );
    });
  }

  handleChange = (event) => {
    const selectedCompanyId = event.target.value;

    this.setState({selectedCompanyId});
    this.props.onChange(selectedCompanyId === defaultCompanyId ? undefined : selectedCompanyId);
  }
};
