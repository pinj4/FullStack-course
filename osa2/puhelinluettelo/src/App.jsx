import { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
        filter shown with
        <input value={props.newFilter} onChange={props.handleFilterChange} />
      </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}> 
    <div>
      name: <input 
              value={props.newName}
              onChange={props.handleNameChange}
            />
    </div>
    <div>
      number: <input 
              value={props.newNumber}
              onChange={props.handleNumberChange}
            />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, newFilter}) => {
  const filteredPpl = persons.filter((person) => 
                          person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (filteredPpl.map( person =>
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
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>    
      <h2>add a new</h2>
      <PersonForm 
          newNumber={newNumber} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} 
          addPerson={addPerson}
      />  
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} newFilter={newFilter}/>
      </ul>
    </div>
  )
}

export default App
