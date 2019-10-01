import * as React from 'react';
import './App.css';
import TasksList from './TasksList';
import { Button, InputGroup, FormControl, Tabs, Tab, Spinner } from 'react-bootstrap';

 const API = "http://192.168.0.101:8080/planner/";
 const GET_madeTasks = 'getMadeTasks';
 const GET_tasksToDo = 'getTasksToDo';
 const POST_addTask = 'addTask';

 class App extends React.Component {

  constructor(props) {
    super(props);

    console.log(this.deleteTask);

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
              <FormControl value={this.state.newTask} onChange={this.saveInput} placeholder="Add new task!"/>
              <InputGroup.Append>
                <Button variant="outline-info" onClick={this.addTask}>Add task!</Button>  
              </InputGroup.Append>  
            </InputGroup>
            <Tabs defaultActiveKey="todo" id="uncontrolled-tab-example">
              <Tab eventKey="todo" title="Tasks TODO">
                {  !this.state.isLoading  ? <TasksList tasks={ this.state.tasksToDo } onRequestMethod={this.doRequest} /> : <center><Spinner animation="border" ></Spinner></center> }
              </Tab>
              <Tab eventKey="completed" title="Tasks completed">
                {  !this.state.isLoading  ? <TasksList tasks={ this.state.tasksComplete } onRequestMethod={this.doRequest}/> : <center><Spinner animation="border" ></Spinner></center> }
              </Tab>
            </Tabs>
        </div>

      );
  }

  fetchTasksList() {
    this.setState({ isLoading: true});
    fetch(API + GET_tasksToDo)
    .then(res => res.json())
    .then(json => this.setState({ tasksToDo: json, isLoading: false}))
    .catch((error) => {
      this.setState({ tasksToDo: [], isLoading: false});
    })

    fetch(API + GET_madeTasks)
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


  addTask = () => {
    fetch(API + POST_addTask, {
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
