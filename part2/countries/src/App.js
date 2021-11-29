import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({country}) => (
  <>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital[0]}</p>
    <p>Population: {country.population}</p>
    <h3>Languages</h3>
    <ul>{Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}</ul>
    <img src={country.flags.png} alt={country.name.common}></img>
  </>
)

const Result = ({countries}) => {
  let result;
  if(countries.length > 10){
    result = 'Too many matches found, specify another filter'
  }else if(countries.length === 1){
    result = <Country key={countries} country={countries[0]}/>
  }else if(countries.length <= 10){
    result = <ul>{countries.map((country, i) => <li key={i}>{country.name.common}</li>)}</ul>;
  }
  return (<div>{result}</div>)
}

const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data);
      });
  }, []);
  
  let filtered = countries.filter(country => country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      Countries
      <div>find countries: <input value={search} onChange={handleSearchChange}/></div>
      <Result countries={filtered} />
    </div>
  )
}

export default App;
