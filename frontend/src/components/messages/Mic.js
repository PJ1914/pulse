import React, { useState, useRef } from 'react';
import { IoMicOutline } from 'react-icons/io5';
import axios from 'axios';
import './Mic.css';

export default function Mic({ onVoiceResult }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleMicClick = () => {
    if (recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorderRef.current = new MediaRecorder(stream);

          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.wav');

            try {
              const response = await axios.post(`${process.env.REACT_APP_SPEECH_TO_TEXT_URL}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              onVoiceResult(response.data.text);
            } catch (error) {
              console.error('Error converting speech to text:', error);
            }

            audioChunksRef.current = [];
          };

          mediaRecorderRef.current.start();
          setRecording(true);
        })
        .catch(error => console.error('Error accessing microphone:', error));
    }
  };

  return (
    <button onClick={handleMicClick} className={`mic-icon ${recording ? 'recording' : ''}`}>
      <IoMicOutline size={24} color={recording ? 'red' : 'inherit'} />
    </button>
  );
}
