import React, { useState } from 'react';
import PropTypes from "prop-types";
import './AddGroupModal.css';
import axiosInstance from "../utils/axiosInstance";

function AddGroupModal({ onClose, onGroupAdded }) {
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = async () => {
    try {
      const response = await axiosInstance.post("/api/groups", { group_name: groupName });
      const newGroupId = response.data.id || `temp-${new Date().getTime()}`;
      console.log("API 응답 ID:", response.data.id);

      if (!response.data.id) {
        console.warn("서버에서 유효한 ID를 반환하지 않았습니다. 임시 ID가 생성되었습니다.");
      }

      onGroupAdded({
        id: newGroupId,
        name: groupName,
        contacts: [],
      });
      alert("그룹이 성공적으로 추가되었습니다!");
      onClose();
    } catch (error) {
      console.error("그룹 생성 실패:", error.response || error.message);
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
