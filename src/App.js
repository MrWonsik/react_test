import * as React from 'react';
import './App.css';
import TasksList from './TasksList';
import { Button, InputGroup, FormControl, Nav } from 'react-bootstrap';

const allTasks = ['Task#1', 'Task#2', 'Task#3', 'Task#4', 'Task#5', 'Task#6'];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: allTasks,
      newTask: '',
    };
  }
  
  saveInput = (e) => {
    this.setState({ 
      newTask: e.currentTarget.value,
    });
  }

  addTask = () => {
    this.setState(state => {
      const tasks = state.tasks.concat(state.newTask);

      return {
        tasks,
        newTask: '',
      };
    });
  }

  render(){
    return (
        <div id="content">
          <Nav defaultActiveKey="/home">
            <InputGroup className="mb-3">
              <FormControl value={this.state.newTask} onChange={this.saveInput} placeholder="Add new task!"/>
              <InputGroup.Append>
                <Button variant="outline-info" onClick={this.addTask}>Add task!</Button>  
              </InputGroup.Append>  
            </InputGroup>
          </Nav>
          <TasksList tasks={this.state.tasks} />
        </div>
      );
  }
}

export default App;
