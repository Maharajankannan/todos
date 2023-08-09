import {  createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name:'user',
    initialState:{
        user: JSON.parse(localStorage.getItem('loginUser')) || {
        email:'',
        password:'',
        loginState: false,
        }
        
    },
    reducers:{
        login(state, action){
            const userLogin = action.payload;
            state.user = userLogin;
            if(!userLogin){
                state.user.loginState = false;
            }
            else{
                state.user.loginState = true;
                const newState = JSON.stringify(userLogin);
                localStorage.setItem('loginUser', newState);
            }
        },
        logout(state, action){
            state.user={
                email :'',
                password:'',
                loginState: false,
            };
            localStorage.clear();
        }
    }

})
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;