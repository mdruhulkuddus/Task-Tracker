import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onComplete, onEdit }) => {
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateTodo = () => {
    onEdit(currentEdit, currentEditedItem);
    setCurrentEdit("");
  };

  return (
    <>
      {todos.map((item, index) => {
        if (currentEdit === index) {
          return (
            <div className="edit_todo" key={index}>
              <input
                type="text"
                onChange={(e) => handleUpdateTitle(e.target.value)}
                value={currentEditedItem.title}
              />
              <textarea
                name=""
                id=""
                onChange={(e) => handleUpdateDescription(e.target.value)}
                value={currentEditedItem.description}
              ></textarea>
              <button type="button" onClick={handleUpdateTodo} className="primaryBtn">
                Update
              </button>
            </div>
          );
        } else {
          return (
            <TodoItem
              key={index}
              item={item}
              index={index}
              onDelete={onDelete}
              onComplete={onComplete}
              onEdit={handleEdit}
            />
          );
        }
      })}
    </>
  );
};

export default TodoList;
