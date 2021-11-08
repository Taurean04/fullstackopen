import React from 'react'


const Header = (props) => {
  return(<h1>{props.course}</h1>)
}

const Total = (props) => {
  let total = 0;
  props.content.forEach(c => {
    total += c.exercises
  })
  return (<p>Number of exercises {total}</p>)
}

const Part = (props) => {
  return(<p>{props.p} {props.e}</p>)
}

const Content = (props) => {
  const rendered = []
  props.content.forEach((content, i) => {
    rendered.push(<Part key={i} p={content.part} e={content.exercises}/>)
  })
  return(<>{rendered}</>)
}

const App = () => {
  const course = 'Half Stack application development';

  const content = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content}/>
    </div>
  )
}

export default App;
