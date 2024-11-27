import React from "react";
import "./ChatbotPage.css";
import Group from "./Group.png";
import Bx_chat from "./bx_chat.png";
import sidebar from "./sidebar.png";
import sendIcon from "./send.png";
import ChatbotContainer from "./chatbot/ChatbotContainer";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import { useState, useEffect } from "react"; // useState 가져오기 추가

import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

const cognitoCredentials = fromCognitoIdentityPool({
  clientConfig: { region: 'ap-northeast-2' },
  identityPoolId: 'ap-northeast-2:51ad30e2-54ab-41dd-b46c-58a6d93d7746'
});

function ChatbotPage() {
  const navigate = useNavigate(); // navigate 함수 생성
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null); // 세션 ID 생성

  useEffect(() => {
    setSessionId(`session-${Date.now()}`);
  }, []);

  const lexClient = new LexRuntimeV2Client({
    region: 'ap-northeast-2',
    credentials: cognitoCredentials
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // const handleSendMessage = () => {
  //   if (inputMessage.trim()) {
  //     const userMessage = {
  //       id: Date.now().toString(),
  //       text: inputMessage,
  //       isUser: true,
  //       timestamp: getCurrentTime(),
  //     };

  //     setMessages((prev) => [...prev, userMessage]);
  //     setInputMessage("");

  //     // Temporary bot response for testing
  //     const botResponse = {
  //       id: Date.now().toString(),
  //       text: "안녕하세요! 메시지를 받았습니다.",
  //       isUser: false,
  //       timestamp: getCurrentTime(),
  //     };
  //     setMessages((prev) => [...prev, botResponse]);
  //   }
  // };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        isUser: true,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");

      try {
        const access_token = localStorage.getItem('access_token');
        const authHeader = `Bearer ${access_token}`;
        
        console.log('access_token:', access_token); // 토큰 로깅

        const params = {
          botId: 'IDYXD04XNB',
          botAliasId: 'N9X07DPXOS',
          localeId: 'ko_KR',
          sessionId: sessionId,
          text: inputMessage,
          sessionState: {
            sessionAttributes: {
              'Authorization': authHeader
            }
          }
        };

        const command = new RecognizeTextCommand(params);
        const response = await lexClient.send(command);

        console.log('Lex response:', response); // 응답 로깅

        const botResponses = response.messages.map(message => ({
          id: Date.now().toString() + Math.random(),
          text: message.content,
          isUser: false,
          timestamp: getCurrentTime(),
        }));

        setMessages((prev) => [...prev, ...botResponses]);

      } catch (error) {
        console.error('Lex communication error:', error);
        const errorMessage = {
          id: Date.now().toString(),
          text: "죄송합니다. 챗봇 서비스에 문제가 있습니다.",
          isUser: false,
          timestamp: getCurrentTime(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
          <h1 className="chatbot-h1-send" onClick={() => navigate("/mainpage")}>
            문자 전송
          </h1>
          <h1
            className="chatbot-h1-chatbot"
            onClick={() => navigate("/chatbotpage")}
          >
            챗봇
          </h1>
        </div>

        <div className="right-section">
          <h2 className="myname">PicFlow님</h2>
          <h2 className="mypage">
            <span className="mypage-text" onClick={() => navigate("/mypage")}>
              마이페이지
            </span>
            <span className="divider">|</span>
            <span className="logout">로그아웃</span>
          </h2>
        </div>
      </header>

      <main className="main-container2">
        <aside
          className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}
        ></aside>

        <section className="chat-content">
          <button onClick={toggleSidebar} className="sidebar-toggle">
            <img src={sidebar} alt="Toggle Sidebar" className="icon" />
          </button>

          <img src={Group} alt="Group" className="Group" />
          {messages.length === 0 ? (
            <>
              <h1 className="welcome-title">Pic&Talk</h1>
              <img src={Bx_chat} alt="Bx_chat" className="Bx_chat" />
              <p className="welcome-message">
                환영합니다! Pic&Talk에 오신 것을 환영해요!
              </p>
              <p className="description">
                메시지 입력: 전화하고 싶은 말을 입력해 주세요. 고민 중이신가요?
                저희가 도와드릴게요!<br></br>
                이미지 추천 받기: 입력한 메시지에 어울리는 이미지를 자동으로
                추천해드려요!<br></br>
                완성 & 보내기: 마음에 드는 메시지와 이미지를 선택하고, 바로
                전송하세요!
              </p>
            </>
          ) : (
            <ChatbotContainer messages={messages} />
          )}

          <div className="textarea-container">
            <textarea
              placeholder="메시지 입력"
              className="message-textarea"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            ></textarea>
            <button
              className="send-icon"
              src={sendIcon}
              onClick={handleSendMessage}
              alt="Send"
              aria-label="챗봇과 대화하기"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default ChatbotPage;
