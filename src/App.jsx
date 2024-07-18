import React, { useState } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Echo from './components/echo';
import Login from './components/login';
import Signup from './components/signup';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      {isAuthenticated ? (
        <Echo />
      ) : (
        <>
          <Login setIsAuthenticated={setIsAuthenticated} />
          
        </>
      )}

    </>
  );
}

export default App;