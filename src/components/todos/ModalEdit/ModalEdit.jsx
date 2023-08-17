import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import { updateTodos } from '../../../slice/todoSlice';
const ModalEdit = ({showModal,  single,  close }) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(); 

 
    // console.log(single[0].title,'sd')
    // const {todos} = useSelector((state)=>state.todo);
    useEffect(()=>{
    
      setEditData(single[0]);
      
  },[single]);
  // console.log(editData,'de');

  const newData = (e)=>{
    e.preventDefault();
    setEditData({...editData, [e.target.name] : e.target.value});
  }
  
  console.log(editData,'ed');
    
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(updateTodos(editData));

  } 
    
   
   
    
    
    

    
  return (
    
    <div>
        <Modal show={showModal} onHide={close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit your Todos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit} >  
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Todo</Form.Label>
                        <Form.Control
                          type="text"
                          // autoFocus
                          name="title" 
                          value={editData && (editData?.title)}
                          onChange={newData}
                          

                            
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                      Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={close} >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
    </div>
  )
}

export default ModalEdit