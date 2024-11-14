import React from 'react';
import './AIModal.css';

const AIModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
            <h2>AI 자동생성</h2>
            <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
          <div className="input-section">
            <label>발송 목적 및 내용</label>
            <textarea placeholder="내용을 입력하세요" className="input-content"/>
            <br></br>
            <label>중요 키워드 (선택)</label>
            <div className="keyword-section">
              <input type="text" placeholder="키워드를 입력하세요" className="keyword-input"/>
              <button className="addition-button">추가</button>
            </div>
            <button className="generate-button">생성하기</button>
          </div>
          <div className="result-section">
          <label>생성 결과</label>
            <div className="result">

            </div>
            <div className="button-section">
              <button className="use-button">사용하기</button>
              <button className="del-button">삭제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;