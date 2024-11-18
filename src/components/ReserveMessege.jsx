import React from 'react';
import './ReserveMessege.css';

function ReserveMessege() {
  return (
    <div className="reserve-message-container">
      <h2 className="reserve-message-title">예약 문자함</h2>

      <div className="message-container">
        <div className="message-header">
          <p className="message-date">2024년 10월 10일 xxx 발송예정</p>
          <button className="cancel-button">발송 취소</button>
        </div>
        <div className="message-card">
          <p className="message-recipients">
            +82 0-XXX-XXXX, +82 0-XXX-XXXX, +82 0-XXX-XXXX ...
          </p>
          <p className="message-body">
            특별한 기회를 놓치지 마세요! 지금 바로 50% 할인 행사에 참여하세요!
            안정적 사고 모든 현장에서 이번 행사에서는 인기 상품을 절반 가격에 만날
            수 있습니다. - 모든 카테고리의 제품이 포함됩니다. - 재고 소진 시까지 진행됩니다.
            - 온라인 및 오프라인 매장에서 모두 적용됩니다. 지금 바로 쇼핑하러 가세요!
            기회를 놓치지 마세요!
          </p>
        </div>
      </div>

      <div className="message-container">
        <div className="message-header">
          <p className="message-date">2024년 10월 9일 xxx 발송예정</p>
          <button className="cancel-button">발송 취소</button>
        </div>
        <div className="message-card">
          <p className="message-recipients">
            +82 0-XXX-XXXX, +82 0-XXX-XXXX, +82 0-XXX-XXXX ...
          </p>
          <p className="message-body">
            특별한 기회를 놓치지 마세요! 지금 바로 50% 할인 행사에 참여하세요!
            안정적 사고 모든 현장에서 이번 행사에서는 인기 상품을 절반 가격에 만날
            수 있습니다. - 모든 카테고리의 제품이 포함됩니다. - 재고 소진 시까지 진행됩니다.
            - 온라인 및 오프라인 매장에서 모두 적용됩니다. 지금 바로 쇼핑하러 가세요!
            기회를 놓치지 마세요!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReserveMessege;
