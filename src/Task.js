import * as React from 'react';
import './Task.css';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';

class Task extends React.Component {
  render(){

    return (
      <Row className="row-with-padding">    
        <Col><center>{this.props.description}</center></Col>
        <Col md = "auto">
          <ButtonGroup>
            { !this.props.made 
              ? <Button variant="success" size="sm" onClick={() => this.props.onTasksComplete(this.props.id) }><FontAwesomeIcon icon={ faCheck }/></Button> 
              : <Button variant="secondary" size="sm" onClick={() => this.props.onTasksUndo(this.props.id) }><FontAwesomeIcon icon={ faUndo } /></Button> 
            }
            <Button variant="danger" size="sm" onClick={() => this.props.onTasksDelete(this.props.id) }><FontAwesomeIcon icon = {faTimes }/></Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
  
}


export default Task;
