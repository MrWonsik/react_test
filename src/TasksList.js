import * as React from 'react';
import './TasksList.css';
import Task from './Task';
import { Container, Alert } from 'react-bootstrap';

class TasksList extends React.Component {

  
  taskToTasksList = task => {
    const id = task.id;
    const taskDescription = task.description;
    const made = task.made;
    return <Task key={id} id={id} description={taskDescription} made={made} onRequestMethod={this.props.onRequestMethod}/>;
  };

  render() {

      return (
        <Container className="tasks-container">
            { this.props.tasks.length === 0 ? <Alert variant='info'><center>This tasks list is empty!</center></Alert> : this.props.tasks.map(this.taskToTasksList) }
        </Container>
      );
    } 

}

export default TasksList;
