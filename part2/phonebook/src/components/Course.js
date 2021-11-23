import React from 'react';


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

export default Course;