import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Find = (props) => {
  return (
    <div>
        find countries
        <input value={props.newFilter} onChange={props.handleFilterChange} />
      </div>
  )
}

const Countries = ({countries, newFilter}) => {

  if (newFilter === '') {
    return null
  }

  const filteredCountries = countries.filter((country) => 
                          country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  if (filteredCountries.length == 1)                
    return (
        <div>
          <Country country = {filteredCountries[0]} />
        </div>
  )

  if (filteredCountries.length <= 10)                
  return (filteredCountries.map( country =>
      <div key= {country.name.common}>
        {country.name.common}
      </div>
))

  return (
    <div> too many matches, specify another filter </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p><b>languages: </b></p>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
    )
}

const Languages = ({languages}) => {
  console.log("languages ", Object.keys(languages), Object.entries(languages))
  return ( Object.entries(languages).map( ([key, value]) =>
      <li key= {key}>{value}</li>
    )
  )
}

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [someCountries, setSomeCountries] = useState([])



  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  /*useEffect(() => {
    const filteredCountries = countries.filter((country) => 
                          country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    console.log("filtered ", filteredCountries)
    if (filteredCountries.length <= 10) {
      console.log("country name common ", filteredCountries.map( country =>  country.name.common))
      filteredCountries.map( country =>  
      countryService.getFiltered(country.name.common)
        .then(responseCountry => {
          setSomeCountries(someCountries.concat(responseCountry))
          console.log("res countries ", responseCountry)
        })
      )
    console.log("countries ", someCountries)
    }
  }, [newFilter])*/

  /*useEffect(() => {
    const newfilter = newFilter
    countryService.getFiltered2(newfilter)
      .then(resCountries => {
        setSomeCountries(resCountries)
      })
    }, [newFilter])*/

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
  <div>
    <Find newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    <Countries countries={countries} newFilter={newFilter} />
  </div>
  )
}

export default App

/*someCountries.map(country =>
  <Country key = {country.common.name} country={country} />*/