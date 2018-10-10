const emptyRevenueCost = {revenue: 0, cost: 0};

export const parseCountriesByIso = (countries) => {
  return countries.reduce((countriesByIso, country) => {
    countriesByIso[country.iso] = country;

    return countriesByIso;
  }, {});
};

export const calcCompanyROI = (companyDetails = emptyRevenueCost) => {
  return Math.round((companyDetails.revenue / companyDetails.cost) * 100);
};

export const calcIndustryROI = (companyDetails = emptyRevenueCost, countryDetails = emptyRevenueCost) => {
  const revenue = countryDetails.revenue - companyDetails.revenue;
  const cost = countryDetails.cost - companyDetails.cost;

  return Math.round((revenue / cost) * 100);
};

export const findCompanyDetailsInCountry = (companyDetails = [], selectedCountryIso) => {
  return companyDetails.find((companyDetailsInCountry) => {
    return companyDetailsInCountry.iso === selectedCountryIso;
  });
};