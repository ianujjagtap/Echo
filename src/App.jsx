import React, { useState, useEffect, useRef } from 'react';
import Prompt from './components/promptbox';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './components/navbar';
import GenerateSection from "./components/generation";


function App() {
  return (
    <div>
      <Navbar />
      <GenerateSection  />
      <Prompt/>
    </div>
  );
}

export default App;