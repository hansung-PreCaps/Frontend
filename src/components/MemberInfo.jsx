import React, { useState } from 'react';
import './MemberInfo.css';

function MemberInfo() {
  const [email, setEmail] = useState('picflow@picflow.com');
  const [password, setPassword] = useState('********');
  const [nickname, setNickname] = useState('PicFlow');
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [isNicknameEdit, setIsNicknameEdit] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
  };

  const toggleNicknameEdit = () => {
    setIsNicknameEdit(!isNicknameEdit);
  };

  const savePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPassword(newPassword);
    setIsPasswordEdit(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const cancelPasswordEdit = () => {
    setIsPasswordEdit(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const saveNickname = () => {
    if (newNickname.trim() === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }
    setNickname(newNickname);
    setIsNicknameEdit(false);
    setNewNickname('');
  };

  const cancelNicknameEdit = () => {
    setIsNicknameEdit(false);
    setNewNickname('');
  };

  return (
    <div className="main-box">
      <h2 className="main-title">회원 정보</h2>
      <h3 className="section-title">회원 정보 설정</h3>
      <div className="info-box">
        <table>
          <tbody>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td className={isPasswordEdit ? 'vertical-layout' : ''}>
                {!isPasswordEdit ? (
                  <>
                    <input
                      type="password"
                      value={password}
                      disabled
                      className="password-display"
                    />
                    <button className="edit-button" onClick={togglePasswordEdit}>
                      변경
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="password"
                      placeholder="새 비밀번호 입력"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="비밀번호 확인"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <p className="password-hint">
                      변경하실 비밀번호를 입력해주세요.
                    </p>
                    <div className="button-group">
                      <button className="edit-button" onClick={savePassword}>
                        변경
                      </button>
                      <button className="cancel-button" onClick={cancelPasswordEdit}>
                        취소
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td className={isNicknameEdit ? 'vertical-layout' : ''}>
                {!isNicknameEdit ? (
                  <>
                    <input
                      type="text"
                      value={nickname}
                      disabled
                      className="nickname-display"
                    />
                    <button className="edit-button" onClick={toggleNicknameEdit}>
                      변경
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="변경 닉네임"
                      value={newNickname}
                      onChange={(e) => setNewNickname(e.target.value)}
                    />
                    <p className="nickname-hint">사용하실 닉네임을 입력해주세요.</p>
                    <div className="button-group">
                      <button className="edit-button" onClick={saveNickname}>
                        변경
                      </button>
                      <button className="cancel-button" onClick={cancelNicknameEdit}>
                        취소
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <th>프로필 이미지</th>
              <td>
                <button className="edit-button">변경</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberInfo;
