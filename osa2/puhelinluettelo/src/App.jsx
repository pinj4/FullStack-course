import { useState } from 'react'

const Persons = ({persons}) => {
  return (persons.map( person =>
      <li key={person.name}>{person.name} {person.number}</li>
  ))
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0402345678'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        <Persons persons={persons}/>
      </ul>
    </div>
  )

}

export default App
