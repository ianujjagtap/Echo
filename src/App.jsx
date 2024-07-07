import React, { useState, useEffect, useRef } from 'react';
import Prompt from './components/promptbox';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './components/navbar';
import GenerateSection from "./components/generation";

function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div>
      <Navbar />
      <GenerateSection generatedText={generatedText} setGeneratedText={setGeneratedText} showLogo={showLogo} prompt={prompt} />

      <Prompt generatedText={generatedText} setGeneratedText={setGeneratedText} prompt={prompt} setPrompt={setPrompt} setShowLogo={setShowLogo} />
    </div>
  );
}

export default App;