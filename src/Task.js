import * as React from 'react';
import * as RequestMethod from './RequestMethod'
import ModalForRequest from './ModalForRequest'
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
              
              ? <Button variant="success" size="sm" onClick={() => this.props.onRequestMethod(this.props.id, RequestMethod.PUT_completeTask, 'PUT') }>
                  <FontAwesomeIcon icon={ faCheck }/>
                </Button> 
              
              : <Button variant="secondary" size="sm" onClick={() => this.props.onRequestMethod(this.props.id, RequestMethod.PUT_undoCompleteTask, 'PUT') }>
                  <FontAwesomeIcon icon={ faUndo } />
                </Button> 
            }
              <ModalForRequest 
              modalTitle="DELETE"
              modalBody={"Are you really want to delete this item?"}
              buttonVariant="danger" 
              buttonLabel={<FontAwesomeIcon icon = {faTimes}/>}
              handlerYes={() => this.props.onRequestMethod(this.props.id, RequestMethod.DELETE_deleteTask, 'DELETE')}
              />
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
  
}


export default Task;
