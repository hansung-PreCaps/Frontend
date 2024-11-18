import React from 'react';
import './Outbox.css';

function Outbox() {
  return (
    <div className="outbox-container">
      <h2 className="outbox-title">임시 보관함</h2>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="문자 검색" />
        <button className="search-filter">
          <span className="filter-icon">⚙️</span>
        </button>
      </div>
      <div className="outbox-card">
        <div className="outbox-header">
          <span className="outbox-label">임시보관</span>
          <span className="delete-icon">🗑️</span>
        </div>
        <div className="outbox-recipients">
          +82 0-XXX-XXXX, +82 0-XXX-XXXX, +82 0-XXX-XXXX ...
        </div>
        <div className="outbox-body">
          특별한 기회를 놓치지 마세요! 지금 바로 50% 할인 행사에 참여하세요!
          한정된 시간 동안 진행되는 이번 행사에서는 인기 상품을 절반 가격에 만나볼 수 있습니다.
          - 모든 카테고리의 제품이 포함됩니다. - 재고 소진 시까지 진행됩니다. - 온라인 및
          오프라인 매장에서 모두 적용됩니다. 지금 바로 쇼핑하러 가세요! 기회를 놓치지 마세요!
        </div>
        <div className="outbox-footer">
          <span className="outbox-date">24.10.05</span>
          <button className="outbox-edit">수정</button>
        </div>
      </div>
    </div>
  );
}

export default Outbox;
