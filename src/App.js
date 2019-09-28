import * as React from 'react';
import UsersList from './UsersList'

const allUsers = ['Michał', 'Kasia', 'Jacek', 'Marta', 'Tomek', 'Ania'];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredUsers: allUsers,
    };
  }
  
  filterUsers = (e) => {
    const text = e.currentTarger.value;
    const filteredUsers = this.getFilteredUsersForText(text)
    this.setState({
      filteredUsers
    })
  }

  getFilteredUsersForText(text){
    return allUsers.filter(user => user.toLowerCase().includes(text.toLowerCase()))
  }

  render(){
    return (
        <div>
          <input onInput={this.filterUsers} />
          <UsersList users={this.state.filteredUsers} />
        </div>
      );
  }
}

export default App;
