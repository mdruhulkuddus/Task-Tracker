import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CompletedTodoItem = ({ item, index, onDelete }) => {
  return (
    <div className="todo-list-item">
      <div>
        <h3>{item.title}</h3>
        <p>
          <small>Completed on: </small>
          {item.completedTime}
        </p>
      </div>
      <div>
        <AiOutlineDelete
          className="icon"
          title="Delete"
          onClick={() => 
            {
              if (window.confirm("Are you sure to delete this task?")) {
                onDelete(index)
              }
            }
          }
        />
      </div>
    </div>
  );
};

export default CompletedTodoItem;
