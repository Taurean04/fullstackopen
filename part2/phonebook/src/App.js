import React, { useState } from 'react';
const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]);
  const [ newName, setNewName ] = useState('');

  const addPersons = (event) => {
    event.preventDefault();
    const personObject = { name: newName }
    setPersons(persons.concat(personObject));
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersons}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {
            persons.map(person => <li key={person.name}>{person.name}</li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
