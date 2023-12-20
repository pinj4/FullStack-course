import { useState } from 'react'

const Names = ({persons}) => {
  return (persons.map( person =>
      <li key={person.name}>{person.name}</li>
  ))
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log("Button clicked ", event.target)

    const nameObject = {name: newName}
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log("persons ", persons)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Names persons={persons}/>
      </ul>
    </div>
  )

}

export default App
