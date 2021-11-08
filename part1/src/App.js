import React from 'react'


const Header = (props) => {
  console.log(props)
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
  const rendered = props.content.map((content, i) => {
    return content = <Part key={i} p={content.name} e={content.exercises}/>
  })
  return(<>{rendered}</>)
}

const App = () => {
  const course = 'Half Stack application development';

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content content={[part1, part2, part3]} />
      <Total content={[part1, part2, part3]}/>
    </div>
  )
}

export default App;
