import * as React from 'react';
import Task from './Task';
import { Form } from 'react-bootstrap';

export class TasksList extends React.Component {
  taskToTasksList = task => {
    const id = task.id;
    const taskDescription = task.description;
    const made = task.made;
    return <Task key={id} description={taskDescription} made={made} />;
  };

  render() {
      return (
        <Form.Group>
            {this.props.tasks.map(this.taskToTasksList)}
        </Form.Group>
      );
  }
}



export default TasksList;
