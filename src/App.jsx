import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Generation from "./components/generation";
import Prompt from "./components/promptbox";
import { useSelector } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isSidebarVisible = useSelector((state) => state.chat.isSidebarVisible);

  // persist auth across page refreshes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <Router future={{ v7_startTransition: true }}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/echo" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/signup"
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/echo"
            element={
              isAuthenticated ? (
                <div className="flex h-screen flex-col bg-background">
                  <Navbar />
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main
                      className="flex flex-1 flex-col transition-all duration-300"
                      style={{
                        marginLeft: isSidebarVisible ? "20rem" : "0",
                      }}
                    >
                      <Generation />
                      <Prompt />
                    </main>
                  </div>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
