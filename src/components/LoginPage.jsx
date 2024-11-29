import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 동작 방지

    try {
      const response = await axios.post('https://dev.enble.site/api/users/signin', {
        username: credentials.id,
        password: credentials.password,
      });

      console.log('로그인 응답:', response.data); // 서버 응답 확인
    

      if (response.status === 200) {
        // 로그인 성공 시 토큰을 저장하고 페이지 이동
        const { result } = response.data; // 응답의 result에서 데이터 추출
        const { access_token, refresh_token } = result;
        if (!access_token || !refresh_token) {
          throw new Error('액세스 토큰 또는 리프레시 토큰이 없습니다.');
        }
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        console.log(access_token); // 서버 응답 확인
        navigate('/mainpage');
      }
    } catch (error) {
      // 오류 처리
      setErrorMessage('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
      console.error('Login error:', error);
    }
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
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-fields">
              <input
                type="text"
                name="id"
                placeholder="아이디"
                className="inputField"
                value={credentials.id}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                className="inputField"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="login-button" type="submit">
              로그인
            </button>
          </form>
        </div>

        <div className="links-container">


          <a href="/signup" className="link-text">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
