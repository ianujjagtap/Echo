import React from 'react';
import Prompt from './components/promptbox';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './components/navbar';
import GenerateSection from "./components/generation";
import SideBar from './components/sidebar';



function App() {
  return (
    <>
      <Navbar />
      <SideBar/>
      <GenerateSection  />
      <Prompt/>
    </>
  );
}

export default App;