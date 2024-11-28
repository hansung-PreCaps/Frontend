// MainPage.jsx
import React, { useState } from 'react';
import { useEffect} from 'react';
import './MainPage.css';
import Group from './Group.png';
import Bx_chat from './bx_chat.png';
import PreviewModal from './PreviewModal';
import AIModal from './AIModal';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function MainPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sendNumber, setSendNumber] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverList, setReceiverList] = useState([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [sendDate, setSendDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState('00'); // 시간 상태
  const [selectedMinute, setSelectedMinute] = useState('00'); // 분 상태
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    console.log('현재 Access Token:', accessToken);
  }, []);

  useEffect(() => {
    if (location.state?.content) {
      const parts = location.state.content.split('\n\n');
      setSubject(parts[0] || ''); 
      setContent(parts.slice(1).join('\n\n') || '');
    }

    if (location.state?.to) {
      setReceiver(location.state.to);
      setReceiverList([location.state.to]);
    }
  }, [location.state]);

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

  
  const handleLogout = async () => {
    try {
      const response = await fetch('https://dev.enble.site/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({}), 
      });

      let data = null;
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          console.log('JSON 응답이 아닙니다. 빈 응답 처리.');
        }
      }
  
      console.log('Response Status:', response.status);
      console.log('Response Data:', data);
  
      if (response.ok) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      } else {
        console.error('로그아웃 실패:', data.message || response.statusText);
      }
    } catch (error) {
      console.error('로그아웃 요청 중 에러 발생:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      // 발신번호와 수신번호 처리
      const formattedFrom = sendNumber.replace(/-/g, '');
      const formattedTo = receiverList[0]?.replace(/-/g, '');
  
      if (!formattedFrom || !formattedTo) {
        alert('발신번호와 수신번호를 확인해주세요.');
        return;
      }
      const formatDateTime = (date, hour, minute) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
        const day = String(date.getDate()).padStart(2, '0');
        const formattedHour = String(hour).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');
        const seconds = "00"; // 초는 항상 00으로 설정
      
        return `${year}-${month}-${day}T${formattedHour}:${formattedMinute}:${seconds}`;
      };

      const status = isScheduled ? 'SCHEDULED' : 'SENT';
      let sendTime = null;
  
      if (isScheduled) {
        sendTime = formatDateTime(sendDate, selectedHour, selectedMinute);
      }



      // FormData 객체 생성
      const formData = new FormData();
  
      // 서버가 요구하는 데이터 구조를 `request`라는 키에 JSON 문자열로 추가
      const requestData = {
        duplicate_flag: 'N',
        target_count: 1,
        targets: [
          {
            to: formattedTo,
            change_word: {},
            name: '서정찬',
          },
        ],
        from: formattedFrom,
        subject: subject || '테스트',
        message_type: 'LMS',
        content: content || '메시지 내용이 없습니다.',
        status: status,
        ...(sendTime && { send_time: sendTime }),
      };

          // 예약 발송일 경우 send_time 추가
    if (isScheduled && sendTime) {
      requestData.send_time = sendTime;
    }
  
      // FormData에 'request' 키로 JSON 데이터 추가
      formData.append('request', JSON.stringify(requestData));

      const imageInput = document.querySelector('#imageInput');
      if (imageInput && imageInput.files.length > 0) {
        const imageFile = imageInput.files[0];
        formData.append('image', imageFile, `${imageFile.name};type=${imageFile.type}`);
        console.log('Image File:', imageFile);
      console.log('MIME Type:', imageFile.type);
      }
      // 디버깅용 데이터 확인
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      // API 요청 보내기
      const response = await axios.post('https://dev.enble.site/api/messages/sms', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response Data:', response.data);
      alert('메시지가 성공적으로 발송되었습니다!');
    } catch (error) {
      console.error('Error Response:', error.response?.data || error.message);
      alert(`메시지 발송 실패: ${error.response?.data?.detail || '알 수 없는 오류입니다.'}`);
    }
  };
  
  
  
  const handleTempSave = async () => {
    const confirmSave = window.confirm('메시지를 임시 저장하시겠습니까?');
    if (!confirmSave) return;
  
    try {
      // 발신번호와 수신번호 처리
      const formattedFrom = sendNumber.replace(/-/g, '');
      const formattedTo = receiverList[0]?.replace(/-/g, '');
  
      if (!formattedFrom || !formattedTo) {
        alert('발신번호와 수신번호를 확인해주세요.');
        return;
      }
  
      // 예약 발송 시간 처리
      const formatDateTime = (date, hour, minute) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedHour = String(hour).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');
        const seconds = '00';
  
        return `${year}-${month}-${day}T${formattedHour}:${formattedMinute}:${seconds}`;
      };
  
      let sendTime = null;
      if (isScheduled) {
        sendTime = formatDateTime(sendDate, selectedHour, selectedMinute);
      }
  
      // API 요청 데이터
      const requestData = {
        duplicate_flag: 'N',
        content: `${subject}\n\n${content}`,
        from: formattedFrom,
        to: formattedTo,
        send_time: sendTime || null,
        target_count: receiverList.length,
        targets: receiverList.map((receiver) => ({
          to: receiver,
          change_word: {}, // 필요한 데이터가 없으면 빈 객체로 전달
          name: '받는사람', // 특정 이름이 필요하면 여기에 설정
        })),
      };
  
      // API 요청 보내기
      const response = await axios.post(
        'https://dev.enble.site/api/messages/temp',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.isSuccess) {
        alert('메시지가 임시 저장되었습니다.');
        console.log('Response:', response.data);
      } else {
        alert(`임시 저장 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error('임시 저장 중 에러 발생:', error.response?.data || error.message);
      alert('임시 저장 중 문제가 발생했습니다.');
    }
  };
  

  
  
  return (
    <div>
    <header>
      <div className="left-section">
        <img src={Group} alt="Group" className="Group" />
        <h1 className="title" onClick={() => navigate('/mainpage')}>Pic&Talk</h1>
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
      {isModalOpen && <AIModal onClose={handleCloseModal} setContent={setContent}/>}
         <button className="graybutton2" onClick={() => navigate('/mypage', { state: { target: 'StorageBox' } })}>내 문자함</button>
      </div>
      <textarea
        className="input-content"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="tem-save" onClick={handleTempSave}>임시 저장 하기</button>
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
          <button className="address" onClick={() => navigate('/mypage', { state: { target: 'MyPageAddress' } })}>주소록</button>
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
        <button className="all-remove" onClick={() => setReceiverList([])}>전체 삭제</button>
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
        <label className="receiver-N">전체 {receiverList.length}명</label>
        <button className="address-save">주소록 저장</button>
        </div>
        </div>
      </div>
      </div>
      </div>

      <div>
        <label className="sending-setting">발송 설정</label>
        <div className="sending-options">
        <button className="immed-send"  onClick={() => setIsScheduled(false)}>{!isScheduled ? '✔ 즉시 발송' : '즉시 발송'}</button>
        <button className="reser-send"  onClick={() => setIsScheduled(true)}>{isScheduled ? '✔ 예약 발송' : '예약 발송'}</button>
        </div>

        {isScheduled && (
        <div>
          <input
            type="date"
            value={sendDate.toISOString().substr(0, 10)}
            onChange={(e) => setSendDate(new Date(e.target.value))}
            className="date"
          />
          <select className="hour"
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}>
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour}시
              </option>
            ))}
          </select>
          <select className="minute"
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(e.target.value)}>
            {Array.from({ length: 60 }, (_, minute) => (
              <option key={minute} value={minute}>
                {minute}분
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
      <div className="sending-container">
      <button className="sending" onClick={handleSendMessage}>발송하기</button>
      <button className="preview" onClick={openPreview}>미리보기</button>
      </div>
    </div>

    {/* 모달을 렌더링 */}
    {isPreviewOpen && <PreviewModal 
                subject={subject}
                content={content}
                onClose={closePreview} />}

  </div>
</main>

    </div>
  );
}

export default MainPage;