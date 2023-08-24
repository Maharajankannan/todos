import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('getTodos', async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const result = await response.json();
    return result;
})

export const updateTodos = createAsyncThunk('update',async(data)=>{
    console.log(data,'updatedata');
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`,{
        method:"PUT",
        headers:{
            "Accept" : "application/json",
            "Content-type": "application/json",
        },
        body:JSON.stringify(data),
    })
        // console.log(res.json(),'response');
        const result = await response.json();
        
        return result;
        
        // console.log(response,'res1');
    
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
        edited: [JSON.parse(localStorage.getItem('edited'))] ,
        
        
    },
    extraReducers:{
        [fetchTodos.fulfilled]:(state,action)=>{
            state.todos = action.payload;
            console.log(state.todos,'edf');
            state.todos.id = action.payload.id;
            localStorage.setItem('todos', JSON.stringify(state.todos.map((ele)=>ele)));
            
            
        },
        [updateTodos.fulfilled]:(state,action)=>{
            
            state.edited?.push(action.payload);
            console.log(state.edited,'edfg');
            localStorage.setItem('edited',JSON.stringify(state.edited));
            if(state.edited?.length>1){
                const copy = [...state.todos];
                const index = copy?.findIndex((ind)=>ind?.id === action.payload?.id );
                copy.splice(index,1,action.payload);
                state.todos = copy;
                localStorage.setItem('todos', JSON.stringify(state.todos.map((ele)=>ele)));
            }
            // if(state.edited){
            //     state.edited.push(localStorage.setItem('edited'),JSON.stringify(state.edited))
            // }
            
            // state.edited.id = action.payload.id;
            
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