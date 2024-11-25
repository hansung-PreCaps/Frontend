// MainPage.jsx
import React, { useState } from 'react';
import { useEffect} from 'react';
import './MainPage.css';
import Group from './Group.png';
import Bx_chat from './bx_chat.png';
import PreviewModal from './PreviewModal';
import AIModal from './AIModal';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import axios from 'axios';


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

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    console.log('현재 Access Token:', accessToken);
  }, []);

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
        body: JSON.stringify({}), // 본문이 필요한 경우 추가
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
      // 발신번호에서 하이픈 제거
      const formattedFrom = sendNumber.replace(/-/g, '');
  
      // 첫 번째 수신번호에서 하이픈 제거
      const formattedTo = receiverList[0]?.replace(/-/g, '');
  
      if (!formattedFrom || !formattedTo) {
        alert('발신번호와 수신번호를 확인해주세요.');
        return;
      }
  
      // API 요청 데이터 생성
      const requestData = {
        account: 'your_account_name', // 계정 이름을 여기에 입력
        message_type: 'LMS',
        content: `${subject}\n\n${content}`, // 제목과 내용을 포함한 문자열
        from: formattedFrom,
        duplicate_flag: 'N',
        target_count: 1, // 임시로 1로 설정
        targets: [
          {
            to: formattedTo,
            change_word: {
              var1: 'value1', // 필요하면g 값을 설정
              var2: 'value2',
              var3: '',
              var4: '',
              var5: '',
              var6: '',
              var7: '',
            },
            name: 'receiver_name', // 수신자 이름 (필요시 추가)
          },
        ],
        ref_key: 'ref_key_example', // 참조 키
      };
  
      console.log('Request Data:', JSON.stringify(requestData, null, 2));
  
      // API 요청 보내기
      const response = await axios.post('https://dev.enble.site/api/messages/send', requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      // 성공 메시지 출력
      console.log('Response Data:', response.data);
      alert('메시지가 성공적으로 발송되었습니다!');
    } catch (error) {
      console.error('Error:', error);
      alert('메시지 발송에 실패했습니다. 다시 시도해주세요.');
    }
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
      {isModalOpen && <AIModal onClose={handleCloseModal} setContent={setContent}/>}
         <button className="graybutton2" onClick={() => navigate('/mypage', { state: { target: 'StorageBox' } })}>내 문자함</button>
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
        <button className={`immed-send ${!isScheduled ? 'activ' : ''}`} onClick={() => setIsScheduled(false)}>즉시 발송</button>
        <button className={`reser-send ${isScheduled ? 'activ' : ''}`} onClick={() => setIsScheduled(true)}>예약 발송</button>
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