import React from 'react'


const Header = ({name}) => (<h2>{name}</h2>)

const Total = ({parts}) => {
  const total = parts.reduce((p, c) => p + c.exercises, 0);
  return (<p><strong>Total of {total} exercises</strong></p>);
}

const Part = ({name, exercise}) => (<p>{name} {exercise}</p>)

const Content = ({content}) => (
  <>
    {content.map(item => <Part key={item.id} name={item.name} exercise={item.exercises} />)}
  </>
)

const Course = ({course}) => (
  <>
    <Header name={course.name} />
    <Content content={course.parts} />
    <Total parts={course.parts} />
  </>
)

const App = () => {
  const courses = [
    {
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }

  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App;
