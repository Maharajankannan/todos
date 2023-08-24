import {  createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name:'user',
    initialState:{
        user:[JSON.parse(localStorage.getItem('registerUser')) ] || [
         {
        name:'',
        email:'',
        password:'',
        loginState: false,
        }]
    ,
        

        
        
    },
    reducers:{
        addUser(state, action){
            const userRegister = action.payload;
            state.user = userRegister;
            if(!userRegister){
                state.user.loginStateState = false;
            }
            else{
                state.user.loginState = true;
                const newState = JSON.stringify(userRegister);
                localStorage.setItem('registerUser', newState);
                // console.log(newState,'ns');
                // console.log(,'ns');
            }
        },
        
        logout(state, action){
            state.user={
                name:'',
                email :'',
                password:'',
                loginState: false,
            };
            localStorage.clear();
        }
    }

})
export const {addUser, logout} = authSlice.actions;
export default authSlice.reducer;