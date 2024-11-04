import React from "react";
import "./JoinPage.css";

export default function JoinPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직
  };

  const handleIdCheck = () => {
    // ID 중복 확인 로직
  };

  return (
    <div className="join-page">
      <div className="join-container">
        <div className="logo">
          <span className="logo-picture"></span>
          <h1>Pic&Talk</h1>
          <span className="logo-talk"></span>
        </div>
        <h2 className="form-title">회원가입</h2>
        <div className="join-form-container">
          <form className="join-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userId">아이디</label>
              <input type="text" id="userId" className="input-field" />
              <button
                type="button"
                className="check-button"
                onClick={handleIdCheck}
              >
                확인
              </button>
            </div>

            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" className="input-field" />
            </div>

            <div className="input-group">
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input type="password" id="passwordConfirm" className="input-field" />
            </div>

            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input type="text" id="name" className="input-field" />
            </div>

            <div className="input-group">
              <label htmlFor="phone">전화번호</label>
              <input type="tel" id="phone" className="input-field" />
            </div>

            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" className="input-field" />
            </div>
          </form>
        </div>
        <button type="submit" className="join-button" onClick={handleSubmit}>
          가입
        </button>
      </div>
    </div>
  );
}
