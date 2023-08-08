import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { clickCurrentPage, clickNext, clickPrev, fetchTodos } from "./todoSlice";
import Card from 'react-bootstrap/Card';

function App() {

  const dispatch = useDispatch();
  const { todos, todosPerPage, currentPage } = useSelector((state) => state.todo);
  const totalPages = todos.length / todosPerPage;
  const pages = [...Array(totalPages+1).keys()].slice(1);
  console.log(pages);
  const indexLast = currentPage * todosPerPage;
  const indexFirst = indexLast - todosPerPage; 

  const finalTodos = todos.slice(indexFirst, indexLast);

  const navigatePrev =()=>{
    if(currentPage !==1){
      dispatch(clickPrev());
    }
  }
  const navigateNext = () =>{
    if(currentPage !== totalPages){
      dispatch(clickNext());
    }
  }
  const currentPages = (page)=>{
    dispatch(clickCurrentPage(page));
  }

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
      <hr />
        <div className="text-center">
          Page {currentPage} of {totalPages}
        </div>
      <div className="row mb-3 my-3 mx-3">
        {todos &&
          finalTodos.map((todo, index) => (
            <div key={index} className="col-md-3">
              <Card style={{ width: "14rem" }}>
                <Card.Body>
                  <Card.Title>{todo.title}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>

      <div className="text-center mt-5">
        <p>
          <span className="button" onClick={navigatePrev}> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> </span>
          {pages.map((page,index)=>(
            <span className="button" onClick={()=>currentPages(page)} key={index}>{page}</span>
          ))}
          <span className="button" onClick={navigateNext}> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></span>
        </p>
      </div>
    </div>
  );
}

export default App;
