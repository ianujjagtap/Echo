import { createSlice } from "@reduxjs/toolkit";

// Defining Initial States 

const initialState = {
    generatedText: '',
    showLogo: true,
    prompt: '',
    lockedPrompt: '',
    toggleSidebar: false,
    isSidebarVisible:false
}

// Creating Slice 

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setGeneratedText: (state, action) => {
            state.generatedText = action.payload;
        },
        setShowLogo: (state, action) => {
            state.showLogo = action.payload;
        },
        setPrompt: (state, action) => {
            state.prompt = action.payload;
        },
        setLockedPrompt: (state, action) => {
            state.lockedPrompt = action.payload;
        },
        toggleSidebar: (state) => {
            state.isSidebarVisible = !state.isSidebarVisible;
        }
    }

});

export const { setGeneratedText, setShowLogo, setPrompt, setLockedPrompt, setToggleSidebar,toggleSidebar,showLogo } = chatSlice.actions;
export default chatSlice.reducer;




