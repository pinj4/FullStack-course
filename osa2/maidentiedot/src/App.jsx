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

  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

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
