import {createSlice} from "@reduxjs/toolkit";

export const activeProdSlice=createSlice({
    name:"activeProd",
    initialState:{
        active:""
    },
    reducers:{
        setActiveProd:(state,action)=>{
            state.active=action.payload;
        },
    }
})

export const {setActiveProd}= activeProdSlice.actions;
export default activeProdSlice.reducer;