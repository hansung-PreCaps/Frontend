// PreviewModal.jsx
import React from 'react';
import './PreviewModal.css';

function PreviewModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>메시지 미리보기</h2>
        {/* 모달 내의 내용을 여기에 추가 */}
        <p>미리보기 내용이 여기에 표시됩니다.</p>
        <button onClick={onClose} className="close-button">닫기</button>
      </div>
    </div>
  );
}

export default PreviewModal;
