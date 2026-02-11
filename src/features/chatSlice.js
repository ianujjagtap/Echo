import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generatedText: "",
  showLogo: true,
  prompt: "",
  lockedPrompt: "",
  isSidebarVisible: false,
};

const chatSlice = createSlice({
  name: "chat",
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
    },
  },
});

export const {
  setGeneratedText,
  setShowLogo,
  setPrompt,
  setLockedPrompt,
  toggleSidebar,
} = chatSlice.actions;

export default chatSlice.reducer;
