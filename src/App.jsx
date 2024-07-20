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
      <Router>
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

// import React from 'react';
// import Prompt from './components/promptbox';
// import 'locomotive-scroll/dist/locomotive-scroll.css';
// import Navbar from './components/navbar';
// import GenerateSection from "./components/generation";
// import SideBar from './components/sidebar';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import store from './app/store';
// import Signup from './components/signup';
// import Login from './components/login';




// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />

//         </Routes>
//       </Router>
//     </Provider>
//   );
// }

function Echo() {
  return <>
    <Navbar />
    <SideBar />
    <GenerateSection />
    <Prompt />
  </>
}
