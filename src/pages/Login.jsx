import React, { useEffect, useState } from 'react'
import { InputGroup } from 'react-bootstrap';
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
  const {user} = useSelector((state)=>state.auth);
  
  const [datas, setDatas] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [textType, setTextType] = useState(false);
  const users = JSON.parse(localStorage.getItem('registerUser')) ;

  console.log(user,'user');
  console.log(Object.values(user),'users');
  const final = Object.values(user);
  // const final1 = Object.keys(user);


  
    const loginData = final ?.filter((el,key)=>{
      console.log(final[0])
      return final[1] === datas?.email && final[2] === datas?.password;
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
    <div > 
      <div className="new-form">

      
        <h2 className='title mt-4 text-center '>User Login</h2>
        <p className=' text-danger  text-center mt-4 fw-bold'>{formError?.status}</p>
        <div className='w-50 m-auto mt-5'>
        <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h5><Form.Label>Email address</Form.Label></h5>
        
        <Form.Control type="text" name="email" value={datas.email} onChange={changeHandler} placeholder="Enter email" />
        
      </Form.Group>
      <p className='text-danger fw-bold'>{formError?.email}</p>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <h5><Form.Label>Password</Form.Label></h5>
        <InputGroup>
        <Form.Control type={textType ? "text" : "password"} name="password" value={datas.password} onChange={changeHandler} placeholder="Password"/>
        <Button onClick={()=>setTextType(!textType)}>
          {
            textType ? <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" style={{fill:"white"}}><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" style={{fill:"white"}}><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
          }
        
        </Button>
        </InputGroup>
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
    </div>
  )
}

export default Login