import React, { useState, useEffect } from 'react';
import './MyPageAddress.css';
import AddGroupModal from './AddGroupModal';
import axiosInstance from "../utils/axiosInstance";


function MyPageAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [groups, setGroups] = useState([]);

  // 그룹 데이터를 서버에서 가져오는 함수
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get("/api/groups"); // GET 요청
        console.log("그룹 조회 성공:", response.data);
        setGroups(response.data.result); // 서버에서 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error("그룹 조회 실패:", error.response || error.message);
        alert("그룹 조회 중 오류가 발생했습니다.");
      }
    };

    fetchGroups();
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  const handleGroupAdded = (newGroup) => {
    console.log("새로 추가된 그룹:", newGroup); // 로그 출력
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  // 그룹 삭제 함수
  const handleDeleteGroup = async (groupId) => {
    try {
      console.log("삭제 요청 ID:", groupId);

      const response = await axiosInstance.delete(`/api/groups/${groupId}`); // DELETE 요청
      console.log("그룹 삭제 성공:", response.data);

      // 성공적으로 삭제된 그룹을 UI에서 제거
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
      alert("그룹이 성공적으로 삭제되었습니다!");
    } catch (error) {
      console.error("그룹 삭제 실패:", error.response || error.message);
      alert("그룹 삭제 중 오류가 발생했습니다.");
    }
  };

  // 그룹 이름 수정 함수
  const handleUpdateGroupName = async (groupId, newGroupName) => {
    try {
      console.log("수정 요청 ID:", groupId);

      const response = await axiosInstance.patch(`/api/groups/${groupId}`, { group_name: newGroupName }); // PATCH 요청
      console.log("그룹 이름 수정 성공:", response.data);

      // 성공적으로 수정된 그룹 이름을 UI에서 업데이트
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? { ...group, name: response.data.result.group_name } : group
        )
      );
      alert("그룹 이름이 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("그룹 이름 수정 실패:", error.response || error.message);
      alert("그룹 이름 수정 중 오류가 발생했습니다.");
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
