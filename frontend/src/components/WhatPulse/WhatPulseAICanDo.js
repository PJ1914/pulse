import React from 'react';
import BackgroundImg from '../../assets/main page/background.png';
import Icon from './Icon'; 

const WhatPulseAiCanDo = () => {
  return (
    <div
      className="WhatPulseAiCanDo"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: 'cover', // Cover the entire div
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
        padding: '20px', // Add some padding if necessary
      }}
    >
      <div>
        <span
          style={{
            color: '#999999',
            fontSize: 36,
            fontFamily: 'MADE Tommy Soft',
            fontWeight: 700,
            lineHeight: '43.20px',
            wordWrap: 'break-word',
          }}
        >
          WHAT
        </span>
        <span
          style={{
            color: 'white',
            fontSize: 40,
            fontFamily: 'MADE Tommy Soft',
            fontWeight: 700,
            lineHeight: '48px',
            wordWrap: 'break-word',
          }}
        >
          {' '}PULSE AI
        </span>
        <span
          style={{
            color: 'white',
            fontSize: 36,
            fontFamily: 'MADE Tommy Soft',
            fontWeight: 700,
            lineHeight: '43.20px',
            wordWrap: 'break-word',
          }}
        >
          {' '}
        </span>
        <span
          style={{
            color: '#999999',
            fontSize: 36,
            fontFamily: 'MADE Tommy Soft',
            fontWeight: 700,
            lineHeight: '43.20px',
            wordWrap: 'break-word',
          }}
        >
          CAN DO
        </span>
      </div>
      <Icon /> 
      <div
        style={{
          width: '1378px',
          height: '178px',
          color: '#E9E9E9',
          fontSize: '24px',
          fontFamily: 'Arial',
          fontWeight: '700',
          lineHeight: '28.80px',
          wordWrap: 'break-word',
          marginTop: '20px',
          padding: '10px'
        }}
      >
        AI Chatbot: Engage with our AI chatbot for real-time answers, assistance,
        and information. It's like having a personal assistant at your
        fingertips. Custom Widgets: Tailor your Pulse AI dashboard with widgets
        that suit your needs, from weather updates to news feeds and more. Easy
        Integration: Seamlessly connect Pulse AI with your existing systems and
        platforms for a cohesive, unified experience.
      </div>
    </div>
  );
};

export default WhatPulseAiCanDo;
