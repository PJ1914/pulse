// // src/components/Messages.js
// import React, { useEffect, useState } from 'react';
// import { getMessages } from '../../services/api';

// const Messages = () => {
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const data = await getMessages();
//                 setMessages(data);
//             } catch (error) {
//                 console.error("Error fetching messages", error);
//             }
//         };

//         fetchMessages();
//     }, []);

//     return (
//         <div>
//             <h1>Messages</h1>
//             <ul>
//                 {messages.map((message) => (
//                     <li key={message.id}>
//                         <h2>{message.title}</h2>
//                         <p>{message.content}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Messages;

import React, { useState, useRef, useEffect } from 'react';
import './Messages.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { IoSendSharp } from 'react-icons/io5';
import { BsSun, BsMoon } from 'react-icons/bs'; // Icons for light and dark mode
import 'react-toastify/dist/ReactToastify.css';

import loadingGif from './load-32_256-ezgif.com-resize.gif'; // Adjust import statement based on the actual location
import { auth, db } from '../../config/config';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, serverTimestamp, collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

const messagesCollection = collection(db, 'messages');

export default function Messages() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Initialize with saved theme
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Apply the saved theme on component mount
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const messagesQuery = query(messagesCollection, orderBy('createdAt', 'asc'), where('userId', '==', user.uid));
        const unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
          const fetchedMessages = [];
          querySnapshot.forEach((doc) => {
            fetchedMessages.push({ id: doc.id, ...doc.data() });
          });
          setMessages(fetchedMessages);
        });
        return unsubscribeMessages;
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, [theme]);

  const action = async () => {
    if (!prompt) {
      toast.error('Enter a prompt');
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: prompt, role: 'user' },
    ]);
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/gemini`, {
        message: prompt
      });
      if (response.status === 200) {
        const data = response.data;
        const msg = data.response;
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: `${msg}`, role: 'bot' },
        ]);

        await addDoc(messagesCollection, {
          content: prompt,
          role: 'user',
          userId: user.uid,
          createdAt: serverTimestamp(),
        });

        await addDoc(messagesCollection, {
          content: msg,
          role: 'bot',
          userId: user.uid,
          createdAt: serverTimestamp(),
        });

        setLoading(false);
        setPrompt('');
        inputRef.current.value = '';
      } else {
        toast.error('INTERNAL SERVER ERROR (500)');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Error occurred while processing your request');
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
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
        <header>
          <h1>Pulse AI Chatbot</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <BsMoon size={24} /> : <BsSun size={24} />}
          </button>
        </header>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === 'user' ? 'message-user' : 'message-bot'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="search">
          <div className="textarea-container">
            <textarea
              ref={inputRef}
              className="textarea"
              id="search"
              placeholder="Hi, I'm Pulse. Ask me anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.shiftKey) {
                  setPrompt((prevPrompt) => prevPrompt + '\n');
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  action();
                }
              }}
            />
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
