import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const initialState = {
    email:'',
    password:''
  }
  const {user=[]} = useSelector((state)=>state.auth);
  
  const [datas, setDatas] = useState(initialState);
  const [formError, setFormError] = useState({});
  // const users = JSON.parse(localStorage.getItem('registerUser')) ;
  console.log(Object.values(user));
  
    const loginData = user?.filter((el,key)=>{
      return el?.email === datas?.email && el?.password === datas?.password;
  });

  console.log(loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e)=>{
    e.preventDefault();
    setFormError(validate(datas));
   
    
    
    if(Object.keys(formError).length===0){
    if(loginData?.length){
      navigate('/');
      
    }
  }
    
    
    
  }
  const validate =(values)=>{
    const errors ={};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    
    if(!values.email){
        errors.email = "Email is required";
    }
    else if(!regex.test(values.email)){
        errors.email = "Enter a valid email!"
    }

    if(!values.password){
        errors.password = "Password is required";
    }
    else if(values.password.length < 4){
        errors.password = "Password must be more than 4 characters"
    }
    else if(values.password.length > 10){
        errors.password = "Password should not exceed more than 10 characters"
    }
    if(!loginData || loginData.length===0){
      errors.status = "Login Credentials mismatched!"
    }
    return errors;

  }

  const changeHandler =(e)=>{
    const {name, value} = e.target;
    setDatas({...datas, [name]: value})
  }
  useEffect(() => {
    
  
    
  }, [user])
  
  return (
    <div>
        <h2 className='text-center mt-4 '>User Login</h2>
        <p className='text-danger text-center mt-4 fw-bold'>{formError?.status}</p>
        <div className='w-50 m-auto mt-5'>
        <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h5><Form.Label>Email address</Form.Label></h5>
        <Form.Control type="text" name="email" value={datas.email} onChange={changeHandler} placeholder="Enter email" />
      </Form.Group>
      <p className='text-danger fw-bold'>{formError?.email}</p>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <h5><Form.Label>Password</Form.Label></h5>
        <Form.Control type="password" name="password" value={datas.password} onChange={changeHandler} placeholder="Password" />
      </Form.Group>
      <p className='text-danger fw-bold'>{formError?.password}</p>
      
      <div className="text-center">
      <Button variant="primary" type="submit" className='px-5 mt-3 '>
        Login
      </Button>
      </div>
      <div className="text-center mt-4">
        <h5>Dont have an account?
        <Link to='/signup'>Signup</Link>
        </h5>
        
      </div>
      
    </Form>
        </div>
        

    </div>
  )
}

export default Login