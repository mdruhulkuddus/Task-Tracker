import React from "react";
import CompletedTodoItem from "./CompletedTodoItem";

const CompletedTodoList = ({ todos, onDelete }) => {
  return (
    <>
      {todos.map((item, index) => (
        <CompletedTodoItem key={index} item={item} index={index} onDelete={onDelete} />
      ))}
    </>
  );
};

export default CompletedTodoList;
