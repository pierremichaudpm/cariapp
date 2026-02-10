import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

const Chat = ({ chatOpen, toggleChat, currentLanguage, translations }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const chatWindowRef = useRef(null);

  const t = translations[currentLanguage] || translations.fr;

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: t.chatbot.responses.greeting,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [currentLanguage, t.chatbot.responses.greeting, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target)
      ) {
        const chatToggle = document.querySelector(".chat-toggle");
        if (chatToggle && !chatToggle.contains(event.target)) {
          toggleChat();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatOpen, toggleChat]);

  const getIntelligentResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Language detection
    const isEnglish =
      /\b(hello|hi|help|service|french|job|work|family|appointment|contact)\b/.test(
        msg,
      );
    const isArabic = /[\u0600-\u06FF]/.test(msg);
    const isSpanish = /\b(hola|ayuda|servicio|trabajo|familia|cita)\b/.test(
      msg,
    );
    const isRussian = /[А-Яа-яЁё]/.test(msg);

    let responseLang = currentLanguage;
    if (isEnglish && currentLanguage === "fr") responseLang = "en";
    if (isArabic) responseLang = "ar";
    if (isSpanish) responseLang = "es";
    if (isRussian) responseLang = "ru";

    const responses =
      translations[responseLang]?.chatbot?.responses ||
      translations.fr.chatbot.responses;

    // Check for keywords
    if (
      msg.includes("service") ||
      msg.includes("servic") ||
      msg.includes("خدم") ||
      msg.includes("servicio")
    ) {
      return responses.services;
    } else if (
      msg.includes("appointment") ||
      msg.includes("rdv") ||
      msg.includes("rendez") ||
      msg.includes("موعد") ||
      msg.includes("cita")
    ) {
      return responses.appointment;
    } else if (
      msg.includes("contact") ||
      msg.includes("contac") ||
      msg.includes("اتص") ||
      msg.includes("contacto")
    ) {
      return responses.contact;
    } else if (
      msg.includes("french") ||
      msg.includes("français") ||
      msg.includes("franc") ||
      msg.includes("فرنس") ||
      msg.includes("francés")
    ) {
      return responses.french;
    } else if (
      msg.includes("job") ||
      msg.includes("emploi") ||
      msg.includes("travail") ||
      msg.includes("عمل") ||
      msg.includes("empleo") ||
      msg.includes("работа")
    ) {
      return responses.employment;
    } else if (
      msg.includes("hello") ||
      msg.includes("bonjour") ||
      msg.includes("hi") ||
      msg.includes("مرحبا") ||
      msg.includes("hola") ||
      msg.includes("привет")
    ) {
      return responses.greeting;
    } else {
      return responses.default;
    }
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const addMessageWithTyping = async (text, sender) => {
    const newMessage = {
      id: messages.length + 1,
      text: "",
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Typing effect
    return new Promise((resolve) => {
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              text: updated[updated.length - 1].text + text.charAt(i),
            };
            return updated;
          });
          i++;
          setTimeout(typeWriter, 30);
        } else {
          resolve();
        }
      };
      typeWriter();
    });
  };

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isTyping) return;

    // Add user message
    addMessage(message, "user");
    setInputValue("");
    setIsTyping(true);

    // Show typing indicator
    const typingMessage = addMessage(t.chatbot.typing, "typing");

    try {
      // Remove typing indicator
      setMessages((prev) => prev.filter((msg) => msg.id !== typingMessage.id));

      // Get AI response
      const response = getIntelligentResponse(message);

      // Add AI response with typing effect
      await addMessageWithTyping(response, "bot");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Chat error:", error);
      }
      addMessage(
        t.chatbot?.error || "Sorry, an error occurred. Please try again.",
        "bot",
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isTyping) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div
        className={`chat-toggle ${chatOpen ? "active" : ""}`}
        onClick={toggleChat}
      >
        <div className="chat-icon">
          <Icon name="comments" size={24} />
        </div>
        <div className="chat-text" id="chatbotText">
          {t.chatbot.title}
        </div>
      </div>

      {/* Chat Window */}
      <div
        ref={chatWindowRef}
        className={`chat-window ${chatOpen ? "active" : ""}`}
        id="chatWindow"
        style={{ display: chatOpen ? "flex" : "none" }}
      >
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-avatar">
              <Icon name="robot" size={20} />
            </div>
            <div>
              <h3>{t.chatbot.title}</h3>
              <p className="chat-status">{t.chatbot?.status || "Online"}</p>
            </div>
          </div>
          <button className="chat-close" onClick={toggleChat}>
            ×
          </button>
        </div>

        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            id="chatInput"
            placeholder={t.chatbot.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button
            id="sendButton"
            onClick={handleSendMessage}
            disabled={isTyping || !inputValue.trim()}
            className="chat-send-btn"
          >
            {isTyping ? "..." : "➤"}
          </button>
        </div>

        <div className="chat-suggestions">
          <button
            className="suggestion-btn"
            onClick={() => {
              setInputValue(t.chatbot.responses.greeting.split("?")[0] + "?");
            }}
            disabled={isTyping}
          >
            {t.chatbot?.suggestions?.services || "Services"}
          </button>
          <button
            className="suggestion-btn"
            onClick={() => {
              setInputValue(
                t.chatbot?.suggestions?.appointmentInput ||
                  "Make an appointment",
              );
            }}
            disabled={isTyping}
          >
            {t.chatbot?.suggestions?.appointment || "Appointment"}
          </button>
          <button
            className="suggestion-btn"
            onClick={() => {
              setInputValue(
                t.chatbot?.suggestions?.frenchInput || "French courses",
              );
            }}
            disabled={isTyping}
          >
            {t.chatbot?.suggestions?.french || "French"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
