import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickCurrentPage, clickNext, clickPrev, editTodo, fetchTodos, updateTodos } from "../../slice/todoSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link, NavLink } from "react-router-dom";
import { logout } from "../../slice/authSlice";
import ModalEdit from "./ModalEdit/ModalEdit";

const Todos = () => {
  
  const [show, setShow] = useState(false);
  
  // const [editData, setEditData] = useState();
  const { todos, todosPerPage, currentPage, edit, body } = useSelector(
    (state) => state.todo
  );
  // console.log(todos,'to')
  
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const totalPages = todos.length / todosPerPage;
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  console.log(pages);
  const indexLast = currentPage * todosPerPage;
  const indexFirst = indexLast - todosPerPage;
  const finalTodos = todos.slice(indexFirst, indexLast);
  console.log(finalTodos,'fins')
  const [id, setId] = useState();
  // const singleTodo = finalTodos.filter()
  const singleTodo = finalTodos.filter((ele,ind)=> ele?.id === id);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(clickPrev());
    }
  };
  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(clickNext());
    }
  };
  const currentPages = (page) => {
    dispatch(clickCurrentPage(page));
    setisLoading(true);
  };
  
  
  // console.log(editData,'ede');
  
  
  
  
  
  return (
    <div>
      <div className="d-flex justify-content-between p-4">
        <h1>Sample API</h1>
        {!user?.loginState ?(
            <Link to="/login">
            <Button variant="primary" size="lg">
              Login to Fetch
            </Button>
          </Link>
        ) :
        <Button variant="danger" size="lg" onClick={()=>dispatch(logout())}>
              Logout
            </Button>
    }
        
      </div>
      <hr />
      
      <div>
        <div className="d-flex justify-content-between m-4">
        {user?.loginState ? (
            <Button
            variant="outline-primary"
            onClick={() => dispatch(fetchTodos())}
          >
            Fetch Todos
          </Button>
        ):''} 
          
          {user.loginState && todos.length ? (
            <div className="text-bold">
              <h4>
                Page {currentPage} of {totalPages}
              </h4>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="row mb-3 my-3 mx-3">
          {user.loginState && todos && singleTodo &&
            finalTodos.map((todo, index) => (
              
              <div key={index} className="col-md-3">
                
                <Card style={{ width: "14rem" }}>
                  <Card.Body className="d-flex justify-content-between gap-3">
                    <Card.Title>{todo?.title}</Card.Title>
                    
                    <div className="pointer" >
                      
                    <svg onClick={()=> {setId(todo.id);setShow(true)}} xmlns="http://www.w3.org/2000/svg" height="1em"  viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                    
                    </div>
                    
                  </Card.Body>
                </Card>
                
               <ModalEdit  showModal={show} id={id}  single ={singleTodo}  close ={()=>setShow(false)} />
              </div>
              
            ))}
        </div>

        {user.loginState && todos.length ? (
          <div className="text-center mt-5">
            <p>
              <span className="button" onClick={navigatePrev}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>{" "}
              </span>
              {pages.map((page, index) => (
                <span
                  className={`${currentPage === page ? "active" : "button"}`}
                  onClick={() => currentPages(page)}
                  key={index}
                >
                  {page}
                </span>
              ))}
              <span className="button" onClick={navigateNext}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      
    </div>
  );
};

export default Todos;
