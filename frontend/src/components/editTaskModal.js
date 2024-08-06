import React from 'react';

const EditTaskModal = ({ isOpen, taskDescription, setTaskDescription, onSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Edit task description"
          className="p-2 rounded-md bg-gray-700 text-white w-full mb-4"
        />
        <div className="text-right">
          <button
            onClick={onSave}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
