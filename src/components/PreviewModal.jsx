// PreviewModal.jsx
import React from 'react';
import './PreviewModal.css';

function PreviewModal({ subject, content, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>메시지 미리보기</h2>
        <div className="preview-section">
          <h3>제목</h3>
          <p>{subject || '제목 없음'}</p>
          <h3>내용</h3>
          <p>{content || '내용 없음'}</p>
        </div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default PreviewModal;
