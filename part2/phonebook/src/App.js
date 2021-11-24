import React, { useState } from 'react';

const Person = ({name, number}) => (<li>{name} {number}</li>)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');


  const addPersons = (event) => {
    event.preventDefault();
    let nameExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if(nameExists) {
      return alert(`${newName} is already added to phonebook`);
    }
    const personObject = {
      id: persons[persons.length - 1].id + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject));
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersons}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {
            persons.map(person => <Person key={person.id} name={person.name} number={person.number} />)
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
