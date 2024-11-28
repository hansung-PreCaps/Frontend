import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

import "./JoinPage.css";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // useNavigate 초기화

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  // 회원가입 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, password, passwordConfirm, name, email } = formData;

    // 입력값 유효성 검사
    if (!userId || !password || !passwordConfirm || !name || !email) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!validatePassword(password)) {
      setError("비밀번호는 최소 8자 이상이어야 하며, 하나 이상의 숫자와 특수 문자를 포함해야 합니다.");
      return;
    }

    setError(""); // 에러 초기화

    try {
      const response = await fetch("https://dev.enble.site/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userId,
          password: password,
          email: email,
        }),
      });

      if (response.ok) {
        setSuccess("회원가입이 성공적으로 완료되었습니다!");
        setTimeout(() => navigate("/"), 1000); // 1초 후 /로 이동
      } else {
        const data = await response.json();
        setError(data.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 요청 중 문제가 발생했습니다.");
    }
  };

  // ID 중복 확인 핸들러
  const handleIdCheck = () => {
    // ID 중복 확인 로직 (추후 API 호출 추가)
    alert("사용 가능한 아이디입니다.");
  };

  return (
    <div className="join-page">
      <div className="join-container">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-picture"></span>
          <h1>Pic&Talk</h1>
          <span className="logo-talk"></span>
        </div>
        <h2 className="form-title">회원가입</h2>
        <div className="join-form-container">
          <form className="join-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userId">아이디</label>
              <input
                type="text"
                id="userId"
                className="input-field"
                value={formData.userId}
                onChange={handleChange}
              />
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
              <input
                type="password"
                id="password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirm"
                className="input-field"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <button type="submit" className="join-button">
              가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
