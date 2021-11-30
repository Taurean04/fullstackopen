import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({weather, capital}) => {
  return(
    <>
      <h3>Weather in {capital}</h3>
      <p><strong>Temperature:</strong> {weather.current.temp_c} Celsius</p>
      <img src={'https:' + weather.current.condition.icon} alt={capital}></img>
      <p><strong>Wind:</strong> {weather.current.wind_mph} direction {weather.current.wind_dir}</p>
    </>
  )
  
}

const Country = ({country}) => (
  <>
    <h2>{country.name.common}</h2>
    {country.capital ? <p>Capital: {country.capital[0]}</p> : null}
    <p>Population: {country.population}</p>
    <h3>Languages</h3>
    <ul>{Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}</ul>
    <img src={country.flags.png} alt={country.name.common}></img>
    {country.weather ? <Weather weather={country.weather} capital={country.capital[0]} /> : null}
  </>
);

const Result = ({countries, handleClick, show}) => {
  let result;
  if(countries.length > 10){
    result = 'Too many matches found, specify another filter';
  }else if(countries.length === 1){
    result = <Country country={countries[0]} styles={{display: 'block'}}/>;
  }else if(countries.length <= 10){
    result = <ul>{
      countries.map((country, i) => {
        return (
          <li key={i}>
            {country.name.common}
            <button onClick={() => handleClick(i)}>
              Show
            </button>
            {show[i] ? <Country country={country} /> : null}
          </li>
        )
      })
    }</ul>;
  }
  return (<div>{result}</div>)
}

const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');

  const getCountries = res => {
    res.data.map(data => {
      let fails = ['Ngerulmud', 'Fakaofo', 'Naypyidaw', 'Kyiv'];
      if(data.capital && data.capital[0] !== undefined && !fails.includes(data.capital[0])) {
        if(data.capital[0] === 'Papeetē'){
          data.capital[0] = 'Papeete';
        }
        if(data.capital[0] === 'Hagåtña'){
          data.capital[0] = 'Hagatna';
        }
        axios.get(`http://api.weatherapi.com/v1/current.json?key=ff3e5df1c2dc4718a6f125917213011&q=${data.capital[0]}`)
          .then(weather => {
            if(weather.status === 400){
              data.weather = null;                  
            }
            data.weather = weather.data;
          });
      }
      return data;
    });
    setCountries(res.data);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(getCountries)
  }, []);

  let filtered = countries.filter(country => country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  const [ show, setShow ] = useState(Array(filtered.length).fill(false));

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleClick = (index) => {
    const updated = [...show];
    updated[index] = !updated[index];
    setShow(updated);
  }

  return (
    <div>
      Countries
      <div>find countries: <input value={search} onChange={handleSearchChange}/></div>
      <Result countries={filtered} handleClick={handleClick} show={show} />
    </div>
  )
}

export default App;
