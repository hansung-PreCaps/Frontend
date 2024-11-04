import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';  // 로그인 페이지 컴포넌트 가져오기

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* 추가 경로가 필요하면 여기에 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
