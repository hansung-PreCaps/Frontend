import React from 'react';
import './ImagePage.css';
import Group from './Group.png';
import Bx_chat from './bx_chat.png';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
function ImagePage() {
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
        <div className="header-controls">
                <h2>이미지 추가</h2>
                <button className="save-button">저장</button>
        </div>
        <main className="main-content">
        {/* 왼쪽 입력 영역 */}
        <section className="left-pane bordered-section">
          <div className="option-section">
                    <button className="option-button">AI 이미지 생성</button>
                    <button className="option-button">템플릿</button>
                    <button className="option-button">스티커</button>
                    <button className="option-button">텍스트</button>
          </div>
        </section>

        {/* 중앙 이미지 미리보기 영역 */}
        <section className="center-pane bordered-section">
          <div className="prompt-section">
            <textarea placeholder="프롬프트 입력" className="prompt-input"></textarea>
            <button className="generate-button">생성</button>
          </div>
        </section>

        {/* 오른쪽 상단 저장 버튼 */}
        <section className="right-pane bordered-section">
        <div className="image-preview">
            {/* 이미지 미리보기 영역 */}
            <img src="sample-image.jpg" alt="Generated Image" className="preview-image" />
          </div>
        </section>
      </main>
      </div>
    );
  }
  
  export default ImagePage;
  