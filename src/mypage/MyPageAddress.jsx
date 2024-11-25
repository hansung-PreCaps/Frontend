import React, { useState } from 'react';
import './MyPageAddress.css';
import AddGroupModal from './AddGroupModal';
import axiosInstance from "../utils/axiosInstance";


function MyPageAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [groups, setGroups] = useState([
    { id: 1, name: "그룹1", contacts: ["010-1234-5678", "010-2345-6789"] },
    { id: 2, name: "그룹2", contacts: ["010-3456-7890", "010-4567-8901"] },
    { id: 3, name: "그룹 미지정", contacts: ["010-5678-9012", "010-6789-0123"] },
  ]);

  const handleGroupAdded = (newGroup) => {
    console.log("새로 추가된 그룹:", newGroup); // 로그 출력
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      // 요청 ID 로그 출력
      console.log("삭제 요청 ID:", groupId);

      const response = await axiosInstance.delete(`/api/groups/${groupId}`);
      console.log("그룹 삭제 성공:", response.data);

      // 삭제 성공 후 UI에서 그룹 제거
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
      alert("그룹이 성공적으로 삭제되었습니다!");
    } catch (error) {
      console.error("그룹 삭제 실패:", error.response || error.message);
      if (error.response) {
        alert(`삭제 실패: ${error.response.data.message || "알 수 없는 오류입니다."}`);
      } else {
        alert("네트워크 오류로 삭제에 실패했습니다.");
      }
    }
  };

  const handleUpdateGroupName = async (groupId, newGroupName) => {
    try {
      // 요청 ID 로그 출력
      console.log("수정 요청 ID:", groupId);

      const response = await axiosInstance.patch(`/api/groups/${groupId}`, { group_name: newGroupName });
      console.log("그룹 이름 수정 성공:", response.data);

      // 이름 수정 성공 후 UI 업데이트
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? { ...group, name: newGroupName } : group
        )
      );
      alert("그룹 이름이 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("그룹 이름 수정 실패:", error.response || error.message);
      if (error.response) {
        alert(`수정 실패: ${error.response.data.message || "알 수 없는 오류입니다."}`);
      } else {
        alert("네트워크 오류로 수정에 실패했습니다.");
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="address-container">
      <h2 className="address-title">내 주소록</h2>
      <div className="address-actions">
        <button className="action-button">파일 업로드</button>
        <input className="search-input" placeholder="직접 입력" />
        <button className="add-button">추가</button>
      </div>
      <div className="address-tools">
        <button className="tool-button" onClick={handleOpenModal}>
          그룹 추가
        </button>
        <button className="tool-button">그룹 이동</button>
        <button className="tool-button">선택 삭제</button>
        <button className="tool-button">전체 삭제</button>
      </div>
      <div className="address-list">
        {groups.map((group, index) => (
          <div className="group" key={group.id ? `group-${group.id}` : `temp-${index}`}>
            <label>
              <input type="checkbox" /> {group.name}
            </label>
            <button
              className="edit-button"
              onClick={() => {
                const newGroupName = prompt("새 그룹 이름을 입력하세요:");
                if (newGroupName) {
                  handleUpdateGroupName(group.id, newGroupName);
                }
              }}>
              이름 수정
            </button>
            <button
              className="delete-button"
              onClick={() => {
                if (window.confirm("정말로 이 그룹을 삭제하시겠습니까?")) {
                  handleDeleteGroup(group.id);
                }
              }}>
              삭제
            </button>
            <div className="contacts">
              {group.contacts.map((contact, i) => (
                <div className="contact" key={`${group.id}-${i}`}>
                  <label>
                    <input type="checkbox" /> {contact}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddGroupModal
          onClose={handleCloseModal}
          onGroupAdded={handleGroupAdded} // 그룹 추가 시 호출
        />
      )}
    </div>
  );
}

export default MyPageAddress;
