import React, { useState, useEffect, useRef } from 'react';
import Prompt from './components/promptbox';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './components/navbar';
import GenerateSection from "./components/generation";

function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [lockedPrompt,setLockedPrompt]=useState('')
  

  return (
    <div>
      <Navbar />
      <GenerateSection generatedText={generatedText} setGeneratedText={setGeneratedText} showLogo={showLogo} prompt={lockedPrompt} />

      <Prompt generatedText={generatedText} setGeneratedText={setGeneratedText} setShowLogo={setShowLogo} prompt={prompt} setPrompt={setPrompt} setLockedPrompt={setLockedPrompt} />
    </div>
  );
}

export default App;