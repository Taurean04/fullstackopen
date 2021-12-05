import React from 'react';
import Input from './Input';

const PersonForm = ({onSubmit, input}) => (
  <form onSubmit={onSubmit}>
    {input.map(i => (<Input key={i.id} text={i.text} value={i.value} onChange={i.onChange} />))}
    <div>
      <button type='submit'>Add</button>
    </div>
  </form>
);

export default PersonForm;