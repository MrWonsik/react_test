import * as React from 'react';
import * as RequestMethod from './RequestMethod'
import './App.css';
import TasksList from './TasksList';
import { Button, InputGroup, FormControl, Tabs, Tab, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';


 class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasksToDo: [],
      tasksComplete: [],
      newTask: '',
      isLoading: true,
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
                <Button variant="info" onClick={this.addTask}><FontAwesomeIcon icon = {faCalendarPlus}/></Button>  
              </InputGroup.Append>  
            </InputGroup>
            <Tabs defaultActiveKey="todo" id="uncontrolled-tab-example">
              <Tab eventKey="todo" title="TODO">
                <div className="tabs-content">
                  {  !this.state.isLoading  
                    ? <TasksList category="todo" tasks={ this.state.tasksToDo } onRequestMethod={this.doRequest} onEditMethod={this.editTask} /> 
                    : <center><Spinner className="loading-spinner" animation="border" ></Spinner></center> 
                  }
                </div>
              </Tab>
              <Tab eventKey="completed" title="Complete">
                <div className="tabs-content">
                {  
                  !this.state.isLoading  
                  ? <TasksList category="completed" tasks={ this.state.tasksComplete } onRequestMethod={this.doRequest}/> 
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
    .then(json => this.setState({ tasksToDo: json, isLoading: false}))
    .catch((error) => {
      this.setState({ tasksToDo: [], isLoading: false});
    })

    fetch(RequestMethod.GET_madeTasks)
    .then(res => res.json())
    .then(json => this.setState({ tasksComplete: json, isLoading: false }))
    .catch((error) => {
      this.setState({ tasksComplete: [], isLoading: false});
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
