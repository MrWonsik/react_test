import * as React from 'react';
import './Task.css';
import * as App from './App.js';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';

export class Task extends React.Component {
  render(){
    return (
      <Row key={this.props.id} className="row-with-padding">    
        <Col><center>{this.props.description}</center></Col>
        <Col md = "auto">
          <ButtonGroup>
            { !this.props.made 
              ? <Button variant="success" size="sm" onClick={() => this.completeTask(this.props.id) }><FontAwesomeIcon icon={ faCheck } onClick={ this.completeTask }/></Button> 
              : <Button variant="secondary" size="sm" onClick={() => this.undoTask(this.props.id) }><FontAwesomeIcon icon={ faUndo } /></Button> 
            }
            <Button variant="danger" size="sm" onClick={() => this.deleteTask(this.props.id) }><FontAwesomeIcon icon = {faTimes }/></Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }

  deleteTask = (id) => {
    fetch(App.API + App.DELETE_deleteTask + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });    
  }

  completeTask = (id) => {
    fetch(App.API + App.PUT_completeTask + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });    
  }

  undoTask = (id) => {
    fetch(App.API + App.PUT_undoCompleteTask + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });    
  }

  
}


export default Task;
