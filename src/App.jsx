import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./todoSlice";
import Card from 'react-bootstrap/Card';

function App() {

  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  console.log(todos);

  return (
    <div className="App">
      <div className="d-flex justify-content-between p-4">
        <h1>Sample API</h1>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(fetchTodos())}
        >
          Click here!
        </Button>
      </div>
      <div className="row mb-3 my-3 mx-3">
        {todos &&
          todos.map((todo, index) => (
            <div key={index} className="col-md-3">
              <Card style={{ width: "14rem" }}>
                <Card.Body>
                  <Card.Title>{todo.title}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
