import React, { useState } from 'react';
import axios from 'axios';
import './AIModal.css';

const AIModal = ({ onClose, setContent }) => {
  const [situation, setSituation] = useState('');
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setKeyword('');
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const requestData = {
        situation: situation.trim(),
        keyword: keywords,
      };

    console.log('Request Data:', JSON.stringify(requestData, null, 2));

    const response = await axios.post('https://dev.enble.site/api/ai_messages', requestData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
      console.log('Response Data:', response.data);

      // 결과 저장
      setResult(response.data.result.message);
    } catch (error) {
      console.error(error);

      console.error('Error Response:', error.response);
      console.error('Error Message:', error.message);
      const errorMessage = error.response?.data?.error || '오류가 발생했습니다. 다시 시도해주세요.';
      setResult(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSituation('');
    setKeywords([]);
    setResult('');
  };

  const handleUseResult = () => {
    if (result) {
      setContent(result); 
      onClose(); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>AI 자동생성</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
          <div className="input-section">
            <label>발송 목적 및 내용</label>
            <textarea
              placeholder="내용을 입력하세요"
              className="input-content"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              disabled={loading}
            />
            <label>중요 키워드 (선택)</label>
            <div className="keyword-section">
              <input
                type="text"
                placeholder="키워드를 입력하세요"
                className="keyword-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                disabled={loading}
              />
              <button onClick={handleAddKeyword} className="addition-button" disabled={loading}>
                추가
              </button>
            </div>
            <div className="keyword-list">
              {keywords.map((kw) => (
                <span key={kw} className="keyword-item">
                  {kw}
                  <button onClick={() => setKeywords(keywords.filter(k => k !== kw))} disabled={loading}>
                    X
                  </button>
                </span>
              ))}
            </div>
            <button onClick={handleGenerate} className="generate-button" disabled={loading}>
              {loading ? '생성 중...' : '생성하기'}
            </button>
          </div>
          <div className="result-section">
            <label>생성 결과</label>
            <div className="result">
  {result}
</div>
            <div className="button-section">
              <button className="use-button" onClick={handleUseResult} disabled={!result}>
                사용하기
              </button>
              <button onClick={handleClear} className="del-button" disabled={!result}>
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;