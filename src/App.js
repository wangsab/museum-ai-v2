import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  //const [listening, setListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "zh-TW";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setQuestion(transcript);
    sendToAI(transcript);
  };

  const [listening, setListening] = useState(false); // 新增這行

const startListening = () => {
    setListening(true);
    recognition.start();
};


  const sendToAI = async (query) => {
    try {
      const res = await axios.post("https://your-api.com/ask", { question: query });
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer("發生錯誤，請稍後再試");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>博物館 AI 學習助理</h1>
      
      <QRCodeCanvas value="https://museum-ai.pages.dev" size={150} />

      <p>掃描 QR Code 進入 AI 助理</p>
      
      <button onClick={startListening} style={{ fontSize: "16px", padding: "10px", margin: "10px" }}>
        🎤 點擊說話
      </button>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="輸入你的問題"
        style={{ fontSize: "16px", padding: "10px", width: "80%" }}
      />
      
      <button onClick={() => sendToAI(question)} style={{ fontSize: "16px", padding: "10px", margin: "10px" }}>
        送出
      </button>

      <h3>AI 回應：</h3>
      <p style={{ fontSize: "18px", background: "#f4f4f4", padding: "10px" }}>{answer}</p>
    </div>
  );
}

export default App;
