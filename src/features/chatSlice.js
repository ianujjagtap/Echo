import { createSlice } from "@reduxjs/toolkit";

// Defining Initial States 

const initialState = {
    generatedText:'',
    showLogo:true,
    prompt:'',
    lockedPrompt:''
}

// Creating Slice 

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setGeneratedText:(state,action)=>{
            state.generatedText = action.payload;
        },
        setShowLogo:(state,action) =>{
            state.showLogo = action.payload;
        },
        setPrompt:(state,action)=>{
            state.prompt = action.payload;
        },
        setLockedPrompt:(state,action)=>{
            state.lockedPrompt = action.payload;
        }
    }

});

export const { setGeneratedText, setShowLogo, setPrompt, setLockedPrompt } = chatSlice.actions;
export default chatSlice.reducer;
