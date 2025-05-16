import { marked } from "marked";
import React, { useState } from "react";
import { askGemini } from "../../api/apiConfig/gemini";
import theme from "../../styles/theme";
import * as S from "./styled";

const GeminiChat: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);

  const handleSend = async () => {
    if (!question.trim()) return;

    setLoading(true);
    const currentQuestion = question;
    setQuestion("");

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: currentQuestion },
    ]);

    try {
      const res = await askGemini(currentQuestion);
      setChatHistory((prev) => [...prev, { role: "assistant", text: res }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Ocorreu um erro ao processar sua solicitação.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && <S.Button onClick={() => setIsOpen(true)}>💬</S.Button>}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            maxWidth: "500px",
            height: "70vh",
            borderRadius: "16px",
            fontFamily: theme.fonts.primary,
            backgroundColor: theme.colors.background.default,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${theme.colors.border}`,
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              padding: "20px",
              borderBottom: `1px solid ${theme.colors.border}`,
              backgroundColor: theme.colors.primary,
              color: theme.colors.text.inverted,
              borderRadius: "16px 16px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
              💬 Prefeitura IA
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: theme.colors.text.inverted,
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </div>

          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {chatHistory.length > 0 ? (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.role === "user"
                        ? theme.colors.primaryLight
                        : theme.colors.background.alt,
                    color:
                      msg.role === "user"
                        ? theme.colors.text.inverted
                        : theme.colors.text.primary,
                    padding: "12px 16px",
                    borderRadius:
                      msg.role === "user"
                        ? "12px 12px 0 12px"
                        : "12px 12px 12px 0",
                    maxWidth: "80%",
                    border:
                      msg.role === "assistant"
                        ? `1px solid ${theme.colors.border}`
                        : "none",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <div
                    style={{ margin: 0 }}
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(msg.text),
                    }}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.colors.text.secondary,
                }}
              >
                {loading
                  ? "Processando sua pergunta..."
                  : "Faça uma pergunta para começar"}
              </div>
            )}
          </div>

          <div
            style={{
              padding: "16px 20px",
              borderTop: `1px solid ${theme.colors.border}`,
              backgroundColor: theme.colors.background.alt,
              borderRadius: "0 0 16px 16px",
              display: "flex",
              gap: "12px",
            }}
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "16px",
                borderRadius: "24px",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.background.default,
                color: theme.colors.text.primary,
                outline: "none",
                fontFamily: theme.fonts.primary,
              }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !question.trim()}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: loading
                  ? theme.colors.disabled
                  : question.trim()
                  ? theme.colors.button.primary
                  : theme.colors.button.secondary,
                color:
                  loading || !question.trim()
                    ? theme.colors.text.secondary
                    : theme.colors.text.inverted,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
            >
              {loading ? "⏳" : "➤"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiChat;
