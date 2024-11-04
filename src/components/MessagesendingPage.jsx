
import React from 'react';
import './MessagesendingPage.css';
import MessageInput from './MessageInput';
import SendSettings from './SendSettings';
import Group from './Group.png';
import Bx_chat from './bx_chat.png';
function MessagesendingPage() {
  return (
    <div>
      <header>
      <h1 className="title">
            Pic&Talk
        </h1>
        <img src={Group} alt="Group" 
        className="Group"/>
        <img src={Bx_chat} alt="Bx_chat" 
        className="Bx_chat"/>
        <nav>
        <h1 className="h1-send">문자 전송</h1>
        <h1 className="h1-chatbot">챗봇</h1>
        <hr className="line"/>
        <h2 className="myname">PicFlow님</h2>
        <h2 className="mypage">마이페이지 | 로그아웃</h2>
        </nav>
      </header>
      <main>
        <MessageInput />
        <SendSettings />
      </main>
    </div>
  );
}

export default MessagesendingPage;
