import * as React from 'react';
import { Form } from 'react-bootstrap'

const Task = ({ id, description, made }) => {
  return (
    <Form.Check type="checkbox" key={description} label={description}/>
  )
}

export default Task;
