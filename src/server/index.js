const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express();

const companies = JSON.parse(fs.readFileSync(path.resolve(process.cwd()) + '/API/companies.json', 'utf-8'));
const countries = JSON.parse(fs.readFileSync(path.resolve(process.cwd()) + '/API/performance/countries.json', 'utf-8'));

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/companies', (req, res) => res.send(companies));
app.get('/api/countries', (req, res) => res.send(countries));

for (let i = 1; i < 8; i++) {
  const companyDetailes = JSON.parse(fs.readFileSync(path.resolve(process.cwd()) + `/API/performance/companies/company_${i}.json`, 'utf-8'));

  app.get(`/api/companies/${i}`, (req, res) => res.send(companyDetailes));
}

app.listen(8080, () => console.log('Listening on port 8080!'));
