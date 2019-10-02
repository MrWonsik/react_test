import * as React from 'react';
import * as RequestMethod from './RequestMethod'
import './App.css';
import TasksList from './TasksList';
import TaskModal from './ModalForRequest';
import { Button, InputGroup, FormControl, Tabs, Tab, Spinner } from 'react-bootstrap';

 class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasksToDo: [],
      tasksComplete: [],
      newTask: '',
      isLoading: true,
      showModal: false,
    };

    this.handleClick = this.handleClick.bind(this);
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
              <Tab eventKey="todo" title="TODO">
                {  !this.state.isLoading  ? <TasksList tasks={ this.state.tasksToDo } onRequestMethod={this.doRequest} /> : <center><Spinner animation="border" ></Spinner></center> }
              </Tab>
              <Tab eventKey="completed" title="Complete">
                {  !this.state.isLoading  ? <TasksList tasks={ this.state.tasksComplete } onRequestMethod={this.doRequest}/> : <center><Spinner animation="border" ></Spinner></center> }
              </Tab>
              <Tab eventKey="test" title="TEST">
                  <TaskModal variant="warning" buttonLabel="Click me!" />
              </Tab>
            </Tabs>
        </div>

      );
  }

  handleClick() {
    console.log(this.state.showModal)
    this.setState({ showModal: true});
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
