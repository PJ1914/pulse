// src/components/Messages.js
import React, { useEffect, useState } from 'react';
import { getMessages } from '../services/api';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <h2>{message.title}</h2>
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;
