import "./App.css";
import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <SignUp setShowLogin={setShowLogin} />
        )}
      </header>
    </div>
  );
}

export default App;
