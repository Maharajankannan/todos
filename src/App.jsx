import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes,} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ModalEdit from "./components/todos/ModalEdit/ModalEdit";



function App() {

  
  
  
  

  

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/edit/:id" element={<ModalEdit/>}/> */}
      
    </Routes>

  </BrowserRouter>
  
  
  );
}

export default App;
