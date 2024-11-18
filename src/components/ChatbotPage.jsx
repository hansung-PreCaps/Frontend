import React from 'react';
import './ChatbotPage.css';
import Group from './Group.png';
import Bx_chat from './bx_chat.png';
import sidebar from './sidebar.png';
import sendIcon from './send.png';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import { useState } from 'react'; // useState 가져오기 추가
function ChatbotPage() {
    const navigate = useNavigate(); // navigate 함수 생성
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <div>
        <header>
          <div className="left-section">
            <img src={Group} alt="Group" className="Group" />
            <h1 className="title">Pic&Talk</h1>
            <img src={Bx_chat} alt="Bx_chat" className="Bx_chat" />
         </div>
      
         <div className="center-section">
           <h1 className="h1-send" onClick={() => navigate('/mainpage')}>문자 전송</h1>
           <h1 className="h1-chatbot" onClick={() => navigate('/chatbotpage')}>챗봇</h1>
         </div>
    
         <div className="right-section">
            <h2 className="myname">PicFlow님</h2>
            <h2 className="mypage">
               <span className="mypage-text">마이페이지</span>
               <span className="divider">|</span>
               <span className="logout">로그아웃</span>
            </h2>
         </div>
        </header>
        <main className="main-container2">
                <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>

                </aside>

                <section className="chat-content">
                <button onClick={toggleSidebar} className="sidebar-toggle">
                        <img src={sidebar} alt="Toggle Sidebar" className="icon" />
                    </button>
                    <img src={Group} alt="Group" className="Group" />
                    <h1 className="welcome-title">Pic&Talk</h1>
                    <img src={Bx_chat} alt="Bx_chat" className="Bx_chat" />
                    <p className="welcome-message">환영합니다! Pic&Talk에 오신 것을 환영해요!</p>
                    <p className="description">
                        메시지 입력: 전화하고 싶은 말을 입력해 주세요. 고민 중이신가요? 저희가 도와드릴게요!<br></br>
                        이미지 추천 받기: 입력한 메시지에 어울리는 이미지를 자동으로 추천해드려요!<br></br>
                        완성 & 보내기: 마음에 드는 메시지와 이미지를 선택하고, 바로 전송하세요!
                    </p>
                    <div className="textarea-container">
                     <textarea placeholder="메시지 입력" className="message-textarea"></textarea>
                      <img src={sendIcon} alt="Send" className="send-icon" />
                    </div>
                </section>
            </main>
      </div>
    );
  }
  
  export default ChatbotPage;
  