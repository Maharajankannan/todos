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
        todosPerPage:20,
        currentPage:1,
    },
    extraReducers:{
        [fetchTodos.fulfilled]:(state,action)=>{
            state.todos = action.payload;
        }
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
export const {clickNext, clickPrev, clickCurrentPage} = allTodos.actions;
export default allTodos.reducer;