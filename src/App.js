import * as React from 'react';
import './App.css';
import TasksList from './TasksList';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const API = "http://192.168.0.101:8080/planner/";
const GET_allTasks = 'getAllTasks';
const POST_addTask = 'addTask';

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
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
          <TasksList tasks={this.state.tasks} />
        </div>

      );
      
  }

  componentDidMount(){
    fetch(API + GET_allTasks)
      .then(res => res.json())
      .then(json => this.setState({ tasks: json }))
      .catch((error) => {
        this.setState({ tasks: []});
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
