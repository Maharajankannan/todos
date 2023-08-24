import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../slice/authSlice';
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = {
        name:'',
        email:'',
        password:''
      }
      const [datas, setDatas] = useState(initialState);
      const [formError, setFormError] = useState({});
      const changeHandler =(e)=>{
        const {name, value} = e.target;
        setDatas({...datas, [name]: value})
      }
      const handleSubmit = (e)=>{
        console.log(datas,'de');
        e.preventDefault();
        setFormError(validate(datas));
        if(Object.keys(formError).length===0){
          if(datas.email!=='' && datas.name!=='' && datas.password!==''){
            dispatch(addUser(datas));
            navigate('/login');
          }
          
            
            
        }
        
      }
      const validate =(values)=>{
        const errors ={};
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(!values.name){
            errors.name = "Username is required";
        }
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
        return errors;

      }
  return (
    <div>
        <h2 className='text-center mt-4 '>Create Account</h2>
        <div className='w-50 m-auto mt-5'>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h5><Form.Label>Name</Form.Label></h5>
        <Form.Control type="text" name="name" value={datas.name} onChange={changeHandler} placeholder="Enter name" />
      </Form.Group>
      <p className='text-danger fw-bold'>{formError?.name}</p>
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
        Signup
      </Button>
      </div>
      <div className="text-center mt-4">
        <h5>Already have an account?
        <Link to='/login'>Login</Link>
        </h5>
        
      </div>
    </Form>
        </div>
    </div>
  )
}

export default Signup