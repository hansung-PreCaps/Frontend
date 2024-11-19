import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JoinPage from './components/JoinPage';
import LoginPage from './components/LoginPage';
import MainPage from "./components/MainPage";
import ChatbotPage from './components/ChatbotPage';
import ImagePage from './components/ImagePage';
import MyPage from './mypage/MyPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<JoinPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/chatbotpage" element={<ChatbotPage />} />
        <Route path="/imagepage" element={<ImagePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
