import React, { useState, useEffect } from 'react';
import './MyPage.css';
import ProfileImage from './profile.png';
import MemberInfo from './MemberInfo';
import ReserveMessege from './ReserveMessage';
import Outbox from './Outbox';
import MyPageAddress from './MyPageAddress';
import StorageBox from './StorageBox';
import { useNavigate , useLocation } from 'react-router-dom'; // useNavigate 임포트
import backImage from './back.png';

function MyPage() {
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState('MemberInfo'); // 기본 활성 컴포넌트
  const [activeMenu, setActiveMenu] = useState('MemberInfo'); // 기본 활성 메뉴
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // location.state가 있을 경우, 해당 컴포넌트 활성화
    if (location.state?.target) {
      setActiveComponent(location.state.target);
      setActiveMenu(location.state.target);
    }
  }, [location.state]);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'MemberInfo':
        return <MemberInfo />;
      case 'ReserveMessege':
        return <ReserveMessege />;
      case 'Outbox':
        return <Outbox />;
      case 'StorageBox':
        return <StorageBox />;
      case 'MyPageAddress':
        return <MyPageAddress />;
      default:
        return <MemberInfo />;
    }
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setActiveComponent(menuName);
  };

  const handleBackButtonClick = () => {
    navigate('/mainpage'); // back-button 클릭 시 /mainpage로 이동
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Pic&Talk</div>
        <h2 className="navbar-title">마이페이지</h2>
        <button className="back-button" onClick={handleBackButtonClick}>
        <img src={backImage} alt="Back" className="back-icon" />
        </button>
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
              className={activeMenu === 'StorageBox' ? 'active' : ''}
              onClick={() => handleMenuClick('StorageBox')}
            >
              문자 보관함
            </li>
            <li
              className={activeMenu === 'Outbox' ? 'active' : ''}
              onClick={() => handleMenuClick('Outbox')}
            >
              임시 보관함
            </li>
            <li
              className={activeMenu === 'MyPageAddress' ? 'active' : ''}
              onClick={() => handleMenuClick('MyPageAddress')}
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
