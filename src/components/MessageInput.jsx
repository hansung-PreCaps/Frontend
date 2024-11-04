// MessageInput.jsx
import React from 'react';

function MessageInput({ subject, setSubject, content, setContent }) {
  return (
    <div>
      <h2 className="h2-message">메세지 입력</h2>
      <div className="message-background">
        <input
          type="text"
          placeholder="제목"
          className="input-title"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button className="graybutton">AI 자동 생성</button>
        <button className="graybutton2">내 문자함</button>
        <textarea
          className="input-content"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="tem-save">임시 저장 하기</button>
        <div>
          <label className="image-addition">이미지 추가</label>
          <div className="image-background">
            <button className="image-plus">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
