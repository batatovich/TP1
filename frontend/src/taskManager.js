import React, { useEffect, useState } from 'react';
import taskService from './taskService';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.getAllTasks()
      .then(tasks => { setTasks(tasks) })
      .catch(error => { console.error('Error fetching tasks', error) });
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {
              <div>
                <span>{task.description}</span>
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );

};

export default TaskManager;
