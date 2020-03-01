import * as React from 'react';
import * as RequestMethod from './RequestMethod'
import './App.css';
import TasksList from './TasksList';
import { Button, InputGroup, FormControl, Tabs, Tab, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';


 class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasksToDo: [],
      tasksComplete: [],
      newTask: '',
      isLoading: true,
      isError: false,
      error: '',
    };
  }
  
  

  render(){
    return (
        <div id="content">
            <InputGroup className="mb-3">
              <FormControl value={this.state.newTask} onChange={this.saveInput} placeholder="Add new task!" 
                onKeyPress= {target => { 
                  if (target.key === "Enter") { 
                    this.addTask()
                  } 
                }
                }
              />
                
              <InputGroup.Append>
                <Button variant="info" onClick={this.addTask}><FontAwesomeIcon icon = {faPlus}/></Button>  
              </InputGroup.Append>  
            </InputGroup>
            <Tabs defaultActiveKey="todo" id="uncontrolled-tab-example">
              <Tab eventKey="todo" title={<FontAwesomeIcon icon={faSquare} />}>
                <div className="tabs-content">
                  {  !this.state.isLoading  
                    ? <TasksList category="todo" tasks={ this.state.tasksToDo } onRequestMethod={this.doRequest} onEditMethod={this.editTask} isError = {this.state.isError} error={this.state.error} /> 
                    : <center><Spinner className="loading-spinner" animation="border" ></Spinner></center> 
                  }
                </div>
              </Tab>
              <Tab eventKey="completed" title={<FontAwesomeIcon icon={faCheckSquare} />}>
                <div className="tabs-content">
                {  
                  !this.state.isLoading  
                  ? <TasksList category="completed" tasks={ this.state.tasksComplete } onRequestMethod={this.doRequest} isError = {this.state.isError} error={this.state.error} /> 
                  : <center><Spinner className="loading-spinner" animation="border" ></Spinner></center> 
                }
                </div>
              </Tab>
            </Tabs>
        </div>

      );
  }

  fetchTasksList() {
    this.setState({ isLoading: true});
    fetch(RequestMethod.GET_tasksToDo)
    .then(res => res.json())
    .then(json => this.setState({ tasksToDo: json, isLoading: false,  isError: false }))
    .catch((err) => {
      this.setState({ isLoading: false, isError: true, error: err.toString()});
    })

    fetch(RequestMethod.GET_madeTasks)
    .then(res => res.json())
    .then(json => this.setState({ tasksComplete: json, isLoading: false, isError: false }))
    .catch((err) => {
      this.setState({ isLoading: false, isError: true, error: err.toString()});
  })
  }

  componentDidMount(){
    this.fetchTasksList();    
  }  

  saveInput = (e) => {
    this.setState({ 
      newTask: e.currentTarget.value,
    });
  }

  doRequest = (id, requestMethod, method) => {
    fetch(requestMethod + id, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status === 200) {
        this.fetchTasksList(); 
      }
    });
  }

  editTask = (id, newDescription) => {
    fetch(RequestMethod.PUT_editTask + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: newDescription.toString()
    }).then(response => {
      if (response.status === 200) {
        this.fetchTasksList(); 
      }
    });
  }

  addTask = () => {
    fetch(RequestMethod.POST_addTask, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: this.state.newTask
    }).then(response => {
      if (response.status === 200) {
        this.fetchTasksList(); 
        this.setState({ newTask: '' });
      }
    });
  }

}

export default App;
