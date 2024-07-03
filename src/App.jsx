import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI('AIzaSyAG1hnTOoQ6ioyIVzCDer3MCsjxrMajzhI'); // declaring new gen ai and providing api key to it

function App() {
  const [prompt, setPrompt] = useState('');  //useState variable for prompt 
  const [generatedText, setGeneratedText] = useState('');   //usestate variable for ganerate text

  // Function to handle generation of text based on user prompt

  const handleGenerate = async () => {
    // Getting a generative model from the Google Generative AI API

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });   // Defining the model for Google Generative AI

    try {
      // Generating content based on the user-provided prompt

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      const splitedText = text.split("*");
      const joinedText = vv.join(" ")
      setGeneratedText(joinedText);
      // Updating state with the generated text

      // setGeneratedText(text);  // Setting the generated text to display in the UI
    } catch (error) {
      // Handling errors that occur during content generation

      console.error('Error generating content:', error);  // Logging an error message if content generation fails
    }
  };

  
  return (
    <div>
      <h1>Generative AI Demo</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleGenerate}>Generate</button>
      <br />
      <h2>Generated Story:</h2>
      <p>{generatedText}</p>
    </div>
  );
}

export default App;
