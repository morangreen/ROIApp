const baseEndPoint = '/api';


export const fetchCountries = (callback) => {
  fetch(`${baseEndPoint}/countries`)
    .then((response) => {
      return response.json();
    })
    .then((companies) => {
      callback(companies);
    });
};

export const fetchCompanies = (callback) => {
  fetch(`${baseEndPoint}/companies`)
    .then((response) => {
      return response.json();
    })
    .then((companies) => {
      callback(companies);
    });
};

export const fetchCompanyDetails = (companyId, callback) => {
  fetch(`${baseEndPoint}/companies/${companyId}`)
    .then((response) => {
      return response.json();
    })
    .then((companies) => {
      callback(companies);
    });
};