import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JoinPage from './components/JoinPage';
import LoginPage from './components/LoginPage';
import MessagesendingPage from "./components/MessagesendingPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<JoinPage />} />
        <Route path="/messagesending" element={<MessagesendingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
