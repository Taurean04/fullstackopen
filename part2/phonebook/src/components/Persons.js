import React from 'react';

const Person = ({name, number, handleDelete}) => (
  <li>
    {name} {number}
    <button onClick={handleDelete}>Delete</button>
  </li>
);
const Persons = ({persons, filter, remove}) => {
  let filtered = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  return (
    <ul>{
      filtered.map(person => <Person key={person.id} name={person.name} number={person.number} handleDelete={() => remove(person.id)} />)
    }</ul>
  );
}
export default Persons;