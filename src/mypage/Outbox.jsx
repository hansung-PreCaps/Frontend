import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Outbox.css';
import { useNavigate } from 'react-router-dom';

function Outbox() {
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  // API 요청 함수
  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://dev.enble.site/api/messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        params: {
          status: 'TEMP', // 여기에 원하는 파라미터 추가
        },
      });
      if (response.data.isSuccess) {
        setMessages(response.data.result);
        console.log(response.data.result);
      } else {
        setError('데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      setError('데이터를 가져오는 중 에러가 발생했습니다.');
    } finally {
      setLoading(false); 
    }
  };

  const deleteMessage = async (messageId) => {
    const confirmDelete = window.confirm('해당 문자를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`https://dev.enble.site/api/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (response.data.isSuccess) {
        alert('문자가 성공적으로 삭제되었습니다.');
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.message_id !== messageId)
        );
      } else {
        alert('문자 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('문자 삭제 중 에러 발생:', error);
      alert('문자 삭제 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleEditMessage = (message) => {
    navigate('/mainpage', {
      state: {
        to: message.to,
        content: message.content,
      },
    });
  };

  if (loading) return <div>로딩 중...</div>; 
  if (error) return <div>{error}</div>;

  return (
    <div className="outbox-container">
      <h2 className="outbox-title">임시 보관함</h2>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="문자 검색" />
        <button className="search-filter">
          <span className="filter-icon">⚙️</span>
        </button>
      </div>
      <div className="message-list">
        {messages
          .filter((message) => message.status === "TEMP") // TEMP 상태의 메시지만 필터링
          .map((message) => (
            <div key={message.message_id} className="outbox-card">
              <div className="outbox-header">
                <span className="outbox-label">임시보관</span>
                <i
                  className="delete-icon"
                  onClick={() => deleteMessage(message.message_id)}
                >
                  🗑️
                </i>
              </div>
              <div className="outbox-recipients">{message.to}</div>
              <div className="outbox-body">{message.content}</div>
              <div className="outbox-footer">
                <span className="outbox-date">

                </span>
                <button className="outbox-edit"onClick={() => handleEditMessage(message)}>수정</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Outbox;
