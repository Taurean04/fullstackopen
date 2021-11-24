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
  const [ filter, setFilter ] = useState('');


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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  let filtered = persons.filter(person => {
    return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  });

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          Filter shown with: <input value={filter} onChange={handleFilterChange} />
        </div>
      <h2>Add New</h2>
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
            filtered.map(person => <Person key={person.id} name={person.name} number={person.number} />)
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
