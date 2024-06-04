import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegSquareCheck } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";

const TodoItem = ({ item, index, onDelete, onComplete, onEdit }) => {
  return (
    <div className="todo-list-item">
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div>
        <BiEdit
          className="icon edit-icon"
          title="Edit"
          onClick={() => {
            onEdit(index, item);
          }}
        />
        <AiOutlineDelete
          className="icon delet-icon"
          title="Delete"
          onClick={() => {
            if (window.confirm("Are you sure to delete this task?")) {
              onDelete(index);
            }
          }}
        />
        <FaRegSquareCheck
          className="icon complet-icon"
          title="Done"
          onClick={() => {
            onComplete(index);
          }}
        />
      </div>
    </div>
  );
};

export default TodoItem;
