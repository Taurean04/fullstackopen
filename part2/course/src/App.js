import React from 'react'


const Header = ({course}) => {
  return(<h1>{course}</h1>)
}

const Total = ({total}) => {
  return (<p>Number of exercises {total}</p>);
}

const Part = ({name, exercise}) => {
  return(<p>{name} {exercise}</p>);
}

const Content = ({content}) => {   
  let total = 0;
  const rendered = content.map((item, i) => {
    total += item.exercises
    return content = <Part key={i} name={item.name} exercise={item.exercises}/>
  })
  return(
    <>
    {rendered}
    <Total total={total} />
    </>
  );
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content content={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
