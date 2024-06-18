import React, { useState, useRef, useEffect } from "react";
import "./Messages.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import {
  IoSendSharp,
  IoImageOutline,
  IoSettingsOutline,
  IoMicOutline,
} from "react-icons/io5"; // Add icons for image, settings, microphone
import { BsSun, BsMoon } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";

import loadingGif from "./load-32_256-ezgif.com-resize.gif";
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

const messagesCollection = collection(db, "messages");

export default function Messages() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const messagesQuery = query(
          messagesCollection,
          orderBy("createdAt", "asc"),
          where("userId", "==", user.uid)
        );
        const unsubscribeMessages = onSnapshot(
          messagesQuery,
          (querySnapshot) => {
            const fetchedMessages = [];
            querySnapshot.forEach((doc) => {
              fetchedMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(fetchedMessages);
          }
        );
        return unsubscribeMessages;
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, [theme]);

  const action = async () => {
    if (!prompt) {
      toast.error("Enter a prompt");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: prompt, role: "user" },
    ]);
    setLoading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/gemini/`, {
        message: prompt,
      });
      if (response.status === 200) {
        const data = response.data;
        const msg = data.response;
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: `${msg}`, role: "bot" },
        ]);

        await addDoc(messagesCollection, {
          content: prompt,
          role: "user",
          userId: user.uid,
          createdAt: serverTimestamp(),
        });

        await addDoc(messagesCollection, {
          content: msg,
          role: "bot",
          userId: user.uid,
          createdAt: serverTimestamp(),
        });

        setLoading(false);
        setPrompt("");
        inputRef.current.value = "";
      } else {
        toast.error("INTERNAL SERVER ERROR (500)");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while processing your request");
      setLoading(false);
    }
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
        ></ToastContainer>
        <header className="header">
          <div className="header-title">
            <h1>Pulse AI Chatbot</h1>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "light" ? <BsMoon size={24} /> : <BsSun size={24} />}
            </button>
          </div>
          <button className="settings-toggle">
            <IoSettingsOutline size={24} />
          </button>
        </header>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "message-user" : "message-bot"
              }`}
            >
              {message.role === "bot" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
          ))}
        </div>
        <div className="search">
          <div className="textarea-wrapper">
            <textarea
              ref={inputRef}
              className="textarea"
              id="search"
              placeholder="Type your message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  setPrompt((prevPrompt) => prevPrompt + "\n");
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  action();
                }
              }}
            />
            <div className="icons">
              <IoImageOutline size={24} className="icon" />
              <IoMicOutline size={24} className="icon" />
            </div>
          </div>
          {loading ? (
            <div className="send-button">
              <img src={loadingGif} alt="loading..." />
            </div>
          ) : (
            <button className="send-button" onClick={action}>
              <IoSendSharp />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
