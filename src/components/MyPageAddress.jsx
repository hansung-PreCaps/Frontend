import React, { useState } from 'react';
import './MyPageAddress.css';
import AddGroupModal from './AddGroupModal'; // AddGroupModal 컴포넌트 추가

function MyPageAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

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
        <div className="group">
          <label>
            <input type="checkbox" /> 그룹1
          </label>
          <div className="contacts">
            {Array.from({ length: 10 }, (_, i) => (
              <div className="contact" key={`group1-${i}`}>
                <label>
                  <input type="checkbox" /> 010-1234-56{i.toString().padStart(2, '0')}
                </label>
                <button className="delete-button">삭제</button>
              </div>
            ))}
          </div>
        </div>
        <div className="group">
          <label>
            <input type="checkbox" /> 그룹2
          </label>
          <div className="contacts">
            {Array.from({ length: 8 }, (_, i) => (
              <div className="contact" key={`group2-${i}`}>
                <label>
                  <input type="checkbox" /> 010-5678-90{i.toString().padStart(2, '0')}
                </label>
                <button className="delete-button">삭제</button>
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
                <button className="delete-button">삭제</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && <AddGroupModal onClose={handleCloseModal} />} {/* 모달 렌더링 */}
    </div>
  );
}

export default MyPageAddress;
