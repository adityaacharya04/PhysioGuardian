import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simple rule-based responses
    const response = getBotResponse(input.toLowerCase());
    setMessages([...newMessages, { text: response, sender: 'bot' }]);
  };

  const getBotResponse = (input) => {
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! How can I help you today?';
    }
    if (input.includes('pain')) {
      return 'I am sorry to hear that. For severe pain, please contact a medical professional immediately. For mild pain, you can try some gentle stretches.';
    }
    if (input.includes('exercise')) {
      return 'You can find a list of exercises in the "Exercise Video Tutorials" section.';
    }
    return "I'm sorry, I don't understand. Can you please rephrase?";
  };

  return (
    <div>
      <h2>Emergency Assistant</h2>
      <div style={{ height: '300px', border: '1px solid black', overflowY: 'scroll', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
