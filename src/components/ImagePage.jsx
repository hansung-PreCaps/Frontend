import React, { useState, useRef } from "react";
import styles from "./ImagePage.module.css"; // CSS 모듈로 변경
import Group from "./Group.png";
import Bx_chat from "./bx_chat.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ImagePage() {
  const canvasRef = useRef(null);
  const [situation, setSituation] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [textList, setTextList] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(30);
  const [draggingTextIndex, setDraggingTextIndex] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  // AI 이미지 생성
  const generateImage = async () => {
    if (!situation.trim() || !atmosphere.trim()) {
      alert("상황과 분위기를 모두 입력하세요!");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        alert("Access Token이 없습니다. 다시 로그인해주세요.");
        navigate("/");
        return;
      }

      const response = await axios.post(
        "https://dev.enble.site/api/images",
        { situation, atmosphere },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        setImageUrl(response.data.result.url);
      } else {
        alert(`이미지 생성 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error generating AI image:", error);
      alert("이미지 생성에 실패했습니다.");
    }
  };

  // 텍스트 추가
  const addText = () => {
    if (!currentText.trim()) {
      alert("텍스트를 입력하세요!");
      return;
    }
    setTextList((prevList) => [
      ...prevList,
      { text: currentText, color, fontSize, x: 50, y: 50 },
    ]);
    setCurrentText("");
  };

  // 텍스트 삭제
  const deleteText = (index) => {
    setTextList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // 드래그 앤 드롭 핸들러
  const handleMouseDown = (index, e) => {
    setDraggingTextIndex(index);
    const textItem = textList[index];
    const offsetX = e.clientX - textItem.x;
    const offsetY = e.clientY - textItem.y;
    setMouseOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (draggingTextIndex !== null) {
      const updatedTextList = [...textList];
      updatedTextList[draggingTextIndex] = {
        ...updatedTextList[draggingTextIndex],
        x: e.clientX - mouseOffset.x,
        y: e.clientY - mouseOffset.y,
      };
      setTextList(updatedTextList);
    }
  };

  const handleMouseUp = () => {
    setDraggingTextIndex(null);
  };

  // 이미지와 캔버스 병합 후 저장
  const saveImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!imageUrl) {
      alert("저장할 이미지가 없습니다!");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous"; // 크로스오리진 에러 방지
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // 배경 이미지 그리기
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 텍스트 그리기
      textList.forEach((text) => {
        ctx.font = `${text.fontSize}px Arial`;
        ctx.fillStyle = text.color;
        ctx.fillText(text.text, text.x, text.y);
      });

      // 병합된 이미지 저장
      canvas.toBlob(
        (blob) => {
          const link = document.createElement("a");
          link.download = "merged-image.png";
          link.href = URL.createObjectURL(blob);
          link.click();
        },
        "image/png"
      );
    };
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <img src={Group} alt="Group" className={styles.group} />
          <h1 className={styles.title} onClick={() => navigate('/mainpage')}>Pic&Talk</h1>
          <img src={Bx_chat} alt="Bx_chat" className={styles.bxChat} />
        </div>
        <div className={styles.centerSection}>
          <h1
            className={styles.h1Send}
            onClick={() => navigate("/mainpage")}
          >
            문자 전송
          </h1>
          <h1
            className={styles.h1Chatbot}
            onClick={() => navigate("/chatbotpage")}
          >
            챗봇
          </h1>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.options}>
          <textarea
            placeholder="상황 입력"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className={styles.textarea}
          ></textarea>
          <textarea
            placeholder="분위기 입력"
            value={atmosphere}
            onChange={(e) => setAtmosphere(e.target.value)}
            className={styles.textarea}
          ></textarea>
          <button onClick={generateImage} className={styles.button}>
            AI 이미지 생성
          </button>
          <input
            type="text"
            placeholder="텍스트 입력"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            className={styles.input}
          />
          <button onClick={addText} className={styles.button}>
            텍스트 추가
          </button>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorPicker}
          />
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className={styles.select}
          >
            {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56].map(
              (size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              )
            )}
          </select>
          <button onClick={saveImage} className={styles.button}>
            이미지 저장
          </button>
        </section>

        <div className={styles.canvasContainer}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="AI 생성 이미지"
              className={styles.imageDisplay}
            />
          ) : (
            <span className={styles.noImageText}>이미지가 없습니다</span>
          )}
          <canvas
            ref={canvasRef}
            className={styles.canvasLayer}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></canvas>
          {textList.map((text, index) => (
            <div
              key={index}
              className={styles.textItem}
              style={{
                top: text.y,
                left: text.x,
                fontSize: `${text.fontSize}px`,
                color: text.color,
              }}
              onMouseDown={(e) => handleMouseDown(index, e)}
              onMouseUp={handleMouseUp}
            >
              <span>{text.text}</span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteText(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ImagePage;
