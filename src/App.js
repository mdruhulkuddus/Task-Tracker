import "./App.css";
import React, { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import CompletedTodoList from "./components/CompletedTodoList";
import PopupMessage from "./components/PopupMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  // task add

  const handleAddTodo = (newTodo) => {
    let updatedTodoArr = [newTodo, ...allTodos];
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    toast("New Task Added");
  };

  // delete task
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
    toast.error("Task Deleted Successfully");
  };

  // delete completed task

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  // complete task
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let fullTime = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = { ...allTodos[index], completedTime: fullTime };

    let updatedCompletedTodosArr = [filteredItem, ...completedTodos];
    setCompletedTodos(updatedCompletedTodosArr);

    // Remove the completed todo from the allTodos array

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.splice(index, 1);
    setTodos(updatedTodoArr);

    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedTodosArr)
    );

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5 * 1000);
  };
  // edit update
  const handleEdit = (index, newTodo) => {
    let updatedTodos = [...allTodos];
    updatedTodos[index] = newTodo;
    setTodos(updatedTodos);
    toast.success("Todo Updated Successfully");
  };

  return (
    <div className="App">
      <div className="todo-wrapper">
        <div className="logo">
          <img src="/images/logo1.png" alt="Logo" />
        </div>
        <TodoInput onAddTodo={handleAddTodo} />
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todos ({allTodos.length})
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed ({completedTodos.length})
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen ? (
            <CompletedTodoList
              todos={completedTodos}
              onDelete={handleDeleteCompletedTodo}
            />
          ) : (
            <TodoList
              todos={allTodos}
              onDelete={handleDeleteTodo}
              onComplete={handleComplete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
      {showPopup && <PopupMessage />}
      <ToastContainer />
    </div>
  );
}

export default App;
