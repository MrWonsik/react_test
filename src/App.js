import * as React from 'react';
import TasksList from './TasksList';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: ['Task#1', 'Task#2', 'Task#3', 'Task#4', 'Task#5', 'Task#6'],
      newTask: null
    };
  }
  
  saveInput = (e) => {
    this.setState({ newTask: e.currentTarget.value });
  }

  addTask = () => {
    this.setState(state => {
      const tasks = state.tasks.push(state.newTask);

      return {
        tasks,
        newTask: '',
      };
    });
  }

  render(){
    return (
        <div>
          <input onInput={this.saveInput} />
          <button onClick={this.addTask}>Add task!</button>
          <TasksList tasks={this.state.tasks} />
        </div>
      );
  }
}

export default App;
