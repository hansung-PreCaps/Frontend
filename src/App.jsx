import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JoinPage from './components/JoinPage';
import LoginPage from './components/LoginPage';
import MessagesendingPage from './components/MessagesendingPage';
import MyPage from './pages/MyPage';
import ReserveMessage from './components/ReserveMessege'; // 경로 확인 및 수정

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/signup" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/messagesending" element={<MessagesendingPage />} />
        <Route path="/reserve-message" element={<ReserveMessage />} /> {/* 경로 수정 */}
      </Routes>
    </Router>
  );
}

export default App;
