import React from 'react';
import './StorageBox.css';

function StorageBox() {
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
        {/* 첫 번째 메시지 */}
        <div className="message-container">
          <div className="message-header">
            <span className="message-date">그룹1, +82 0-XXX-XXXX, +82 0-XXX-XXXX ...</span>
            <i className="delete-icon">🗑</i>
          </div>
          <div className="message-card">
            <p>특별한 기회를 놓치지 마세요! 지금 바로 50% 할인 행사에 참여하세요! 한정된 시간 동안 진행되는 이번 행사에서는 인기 상품을 절반 가격에 만나볼 수 있습니다.</p>
            <p>- 모든 카테고리의 제품이 포함됩니다.</p>
            <p>- 재고 소진 시까지 진행됩니다.</p>
            <p>- 온라인 및 오프라인 매장에서 모두 적용됩니다.</p>
            <p>지금 바로 쇼핑하러 가세요! 기회를 놓치지 마세요!</p>
            <span className="message-date">24.10.05</span>
          </div>
        </div>
        {/* 두 번째 메시지 */}
        <div className="message-container">
          <div className="message-header">
            <span className="message-date">+82 0-XXX-XXXX, +82 0-XXX-XXXX ...</span>
            <i className="delete-icon">🗑</i>
          </div>
          <div className="message-card">
            <p>특별한 기회를 놓치지 마세요! 지금 바로 50% 할인 행사에 참여하세요! 한정된 시간 동안 진행되는 이번 행사에서는 인기 상품을 절반 가격에 만나볼 수 있습니다.</p>
            <p>- 모든 카테고리의 제품이 포함됩니다.</p>
            <p>- 재고 소진 시까지 진행됩니다.</p>
            <p>- 온라인 및 오프라인 매장에서 모두 적용됩니다.</p>
            <p>지금 바로 쇼핑하러 가세요! 기회를 놓치지 마세요!</p>
            <span className="message-date">24.09.05</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorageBox;