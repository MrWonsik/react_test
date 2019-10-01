import * as React from 'react';
import Task from './Task';
import { Container } from 'react-bootstrap';

export class TasksList extends React.Component {
  taskToTasksList = task => {
    const id = task.id;
    const taskDescription = task.description;
    const made = task.made;
    return <Task key={id} id={id} description={taskDescription} made={made} />;
  };

  render() {
      return (
        <Container>
            {this.props.tasks.map(this.taskToTasksList)}
        </Container>
      );
  }
}



export default TasksList;
