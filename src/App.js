import "./App.css";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdCheckboxOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [CompletedTodos, setCompletedTodos] = useState([]); // empty array
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  // add task

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.unshift(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr)); // js object or array to JSON string
    setNewTitle("");
    setNewDescription("");
  };

  // delete task

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    // Storing the updated reducedTodo array in localStorage
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  // delete completed task

  const handleDeleteCompletedTodo = (index) =>{
    let reducedTodo = [...CompletedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  // complete task

  const handleComplete = (index) => {
    // console.log(index);
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let FullTime = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedTime: FullTime,
    };

    let UpdatedCompletedTodosArr = [...CompletedTodos];
    UpdatedCompletedTodosArr.unshift(filteredItem);
    setCompletedTodos(UpdatedCompletedTodosArr);

    // Remove the completed todo from the allTodos array
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.splice(index, 1);
    setTodos(updatedTodoArr);

    localStorage.setItem(
      "completedTodos",
      JSON.stringify(UpdatedCompletedTodosArr)
    );
  };

  // edit update

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value) =>{
    setCurrentEditedItem((prev) => {
      return {...prev, title:value}
    })
  }
  const handleUpdateDescription = (value) =>{
    setCurrentEditedItem((prev) => {
      return {...prev, description:value}
    })
  }
  const handleUpdateTodo = ()=> {
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setCurrentEdit("");
  }
  

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

  return (
    <div className="App">
      {/* <h1>Task Tracker</h1> */}
      <div className="todo-wrapper">
       <div className="logo">
       <img src="/images/logo1.png" alt="Logo" />
       </div>
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
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todos
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&         // all todos
            allTodos.map((item, index) => {

              if(currentEdit === index){
                  return(
                    <div className="edit_todo" key={index}>
                      <input type="text" onChange={(e)=>handleUpdateTitle(e.target.value)}  value={currentEditedItem.title} />
                    
                    <textarea name="" id="" onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description}></textarea>
                    <button
              type="button"
              onClick={handleUpdateTodo}
              className="primaryBtn"
            >
              Update
            </button>
                    </div>
                  );
              }else{
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                    <BiEdit 
                       className="check-icon"
                       title="Edit"
                       onClick={() => {
                         handleEdit(index, item);
                       }}
                      />
                      <AiOutlineDelete
                        className="icon"
                        title="Delete"
                        onClick={() => {
                          handleDeleteTodo(index);
                        }}
                      />
                       <IoMdCheckboxOutline
                        className="check-icon"
                        title="Done"
                        onClick={() => {
                          handleComplete(index);
                        }}
                      />
                 
                    </div>
                  </div>
                );
              }

            })}

          {isCompleteScreen === true &&
            CompletedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: </small>
                      {item.completedTime}
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Delete"
                      onClick={() => {
                        handleDeleteCompletedTodo(index);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
