import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JoinPage from './components/JoinPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinPage />} />
        {/* 추가 경로가 필요하면 여기에 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
