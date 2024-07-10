import React from 'react';
import Prompt from './components/promptbox';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './components/navbar';
import GenerateSection from "./components/generation";


function App() {
  return (
    <>
      <Navbar />
      <GenerateSection  />
      <Prompt/>
    </>
  );
}

export default App;