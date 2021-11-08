import React, { useState } from 'react';

const Header = (props) => (<h1>{props.text}</h1>)
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>);
const Paragraph = ({text, value}) => (<p>{text} {value}</p>);

const App = () => {
  // save clicks of each button to its own statement
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementState = (setState, value) => {
    setState(value);
  }


  const total = good + neutral + bad;
  const average = total / 3;
  const positive = parseFloat((good / total) * 100);

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => incrementState(setGood, good + 1)} text='good' />
      <Button handleClick={() => incrementState(setNeutral, neutral + 1)} text='neutral' />
      <Button handleClick={() => incrementState(setBad, bad + 1)} text='bad' />
      <Header text='statistics' />
      <Paragraph text='good' value={good} />
      <Paragraph text='neutral' value={neutral} />
      <Paragraph text='bad' value={bad} />
      <Paragraph text='all' value={total} />
      <Paragraph text='average' value={average} />
      <Paragraph text='positive' value={positive} />
    </div>
  )
}

export default App;