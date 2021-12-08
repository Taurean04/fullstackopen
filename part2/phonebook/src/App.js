import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Input from './components/Input';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    if(newName.length === 0){
      setErrorMessage('Please enter name');
    }
    if(nameExists) {
      if(window.confirm(`${nameExists.name} is already added to phonebook. replace the old number with a new one?`)){
        const update = {...nameExists, number: newNumber};
        return personService
          .update(nameExists.id, update)
          .then(updated => {
            setSuccessMessage(`Changed ${updated.name}'s number`);
            setTimeout(() => {              
              setSuccessMessage(null);
            }, 5000);
            setPersons(persons.map(p => p.id !== nameExists.id ? p : updated));
            setNewName('');
            setNewNumber('');
          });
      }else{
        return setErrorMessage(`${newName} is already added to phonebook`);
      }
    }
    const personObject = {
      id: persons[persons.length - 1].id + 1,
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(created => {
        setSuccessMessage(`Added ${created.name}`);
        setTimeout(() => {              
          setSuccessMessage(null);
        }, 5000);
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

  const handleDelete = (id) => {
    const deleted = persons.find(person => person.id === id);
    if(window.confirm(`Delete ${deleted.name}?`)){
      personService
        .remove(id)
        .then(() => {
          const changed = [...persons];
          changed.splice(persons.indexOf(deleted), 1);
          setPersons(changed);
        });
    }
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
        <Notification success={successMessage} error={errorMessage} />
        <Input text='Filter shown with' value={filter} onChange={handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm onSubmit={addPersons} input={inputObject} />
      <h3>Numbers</h3>
      <div>
        <Persons persons={persons} filter={filter} remove={handleDelete} />
      </div>
    </div>
  )
}

export default App;
