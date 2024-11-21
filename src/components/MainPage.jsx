// MainPage.jsx
import React, { useState } from 'react';
import './MainPage.css';
import Group from './Group.png';
import Bx_chat from './bx_chat.png';
import PreviewModal from './PreviewModal';
import AIModal from './AIModal';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기

function MainPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sendNumber, setSendNumber] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverList, setReceiverList] = useState([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [sendDate, setSendDate] = useState(new Date());
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // navigate 함수 생성

  const addReceiver = () => {
    if (receiver) {
      setReceiverList([...receiverList, receiver]);
      setReceiver('');
    }
  };

  const removeReceiver = (index) => {
    setReceiverList(receiverList.filter((_, i) => i !== index));
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
       <h1 className="send-h1-send" onClick={() => navigate('/mainpage')}>문자 전송</h1>
       <h1 className="send-h1-chatbot" onClick={() => navigate('/chatbotpage')}>챗봇</h1>
     </div>

     <div className="right-section">
        <h2 className="myname">PicFlow님</h2>
        <h2 className="mypage">
           <span className="mypage-text" onClick={() => navigate('/mypage')}>마이페이지</span>
           <span className="divider">|</span>
           <span className="logout" onClick={handleLogout}>로그아웃</span>
        </h2>
     </div>
    </header>

      
    <main className="main-container">
  {/* Message Input Section */}
  <div className="message-section">
    <h2 className="h2-message">메세지 입력</h2>
    <div className="message-background">
      <input
        type="text"
        placeholder="제목"
        className="input-title"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <div className="button-group">
      <button className="graybutton" onClick={handleOpenModal}>AI 자동 생성</button>
      {isModalOpen && <AIModal onClose={handleCloseModal} />}
         <button className="graybutton2">내 문자함</button>
      </div>
      <textarea
        className="input-content"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="tem-save">임시 저장 하기</button>
      <div>
        <label className="image-addition">이미지 추가</label>
        <div className="image-background">
          <button className="image-plus" onClick={() => navigate('/imagepage')}>+</button>
        </div>
      </div>
    </div>
  </div>

  {/* Send Settings Section */}
  <div className="send-section">
    <h2 className="h2-send">발신 설정</h2>
    <div className="send-background">
      <div className="outgoing-container">
        <input
          type="text"
          placeholder="발신번호"
          className="outgoing-number"
           value={sendNumber}
          onChange={(e) => setSendNumber(e.target.value)}
        />
        <button className="outgoing-button">발신번호 등록</button>
      </div>

      <div>
        <label className="reception">수신번호 입력</label>
        <div className="button-container">
          <button className="address">주소록</button>
          <button className="recent">최근내역</button>
        </div>
        <div className="container">
        <div className="numaddition-background">
        <label className="numaddition-label">직접 입력</label>
          <textarea
            type="text"
            placeholder="휴대폰 번호 입력"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="input"
          />
          <button onClick={addReceiver} className="numaddition-button">
            번호 추가
          </button>
        </div>
      

      <div className="receiver-section">
        <div className="receiver-container">
        <label className="receiver">받는 사람</label>
        <button className="all-remove">전체 삭제</button>
        </div>
        <div className="receiver-background">
        <div className="receiver-item-background">
        {receiverList.map((num, index) => (
        <div key={index} className="receiver-item">
          {num} <button onClick={() => removeReceiver(index)} className="delete-button">삭제</button>
        </div>
        ))}
        </div>
        <div className="receiver-container">
        <label className="receiver-N">전체 N명</label>
        <button className="address-save">주소록 저장</button>
        </div>
        </div>
      </div>
      </div>
      </div>

      <div>
        <label className="sending-setting">발송 설정</label>
        <div className="sending-options">
        <button className="immed-send" onClick={() => setIsScheduled(false)}>즉시 발송</button>
        <button className="reser-send" onClick={() => setIsScheduled(true)}>예약 발송</button>
        </div>

        {isScheduled && (
        <div>
          <input
            type="date"
            value={sendDate.toISOString().substr(0, 10)}
            onChange={(e) => setSendDate(new Date(e.target.value))}
            className="date"
          />
          <select className="hour">
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour}시
              </option>
            ))}
          </select>
          <select className="minute">
            {[0, 15, 30, 45].map((minute) => (
              <option key={minute} value={minute}>
                {minute}분
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
      <div className="sending-container">
      <button className="sending">발송하기</button>
      <button className="preview" onClick={openPreview}>미리보기</button>
      </div>
    </div>

    {/* 모달을 렌더링 */}
    {isPreviewOpen && <PreviewModal onClose={closePreview} />}

  </div>
</main>

    </div>
  );
}

export default MainPage;