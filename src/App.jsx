import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import store from './app/store';
import Signup from './components/signup';
import { Provider } from 'react-redux';
import Prompt from './components/promptbox';
import Navbar from './components/navbar';
import GenerateSection from "./components/generation";
import SideBar from './components/sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <Router future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/echo"
            element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <SideBar />
                  <GenerateSection />
                  <Prompt />
                </>
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;