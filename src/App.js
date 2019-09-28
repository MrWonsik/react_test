import * as React from 'react';
import TasksList from './TasksList';

const allTasks = ['Task#1', 'Task#2', 'Task#3', 'Task#4', 'Task#5', 'Task#6'];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: allTasks,
      newTask: null,
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
        <div>
          <input value={this.state.newTask} onInput={this.saveInput} />
          <button onClick={this.addTask}>Add task!</button>
          <TasksList tasks={this.state.tasks} />
        </div>
      );
  }
}

export default App;
