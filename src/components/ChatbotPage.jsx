import React from 'react';
import './ChatbotPage.css';
import Group from './Group.png';
import Bx_chat from './bx_chat.png';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기

function ChatbotPage() {
    const navigate = useNavigate(); // navigate 함수 생성
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
        <main>
        </main>
      </div>
    );
  }
  
  export default ChatbotPage;
  