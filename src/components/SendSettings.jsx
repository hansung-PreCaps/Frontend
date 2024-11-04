
import React, { useState } from 'react';

function SendSettings() {
  const [sendNumber, setSendNumber] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverList, setReceiverList] = useState([]);
  const [sendDate, setSendDate] = useState(new Date());

  const addReceiver = () => {
    if (receiver) {
      setReceiverList([...receiverList, receiver]);
      setReceiver('');
    }
  };

  const removeReceiver = (index) => {
    setReceiverList(receiverList.filter((_, i) => i !== index));
  };

  return (
    <div>
        <h2 className="h2-send">발신 설정</h2>
    <div className="send-background">
      <input
        type="text"
        placeholder="발신번호"
        className="outgoing-number"
        value={sendNumber}
        onChange={(e) => setSendNumber(e.target.value)}
      />
      <button className="outgoing-button">발신번호 등록</button>

      <div>
        <label className="reception">수신번호 입력</label>
        <button className="address">주소록</button>
        <button className="recent">최근내역</button>
        <div className="numaddition-background">
        <input
          type="text"
          placeholder="직접 입력"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className= "input"
        />
        <button onClick={addReceiver} className="numaddition-button">번호 추가</button>
        </div>
        <div>
          {receiverList.map((num, index) => (
            <div key={index}>
              {num} <button onClick={() => removeReceiver(index)}>삭제</button>
              
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="receiver">받는 사람</label>
        <button className="all-remove">전체 삭제</button>
        <div className="receiver-background">
          <label className="receiver-N">전체 N명</label>
          <button className="address-save">주소록 저장</button>
        </div>


      </div>

      <div>
        <label className="sending-setting">발송 설정</label>
        <button className="immed-send">즉시 발송</button>
        <button className="reser-send">예약 발송</button>
        <input
          type="date"
          value={sendDate.toISOString().substr(0, 10)}
          onChange={(e) => setSendDate(new Date(e.target.value))
          }
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

      <button className="sending">발송하기</button>
      <button className="preview">미리보기</button>
      </div>
    </div>
  );
}

export default SendSettings;
