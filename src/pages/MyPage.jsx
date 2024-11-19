import React, { useState } from 'react';
import './MyPage.css';
import ProfileImage from './profile.png';
import MemberInfo from '../components/MemberInfo';
import ReserveMessege from '../components/ReserveMessege';
import Outbox from '../components/Outbox'; // 임시 보관함 컴포넌트
import MyPageAddress from '../components/MyPageAddress'; // 내 주소록 컴포넌트
import TextStorageBox from '../components/TextStorageBox'; // 문자 보관함 컴포넌트

function MyPage() {
  const [activeComponent, setActiveComponent] = useState('MemberInfo'); // 기본 활성 컴포넌트
  const [activeMenu, setActiveMenu] = useState('MemberInfo'); // 기본 활성 메뉴

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'MemberInfo':
        return <MemberInfo />;
      case 'ReserveMessege':
        return <ReserveMessege />;
      case 'TempStorage':
        return <Outbox />;
      case 'MessageStorage':
        return <TextStorageBox />;
      case 'AddressBook':
        return <MyPageAddress />;
      default:
        return <MemberInfo />;
    }
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setActiveComponent(menuName);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Pic&Talk</div>
        <h2 className="navbar-title">마이페이지</h2>
        <button className="back-button"></button>
      </nav>
      <div className="mypage-container">
        <div className="sidebar">
          <img src={ProfileImage} alt="Profile" className="profile-image" />
          <p className="username">PicFlow님</p>
          <ul className="menu">
            <li
              className={activeMenu === 'MemberInfo' ? 'active' : ''}
              onClick={() => handleMenuClick('MemberInfo')}
            >
              회원 정보
            </li>
            <li
              className={activeMenu === 'ReserveMessege' ? 'active' : ''}
              onClick={() => handleMenuClick('ReserveMessege')}
            >
              예약 문자함
            </li>
            <li
              className={activeMenu === 'MessageStorage' ? 'active' : ''}
              onClick={() => handleMenuClick('MessageStorage')}
            >
              문자 보관함
            </li>
            <li
              className={activeMenu === 'TempStorage' ? 'active' : ''}
              onClick={() => handleMenuClick('TempStorage')}
            >
              임시 보관함
            </li>
            <li
              className={activeMenu === 'AddressBook' ? 'active' : ''}
              onClick={() => handleMenuClick('AddressBook')}
            >
              내 주소록
            </li>
          </ul>
        </div>
        <div className="content">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}

export default MyPage;
