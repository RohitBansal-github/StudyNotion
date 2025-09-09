import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
}

const authSilce=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
        },
    },
});

export const {setToken} = authSilce.actions;
export default authSilce.reducer;
