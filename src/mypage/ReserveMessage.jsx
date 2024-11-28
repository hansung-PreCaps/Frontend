import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReserveMessage.css';

function ReserveMessege() {
  const [messages, setMessages] = useState([]); // 메시지 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

    // API 요청
const fetchMessages = async () => {
  try {
    const response = await axios.get('https://dev.enble.site/api/messages/all', {
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

      // 발송 취소 요청 함수
  const cancelMessage = async (messageId) => {
    const confirmCancel = window.confirm('해당 예약 문자를 발송 취소하시겠습니까?'); // 확인창
    if (!confirmCancel) return;

    try {
      const response = await axios.patch(
        `https://dev.enble.site/api/messages/${messageId}`,
        { status: 'CANCELED' }, // 새로운 상태를 서버로 전달
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 인증 토큰
          },
        }
      );

      if (response.data.isSuccess) {
        alert('발송이 취소되었습니다.');
        // 메시지 상태에서 취소된 메시지를 업데이트
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.message_id === messageId ? { ...message, status: 'CANCELED' } : message
          )
        );
      } else {
        alert('발송 취소에 실패했습니다.');
      }
    } catch (error) {
      console.error('발송 취소 중 에러 발생:', error);
      alert('발송 취소 중 에러가 발생했습니다.');
    }
  };

    useEffect(() => {
      fetchMessages();
    }, []);


    if (loading) return <div>로딩 중...</div>; // 로딩 중 메시지
    if (error) return <div>{error}</div>; // 에러 메시지



  return (
    <div className="reserve-message-container">
      <h2 className="reserve-message-title">예약 문자함</h2>



      <div className="message-list">
      {messages
    .filter((message) => message.status === "SCHEDULED" &&
        new Date(message.send_time) > new Date()) // status가 SCHEDULED인 메시지만 필터링
    .map((message) => (
      <div key={message.message_id} className="message-container">
        <div className="message-header">
          <p className="message-date">
            {new Date(message.send_time).toLocaleDateString()}  발송예정
          </p>
          <button
            className="cancel-button"
            onClick={() => cancelMessage(message.message_id)}
          >
            발송 취소
          </button>
        </div>
        <div className="message-card">
          <p className="message-recipients">
          {message.to}
          </p>
          <p className="message-body">{message.content}</p>
        </div>
      </div>
    ))}
      </div>


    </div>
  );
}

export default ReserveMessege;
