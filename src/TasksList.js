import * as React from 'react';

const TasksList = ({tasks}) => {
    return (
      <div>
          {tasks.map(task => <li key={task}>{task}</li>)}
      </div>
      );

}

export default TasksList;
