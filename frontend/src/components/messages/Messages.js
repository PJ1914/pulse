// Messages.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Messages.css";
import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { toast, ToastContainer } from "react-toastify";
import { IoSendSharp, IoSettingsOutline } from "react-icons/io5";
import { BsSun, BsMoon } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../../config/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Gallery from "./Gallery";
import Mic from "./Mic";
import ThreeBodyLoader from "./ThreeBodyLoader";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import History from "./Sidebar"

// Messages component
export default function Messages() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [contentCopyId, setContentCopyId] = useState([]);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null); 

  const handleCopy = useCallback((id, content) => {
    navigator.clipboard.writeText(content);
    setContentCopyId((prevCopyIds) =>
      prevCopyIds.includes(id)
        ? prevCopyIds.filter((item) => item !== id)
        : [...prevCopyIds, id]
    );
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("createdAt", "asc"),
          where("userId", "==", user.uid)
        );
        const unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
          setMessages(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
        return unsubscribeMessages;
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [theme]);

  // Effect for auto-scrolling
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (messageContent, role = "user") => {
      if (!user) return;
      await addDoc(collection(db, "messages"), {
        content: messageContent,
        role,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    },
    [user]
  );

  const action = useCallback(async () => {
    if (!prompt) {
      toast.error("Enter a prompt");
      return;
    }

    const userMessage = { content: prompt, role: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(process.env.REACT_APP_GEMINI_URL, {
        message: prompt,
      });

      if (response.status === 200) {
        const botMessage = { content: response.data.response, role: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        await sendMessage(prompt);
        await sendMessage(botMessage.content, "bot");

        setPrompt("");
        inputRef.current.value = "";
      } else {
        toast.error("INTERNAL SERVER ERROR (500)");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      toast.error("Error occurred while processing your request");
    } finally {
      setLoading(false);
    }
  }, [prompt, sendMessage]);


  //should try to keep track of history
  // const action = useCallback(async () => {
  //   if (!prompt) {
  //     toast.error("Enter a prompt");
  //     return;
  //   }
  
  //   const userMessage = { content: prompt, role: "user" };
  //   setMessages((prevMessages) => [...prevMessages, userMessage]);
  //   setLoading(true);
  
  //   try {
  //     // Fetch previous messages from the state
  //     const previousMessages = messages.map(message => message.content);
  
  //     const response = await axios.post(process.env.REACT_APP_GEMINI_URL, {
  //       prompt: prompt,
  //       history: previousMessages,  // Send the entire conversation history
  //     });
  
  //     if (response.status === 200) {
  //       const botMessage = { content: response.data.response, role: "bot" };
  //       setMessages((prevMessages) => [...prevMessages, botMessage]);
  
  //       await sendMessage(prompt);
  //       await sendMessage(botMessage.content, "bot");
  
  //       setPrompt("");
  //       inputRef.current.value = "";
  //     } else {
  //       toast.error("INTERNAL SERVER ERROR (500)");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error.message);
  //     toast.error("Error occurred while processing your request");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [prompt, sendMessage, messages]);
  

  const handleFileSelect = (file) => {
    const fileUrl = URL.createObjectURL(file);
    const fileType = file.type;
    const userMessage = { content: fileUrl, role: "user", type: fileType };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  };

  const handleVoiceResult = (text) => {
    setPrompt(text);
    action();
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className={`container`}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header />
        <div ref={messagesContainerRef} className="messages-container">
          <MessageList
            messages={messages}
            onCopy={handleCopy}
            copiedIds={contentCopyId}
          />
        </div>
        <MessageInput
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          inputRef={inputRef}
          onSend={action}
          onFileSelect={handleFileSelect}
          onVoiceResult={handleVoiceResult}
        />
      </div>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

// Header component
const Header = () => (
  <header className="header">
    <div className="header-title">
      <h1>Pulse AI Chatbot</h1>
    </div>
    <button className="settings-toggle">
      <IoSettingsOutline size={24} />
    </button>
  </header>
);

// MessageList component
const MessageList = ({ messages, onCopy, copiedIds }) => (
  <>
    {messages.map((message, index) => (
      <Message
        key={index}
        message={message}
        isCopied={copiedIds.includes(index)}
        onCopy={() => onCopy(index, message.content)}
      />
    ))}
  </>
);

// Message component
const Message = ({ message, isCopied, onCopy }) => (
  <div className={`message ${message.role === "user" ? "message-user" : "message-bot"}`}>
    {message.role !== "user" && (
      <p className="CopyContent" onClick={onCopy}>
        {isCopied ? <CheckBoxIcon /> : <ContentCopyIcon />}
      </p>
    )}
    {message.role === "bot" ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
    ) : message.type ? (
      message.type.startsWith("image/") ? (
        <img src={message.content} alt="User content" />
      ) : message.type.startsWith("video/") ? (
        <video controls src={message.content} />
      ) : (
        <span>{message.content}</span>
      )
    ) : (
      message.content
    )}
  </div>
);

const MessageInput = ({
  prompt,
  setPrompt,
  loading,
  inputRef,
  onSend,
  onFileSelect,
  onVoiceResult,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 300); // Adjust typing delay as needed

    return () => clearTimeout(typingTimeout);
  }, [prompt]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    } else if (e.key === "Enter" && e.shiftKey) {
      setPrompt((prevPrompt) => prevPrompt + "\n");
    }
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="search">
      <div className="textarea-wrapper">
        <textarea
          ref={inputRef}
          className="textarea"
          placeholder="Type your message..."
          value={prompt}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="icons">
          <Gallery onFileSelect={onFileSelect} />
          <Mic onVoiceResult={onVoiceResult} />
        </div>
      </div>
      {loading ? (
        <div className="send-button">
          <ThreeBodyLoader />
        </div>
      ) : (
        <button className="send-button" onClick={onSend} disabled={!isTyping}>
          <IoSendSharp />
        </button>
      )}
    </div>
  );
};

// ThemeToggle component
const ThemeToggle = ({ theme, toggleTheme }) => (
  <button className="ModeCard" onClick={toggleTheme}>
    {theme === "light" ? <BsMoon size={24} /> : <BsSun size={24} />}
  </button>
);
