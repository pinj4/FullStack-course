import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
        filter shown with
        <input value={props.newFilter} onChange={props.handleFilterChange} />
      </div>
  )
}
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
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

const Persons = ({persons, newFilter, removePerson}) => {
  const filteredPpl = persons.filter((person) => 
                          person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (filteredPpl.map( person =>
      <li key={person.name}>
        {person.name} {person.number} 
        <Button handleClick={() => removePerson(person.id)} text="delete" />
      </li>
  ))
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Button clicked ', event.target)

    const personObject = {name: newName, number:newNumber}
    const occupied = persons.find((element) => element.name == newName)
    console.log(occupied)

    if (occupied){
      if (occupied.number == newNumber) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
      } else if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(occupied.id, personObject)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== occupied.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
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

  const removePerson = (id) => {
    const person = persons.find(n => n.id === id)
    console.log("person to be deleted ", person)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
      console.log('persons ', persons)
      const updatedPersons = persons.filter((updatedPerson) => updatedPerson.id !== person.id)
      setPersons(updatedPersons)
    }
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
        <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
      </ul>
    </div>
  )
}

export default App
