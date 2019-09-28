import * as React from 'react';
import { Form } from 'react-bootstrap'

const TasksList = ({tasks}) => {
      return (
        <Form.Group>
            {tasks.map(task => <Form.Check type="checkbox" key={task} label={task}/>)}
        </Form.Group>
      );
}

export default TasksList;
