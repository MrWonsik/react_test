import * as React from 'react';
import * as RequestMethod from './RequestMethod'
import ModalForRequest from './ModalForRequest'
import TaskDateFormatter from './TaskDateFormatter'
import './Task.css';
import { Row, Col, Button, ButtonGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionIsClicked: false,
      newDescription: this.props.description,
    };
  }

  render(){

    return (
      <Row className="row-with-task">    
        <Col className="align-self-center wrap task-col" >
          <div onClick={this.changeStateOfDescription} className="task-description">
            { this.state.descriptionIsClicked && !this.props.made
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
              : <i>{this.props.description}</i>
            }
          </div>
        </Col>
          <Col xs="auto" className="align-self-center task-col">{ !this.props.made ? <TaskDateFormatter value={this.props.dateOfAdd} /> :  <TaskDateFormatter value={this.props.dateOfComplete} /> } </Col>
        <Col xs="auto"  className="align-self-center task-col"><center>
          <ButtonGroup>
            { !this.props.made 
              
              ? <Button variant="no" size="sm" onClick={() => this.props.onRequestMethod(this.props.id, RequestMethod.PUT_completeTask, 'PUT') }>
                  <FontAwesomeIcon size='2x' color="green" icon={ faCheck }/>
                </Button> 
              
              : <Button xs="1" variant="no" size="sm" onClick={() => this.props.onRequestMethod(this.props.id, RequestMethod.PUT_undoCompleteTask, 'PUT') }>
                  <FontAwesomeIcon size='2x' color="grey" icon={ faUndo } />
                </Button> 
            }
              <ModalForRequest 
              modalTitle="DELETE"
              modalBody={"Are you really want to delete this item?"}
              buttonVariant="no" 
              buttonLabel={<FontAwesomeIcon size='2x' color="red" icon = {faTrash}/>}
              handlerYes={() => this.props.onRequestMethod(this.props.id, RequestMethod.DELETE_deleteTask, 'DELETE')}
              />
          </ButtonGroup>
          </center>
        </Col>
      </Row>
    )
  }

  handleBlur = () => {
    this.setState({ descriptionIsClicked: false, newDescription: this.props.description})
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
