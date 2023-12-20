import { useState } from 'react'

const Persons = ({persons}) => {
  return (persons.map( person =>
      <li key={person.name}>{person.name} {person.number}</li>
  ))
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')
  const [filteredPpl, setFilteredPpl] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Button clicked ", event.target)

    const personObject = {name: newName, number:newNumber}
    const occupied = persons.find((element) => element.name == newName)
    console.log(occupied)

    occupied ? alert(`${newName} is already added to phonebook`) 
    : setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log("persons ", persons)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)

    const filteredItems = persons.filter((person) => 
                          person.name.toLowerCase().includes(newFilter.toLowerCase()))
    setFilteredPpl(filteredItems)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}> 
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filteredPpl}/>
      </ul>
    </div>
  )

}

export default App
