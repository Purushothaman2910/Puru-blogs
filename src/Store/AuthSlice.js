import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    status : false ,
    userData : null 
}

let authSlice = createSlice({
    name : 'auth' , 
    initialState : initialState ,
    reducers  :  {
        login : (state , action) =>{
            state.status = true ;
            state.userData = action.payload.userData ;
        },
        logOut :(state , action ) =>{
            state.status = false ;
            state.userData = null ;
        }
    }
})

export const { login , logOut } = authSlice.actions ;
export default authSlice.reducer ;