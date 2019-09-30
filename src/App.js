import * as React from 'react';
import './App.css';
import TasksList from './TasksList';
import { Button, InputGroup, FormControl, Tabs, Tab } from 'react-bootstrap';

const API = "http://192.168.0.101:8080/planner/";
const GET_madeTasks = 'getMadedTasks';
const GET_tasksToDo = 'getTasksToDo';
const POST_addTask = 'addTask';

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasksToDo: [],
      tasksComplete: [],
      newTask: '',
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
                <TasksList tasks={this.state.tasksToDo} />
              </Tab>
              <Tab eventKey="completed" title="Tasks completed">
                <TasksList tasks={this.state.tasksComplete} />
              </Tab>
            </Tabs>
        </div>

      );
      
  }

  componentDidMount(){
    fetch(API + GET_tasksToDo)
      .then(res => res.json())
      .then(json => this.setState({ tasksToDo: json }))
      .catch((error) => {
        this.setState({ tasksToDo: []});
    })

    fetch(API + GET_madeTasks)
      .then(res => res.json())
      .then(json => this.setState({ tasksComplete: json }))
      .catch((error) => {
        this.setState({ tasksComplete: []});
    })
  }
  

  saveInput = (e) => {
    this.setState({ 
      newTask: e.currentTarget.value,
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
    });

    this.setState(state => {
      this.componentDidMount();

      return {
        newTask: '',
      };
    });
  }
}

export default App;
