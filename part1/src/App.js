import React from 'react'


const Header = (props) => {
  return(<h1>{props.course}</h1>)
}

const Total = (props) => {
  const total = props.e1 + props.e2 + props.e3;
  return (<p>Number of exercises {total}</p>)
}

const Content = (props) => {
  const rendered = []
  props.content.map((content, i) => {
    rendered.push(<p key={i}>{content.p} {content.e}</p>)
  })
  return(<>{rendered}</>)
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const content = [
    {p: part1, e: exercises1},
    {p: part2, e: exercises2},
    {p: part3, e: exercises3}
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
    </div>
  )
}

export default App;
