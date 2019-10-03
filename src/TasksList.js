import * as React from 'react';
import './TasksList.css';
import Task from './Task';
import { Container, Alert, Row, Col } from 'react-bootstrap';

class TasksList extends React.Component {

  
  taskToTasksList = task => {
    const id = task.id;
    const taskDescription = task.description;
    const made = task.made;
    const dateOfAdd = task.dateOfAdd;
    const dateOfComplete = task.dateOfComplete;
    return <Task 
    key={id} 
    id={id} 
    description={taskDescription} 
    made={made} 
    dateOfAdd={dateOfAdd} 
    dateOfComplete={dateOfComplete} 
    onRequestMethod={this.props.onRequestMethod} 
    onEditMethod={this.props.onEditMethod}
    />;
  };

  render() {
    if( this.props.tasks.length !== 0){
      return (
        <Container className="tasks-container">
         <Row id="header-row"> 
          <Col>Description</Col>
          <Col xs="3">{this.props.category === "todo" ? <>Date of add</> : <>Date of complete</>}</Col>
          <Col xs="2">Options</Col>
        </Row>
           { this.props.tasks.map(this.taskToTasksList) }
        </Container>
      );
    }

    return (
      <Alert variant='info'><center>This tasks list is empty!</center></Alert>
    );
      
  } 

}

export default TasksList;
