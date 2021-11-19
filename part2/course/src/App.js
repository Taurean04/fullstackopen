import React from 'react'


const Header = ({course}) => {
  return(<h1>{course}</h1>)
}

const Total = ({total}) => {
  return (<p>Total of {total} exercises</p>);
}

const Part = ({name, exercise}) => {
  return(<p>{name} {exercise}</p>);
}

const Content = ({content}) => {   
  let total = 0;
  const rendered = content.map((item) => {
    total += item.exercises
    return content = <Part key={item.id} name={item.name} exercise={item.exercises}/>
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
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
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
