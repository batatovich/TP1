import React, { useState, useEffect } from 'react';
import taskService from '../taskService';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      syncTasks();
    }
  }, []);

  const syncTasks = () => {
    taskService.getAllTasks()
      .then(fetchedTasks => {
        setTasks(fetchedTasks);
        localStorage.setItem('tasks', JSON.stringify(fetchedTasks));
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  };

  const handleNewTask = () => {
    if (taskDescription.trim()) {
      taskService.createTask(taskDescription)
        .then(newTask => {
          setTasks(prevTasks => {
            const updatedTasks = [newTask, ...prevTasks];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
          });
          setTaskDescription('');
        })
        .catch(error => {
          console.error('There was an error creating the task!', error);
        });
    }
  };

  const handleDeleteTask = (taskId) => {
    taskService.deleteTask(taskId)
      .then(() => {
        setTasks(prevTasks => {
          const updatedTasks = prevTasks.filter(task => task.id !== taskId);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.error('There was an error deleting the task!', error);
      });
  };


  const handleEditTask = (task) => {
    setTaskId(task.id);
    setTaskDescription(task.description);
  };

  const handleCancelEdit = () => {
    setTaskId(null);
    setTaskDescription('');
  };

  const handleUpdateTask = () => {
    if (taskDescription.trim()) {
      taskService.updateTask(taskId, taskDescription)
        .then(updatedTask => {
          setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
          setTaskId(null);
          setTaskDescription('');
        })
        .catch(error => {
          console.error('There was an error updating the task!', error);
        });
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-screen p-6">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">To Do List</h1>

        <div className="mb-4">
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter new task description"
            className="p-2 rounded-md bg-gray-700 text-white w-4/5 mr-2"
          />
          <button
            onClick={handleNewTask}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            New Task
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Task Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-200 hover:text-gray-400 uppercase tracking-wider">
                <button onClick={syncTasks}>Sync</button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 text-left max-w-xs break-words text-ellipsis whitespace-normal">
                  {task.description}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-4"
                    onClick={() => { /* logic to edit task */ }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => { handleDeleteTask(task.id); }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;
