import React, { useState } from 'react';

const Header = (props) => (<h1>{props.text}</h1>)
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>);
const StatisticsLine = ({text, value}) => (<p>{text} {value}</p>);

const Statistics = (props) => {
  const {text, good, neutral, bad, all, average, positive} = props;

  return(
    <>
      <Header text={text} />
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={all} />
      <StatisticsLine text='average' value={average} />
      <StatisticsLine text='positive' value={positive} />
    </>
  )
  
}

const App = () => {
  // save clicks of each button to its own statement
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementState = (setState, value) => {
    setState(value);
  }


  const all = good + neutral + bad;
  const average = all / 3;
  const positive = parseFloat((good / all) * 100);

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => incrementState(setGood, good + 1)} text='good' />
      <Button handleClick={() => incrementState(setNeutral, neutral + 1)} text='neutral' />
      <Button handleClick={() => incrementState(setBad, bad + 1)} text='bad' />
      <Statistics text='statistics' good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App;