import React, { useState } from "react";

const TodoInput = ({ onAddTodo }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    onAddTodo(newTodoItem);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Write Title"
        />
      </div>
      <div className="todo-input-item">
        <label htmlFor="description">Detail</label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Write Description"
        />
      </div>
      <div className="todo-input-item">
        <button type="button" onClick={handleAddTodo} className="primaryBtn">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
