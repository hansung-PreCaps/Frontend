import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import './AddGroupModal.css';

function AddGroupModal({ onClose, onGroupAdded }) {
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = async () => {
    try {
      const response = await axios.post("/api/groups", { group_name: groupName });
      console.log("그룹 생성 성공:", response.data);

      // 성공 시 부모 컴포넌트에 새로운 그룹 추가 요청
      onGroupAdded({ id: response.data.id, name: groupName, contacts: [] });
      alert("그룹이 성공적으로 추가되었습니다!");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("그룹 생성 실패:", error);
      alert("그룹 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">그룹 추가</h3>
        <hr className="modal-divider" />
        <p className="modal-description">추가할 그룹 이름을 입력하세요.</p>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="그룹 이름 입력"
          className="modal-input"
        />
        <div className="modal-actions">
          <button className="modal-button primary" onClick={handleAddGroup}>추가</button>
          <button className="modal-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

AddGroupModal.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose는 필수 prop
  onGroupAdded: PropTypes.func.isRequired, // onGroupAdded도 필수
};

export default AddGroupModal;
