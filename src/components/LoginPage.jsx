import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate(); // useNavigate 훅 선언

  const handleButtonClick = () => {
    navigate('/messagesending'); // 버튼 클릭 시 MessagesendingPage로 이동
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <span className="logo-picture"></span>
          <h1>Pic&Talk</h1>
          <span className="logo-talk"></span>
        </div>
        
        <div className="login-form-container">
          <form className="login-form">
            <div className="input-fields">
              <input 
                type="text"
                placeholder="아이디"
                className="input-field"
              />
              <input 
                type="password"
                placeholder="비밀번호" 
                className="input-field"
              />
            </div>
            <button 
              className="login-button"
              type="submit"
              onClick={handleButtonClick}
            >
              로그인
            </button>
          </form>
        </div>
        <div className="links-container">
          <a href="/forgot-password" className="link-text">
            비밀번호 찾기
          </a>
          <span className="separator">|</span>
          <a href="/forgot-id" className="link-text">
            아이디 찾기
          </a>
          <span className="separator">|</span>
          <a href="/signup" className="link-text">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
