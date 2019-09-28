import * as React from 'react';

const TasksList = ({tasks}) => {
      return (
        <ul>
            {tasks.map(task => <li key={task}>{task}</li>)}
        </ul>
      );
}

export default TasksList;
