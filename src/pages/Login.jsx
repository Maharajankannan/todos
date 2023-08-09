import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { login } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const initialState = {
    email:'',
    password:''
  }
  const [datas, setDatas] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e)=>{
    e.preventDefault();
    console.log(datas);
    dispatch(login(datas));
    navigate('/');
    
  }

  const changeHandler =(e)=>{
    const {name, value} = e.target;
    setDatas({...datas, [name]: value})
  }
  return (
    <div>
        <h2 className='text-center mt-4 '>User Login</h2>
        <div className='w-50 m-auto mt-5'>
        <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h5><Form.Label>Email address</Form.Label></h5>
        <Form.Control type="email" name="email" value={datas.email} onChange={changeHandler} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <h5><Form.Label>Password</Form.Label></h5>
        <Form.Control type="password" name="password" value={datas.password} onChange={changeHandler} placeholder="Password" />
      </Form.Group>
      <div className="text-center">
      <Button variant="primary" type="submit" className='px-5 mt-3 '>
        Login
      </Button>
      </div>
      
    </Form>
        </div>
        

    </div>
  )
}

export default Login