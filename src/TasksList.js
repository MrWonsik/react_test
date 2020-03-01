import * as React from 'react';
import './TasksList.css';
import Task from './Task';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCalendarPlus, faCalendarCheck, faBolt } from '@fortawesome/free-solid-svg-icons';

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
          <Col className="align-self-center header-col"><FontAwesomeIcon icon={ faStickyNote } /> DESCRIPTION</Col>
          <Col xs="2"  className="align-self-center header-col">{this.props.category === "todo" ? <><FontAwesomeIcon icon={ faCalendarPlus } /> ADDED</> : <> <FontAwesomeIcon icon={ faCalendarCheck } /> COMPLETED</>}</Col>
          <Col xs="2"  className="align-self-center header-col"><FontAwesomeIcon icon={ faBolt } /> OPTIONS</Col>
        </Row>
           { this.props.tasks.map(this.taskToTasksList) }
        </Container>
      );
    }

    if(this.props.isError){
      return(
        <Alert variant='danger'><center>Something wrong! {this.props.error}</center></Alert>
      );
    }

    return (
      <Alert variant='info'><center>This tasks list is empty!</center></Alert>
    );
      
  } 

}

export default TasksList;
