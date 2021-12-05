import React, { useState, useEffect } from 'react';
import personService from './services/persons';

const Input = ({text, value, onChange}) => (<div>{text}: <input value={value} onChange={onChange}/></div>);
const PersonForm = ({onSubmit, input}) => (
  <form onSubmit={onSubmit}>
    {input.map(i => (<Input key={i.id} text={i.text} value={i.value} onChange={i.onChange} />))}
    <div>
      <button type='submit'>Add</button>
    </div>
  </form>
);
const Person = ({name, number}) => (<li>{name} {number}</li>);
const Persons = ({persons, filter}) => {
  let filtered = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  return (
    <ul>{
      filtered.map(person => <Person key={person.id} name={person.name} number={person.number} />)
    }</ul>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initial => {
        setPersons(initial);
      });
  }, []);

  const addPersons = (e) => {
    e.preventDefault();
    let nameExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if(nameExists) {
      return alert(`${newName} is already added to phonebook`);
    }
    const personObject = {
      id: persons[persons.length - 1].id + 1,
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(created => {
        setPersons(persons.concat(created));
        setNewName('');
        setNewNumber('');
      });
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  let inputObject = [
    {
      id: 1,
      text: 'Name',
      value: newName,
      onChange: handleNameChange
    },
    {
      id: 2,
      text: 'Number',
      value: newNumber,
      onChange: handleNumberChange
    }
  ]

  return (
    <div>
      <h2>Phonebook</h2>
        <Input text='Filter shown with' value={filter} onChange={handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm onSubmit={addPersons} input={inputObject} />
      <h3>Numbers</h3>
      <div>
        <Persons persons={persons} filter={filter} />
      </div>
    </div>
  )
}

export default App;
