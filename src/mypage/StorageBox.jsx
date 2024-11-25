import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StorageBox.css';

function StorageBox() {
  const [messages, setMessages] = useState([]); // 메시지 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // API 요청
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://dev.enble.site/api/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 인증 토큰
          },
        });
        if (response.data.isSuccess) {
          console.log(response.data.result);
          setMessages(response.data.result); // 메시지 데이터를 상태에 저장
        } else {
          setError('데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        setError('데이터를 가져오는 중 에러가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    useEffect(() => {
      fetchMessages();
    }, []);
    
  const deleteMessage = async (messageId) => {
    const confirmDelete = window.confirm('해당 문자를 삭제하시겠습니까?'); // 확인 창
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`https://dev.enble.site/api/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 인증 토큰
        },
      });
      if (response.data.isSuccess) {
        alert('문자가 성공적으로 삭제되었습니다.');
        // 메시지 상태에서 삭제된 메시지를 제거
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.message_id !== messageId)
        );
        console.log(response.data.message);
      } else {
        alert('문자 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('문자 삭제 중 에러 발생:', error);
      alert('문자 삭제 중 에러가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>; // 로딩 중 메시지
  if (error) return <div>{error}</div>; // 에러 메시지

  return (
    <div className="text-storage-container">
      <h2 className="text-storage-title">문자 보관함</h2>
      <div className="search-container">
        <input type="text" placeholder="문자 검색" className="search-input" />
        <button className="search-filter">
          <i className="filter-icon">⚙</i>
        </button>
      </div>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.message_id} className="message-container">
            <div className="message-header">
              <span className="message-date">{message.to}</span>
              <i className="delete-icon"
              onClick={() => deleteMessage(message.message_id)}>🗑</i>
            </div>
            <div className="message-card">
              <p>{message.content}</p>
              <span className="message-date">
                {new Date(message.send_time).toLocaleDateString()} {/* 날짜 포맷 */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorageBox;
