import * as React from 'react';
import * as RequestMethod from './RequestMethod'
import ModalForRequest from './ModalForRequest'
import TaskDateFormatter from './TaskDateFormatter'
import './Task.css';
import { Row, Col, Button, ButtonGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionIsClicked: false,
      newDescription: this.props.description,
    };
  }

  OverlayTriggerForInput = () => { 
    
  }

  render(){

    return (
      <Row className="row-with-padding">    
        <Col xs="7" sm="7" className="align-self-center wrap">
          <div onClick={this.changeStateOfDescription} >
            { this.state.descriptionIsClicked 
              ? <OverlayTrigger 
              key="top"
              placement="top"
              overlay={
                <Tooltip id={'tooltip-top'}>
                  Press enter to save.
                </Tooltip>
              } >
              <FormControl 
                  value={this.state.newDescription} 
                  onChange={this.saveInput} 
                  onKeyPress=
                  {
                    target => { 
                      if (target.key === "Enter") { 
                        this.props.onEditMethod(this.props.id, this.state.newDescription)
                        this.setState = () => ({ descriptionIsClicked: false})
                      } 
                    }
                  } 
                />
              </OverlayTrigger>         
              : this.props.description
            }
          </div>
        </Col>
        <Col xs="3" className="align-self-center"><TaskDateFormatter value={this.props.dateOfAdd} /></Col>
        <Col xs="2"  className="align-self-center"><center>
          <ButtonGroup>
            { !this.props.made 
              
              ? <Button variant="outline-light" size="sm" onClick={() => this.props.onRequestMethod(this.props.id, RequestMethod.PUT_completeTask, 'PUT') }>
                  <FontAwesomeIcon size='2x' color="green" icon={ faCheck }/>
                </Button> 
              
              : <Button variant="outline-light" size="sm" onClick={() => this.props.onRequestMethod(this.props.id, RequestMethod.PUT_undoCompleteTask, 'PUT') }>
                  <FontAwesomeIcon size='2x' color="grey" icon={ faUndo } />
                </Button> 
            }
              <ModalForRequest 
              modalTitle="DELETE"
              modalBody={"Are you really want to delete this item?"}
              buttonVariant="outline-light" 
              buttonLabel={<FontAwesomeIcon size='2x' color="red" icon = {faTimes}/>}
              handlerYes={() => this.props.onRequestMethod(this.props.id, RequestMethod.DELETE_deleteTask, 'DELETE')}
              />
          </ButtonGroup>
          </center>
        </Col>
      </Row>
    )
  }

  saveInput = (e) => {
    this.setState({
      newDescription: e.currentTarget.value
    })
  }

  changeStateOfDescription = () => {
    this.setState({
      descriptionIsClicked: true,
    });
  }
  
}


export default Task;
