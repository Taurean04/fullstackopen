import React, { useState } from 'react';

const Header = (props) => (<h1>{props.text}</h1>);
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const handleVote = () => {
    let votes = [...vote];
    votes[selected] += 1;
    setVote(votes);
  };
  const most_votes = anecdotes[vote.indexOf(Math.max(...vote))];

  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button handleClick={handleVote} text='vote'/>
      <Button handleClick={handleClick} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <p>{most_votes}</p>
    </div>
  )
}

export default App;