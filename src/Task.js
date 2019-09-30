import * as React from 'react';
import './Task.css';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';

const Task = ({ id, description, made }) => {
  return (
    <Row key={id} className="row-with-padding">    
      <Col><center>{description}</center></Col>
      <Col md = "auto">
        <ButtonGroup>
          { !made 
            ? <Button variant="success" size="sm"><FontAwesomeIcon icon={ faCheck } /></Button> 
            : <Button variant="secondary" size="sm"><FontAwesomeIcon icon={ faUndo } /></Button> 
          }
          <Button variant="danger" size="sm"><FontAwesomeIcon icon = {faTimes }/></Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default Task;
