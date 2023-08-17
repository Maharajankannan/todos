import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('getTodos', async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const result = await response.json();
    return result;
})
export const updateTodos = createAsyncThunk('update',async(data,id)=>{
    console.log(data,'updatedata');
    return await fetch(`https://jsonplaceholder.typicode.com/todos`,{
        method:"POST",
        headers:{
            "Accept" : "application/json",
            "Content-type": "application/json",
        },
        body:JSON.stringify(data),
    }).then((res)=>res.json()).catch((error)=>{
        console.log(error);
    })
    
})

export const allTodos = createSlice({
    name:"todos",
    initialState:{
        todos:JSON.parse(localStorage.getItem('todos')) || [],
        todosPerPage:20,
        currentPage:1,
        edit: false,
        loading: false,
        // id:null,
        
    },
    extraReducers:{
        [fetchTodos.fulfilled]:(state,action)=>{
            state.todos = action.payload;
            state.todos.id = action.payload.id;
            localStorage.setItem('todos', JSON.stringify(state.todos.map((ele)=>ele)));
            
        },
        [updateTodos.fulfilled]:(state,action)=>{
            state.todos = state.todos.map((ele)=>{
                ele.id === action.payload?.id ? action.payload : ele
            })
        },

    },
    reducers:{
        clickNext : (state, action) => {
            state.currentPage++;
        },
        clickPrev : (state) => {
            state.currentPage--;
        },
        clickCurrentPage : (state, action) => {
            state.currentPage= action.payload;
        },
        
        
    }
});
export const {clickNext, clickPrev, clickCurrentPage, editTodo} = allTodos.actions;
export default allTodos.reducer;