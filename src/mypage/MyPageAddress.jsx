import React, { useState } from 'react';
import axios from "axios";
import './MyPageAddress.css';
import AddGroupModal from './AddGroupModal';

function MyPageAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [groups, setGroups] = useState([
    { id: 1, name: "그룹1", contacts: ["010-1234-5678", "010-2345-6789"] },
    { id: 2, name: "그룹2", contacts: ["010-3456-7890", "010-4567-8901"] },
    { id: 3, name: "그룹 미지정", contacts: ["010-5678-9012", "010-6789-0123"] },
  ]);

  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await axios.delete(`/api/groups/${groupId}`);
      console.log("그룹 삭제 성공:", response.data);

      // 삭제 성공 후 UI에서 그룹 제거
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
      alert("그룹이 성공적으로 삭제되었습니다!");
    } catch (error) {
      console.error("그룹 삭제 실패:", error);
      alert("그룹 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleUpdateGroupName = async (groupId, newGroupName) => {
    try {
      const response = await axios.patch(`/api/groups/${groupId}`, { group_name: newGroupName });
      console.log("그룹 이름 수정 성공:", response.data);

      // 이름 수정 성공 후 UI 업데이트
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? { ...group, name: newGroupName } : group
        )
      );
      alert("그룹 이름이 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("그룹 이름 수정 실패:", error);
      alert("그룹 이름 수정에 실패했습니다. 다시 시도해주세요.");
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
        {groups.map((group) => (
          <div className="group" key={group.id}>
            <label>
              <input type="checkbox" /> {group.name}
            </label>
            <button
              className="edit-button"
              onClick={() => handleUpdateGroupName(group.id, prompt("새 그룹 이름을 입력하세요:"))}
            >
              이름 수정
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteGroup(group.id)}
            >
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
      {/* <div className="address-list">
        <div className="group">
          <label>
            <input type="checkbox" /> 그룹1
          </label>
          <button className="edit-button" onClick={() => handleUpdateGroupName(groupId, prompt("새 그룹 이름을 입력하세요:"))}>이름 수정</button>
          <div className="contacts">
            {Array.from({ length: 10 }, (_, i) => (
              <div className="contact" key={`group1-${i}`}>
                <label>
                  <input type="checkbox" /> 010-1234-56{i.toString().padStart(2, '0')}
                </label>
                <button className="delete-button" onClick={() => handleDeleteGroup(groupId)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
        <div className="group">
          <label>
            <input type="checkbox" /> 그룹2
          </label>
          <button className="edit-button" onClick={() => handleUpdateGroupName(groupId, prompt("새 그룹 이름을 입력하세요:"))}>이름 수정</button>
          <div className="contacts">
            {Array.from({ length: 8 }, (_, i) => (
              <div className="contact" key={`group2-${i}`}>
                <label>
                  <input type="checkbox" /> 010-5678-90{i.toString().padStart(2, '0')}
                </label>
                <button className="delete-button" onClick={() => handleDeleteGroup(groupId)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
        <div className="group">
          <label>
            <input type="checkbox" /> 그룹 미지정
          </label>
          <div className="contacts">
            {Array.from({ length: 15 }, (_, i) => (
              <div className="contact" key={`group3-${i}`}>
                <label>
                  <input type="checkbox" /> 010-1111-22{i.toString().padStart(2, '0')}
                </label>
                <button className="delete-button" onClick={() => handleDeleteGroup(groupId)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {isModalOpen && (
        <AddGroupModal
          onClose={handleCloseModal}
          onGroupAdded={(newGroup) =>
            setGroups((prevGroups) => [...prevGroups, newGroup])
          } // onGroupAdded 전달
        />
      )} {/* 모달 렌더링 */}
    </div>
  );
}

export default MyPageAddress;
