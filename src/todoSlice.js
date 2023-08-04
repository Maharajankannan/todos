import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('getTodos', async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const result = await response.json();
    return result;
})

export const allTodos = createSlice({
    name:"todos",
    initialState:{
        todos:[],
    },
    extraReducers:{
        [fetchTodos.fulfilled]:(state,action)=>{
            state.todos = action.payload;
        }
    }
});

export default allTodos.reducer;