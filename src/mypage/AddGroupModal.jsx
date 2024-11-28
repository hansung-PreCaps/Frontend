import React, { useState } from 'react';
import PropTypes from "prop-types";
import './AddGroupModal.css';
import axiosInstance from "../utils/axiosInstance";

function AddGroupModal({ onClose, onGroupAdded }) {
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = async () => {
    try {
      const response = await axiosInstance.post("/api/groups", { group_name: groupName }); // POST 요청
      console.log("그룹 생성 성공:", response.data);

      onGroupAdded({
        id: response.data.result.group_id, // 서버에서 반환된 ID
        name: response.data.result.group_name,
        contacts: [],
      });
      alert("그룹이 성공적으로 추가되었습니다!");
      onClose();
    } catch (error) {
      console.error("그룹 생성 실패:", error.response || error.message);
      alert("그룹 생성 중 오류가 발생했습니다.");
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
