import React from 'react';
import './AddGroupModal.css';

function AddGroupModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">그룹 추가</h3>
        <hr className="modal-divider" />
        <p className="modal-description">추가할 그룹 이름을 입력하세요.</p>
        <input
          type="text"
          placeholder=""
          className="modal-input"
        />
        <div className="modal-actions">
          <button className="modal-button primary">추가</button>
          <button className="modal-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGroupModal;
