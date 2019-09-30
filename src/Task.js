import * as React from 'react';
import './Task.css';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';

const Task = ({ id, description, made }) => {
  return (
    <Row key={id} className="row-with-padding">    
      <Col><center>{description}</center></Col>
      <Col md = "auto">
        <ButtonGroup>
          { !made 
            ? <Button variant="success" size="sm">Complete</Button> 
            : <Button variant="secondary" size="sm">Return</Button> 
          }
          <Button variant="danger" size="sm">Delete</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default Task;
