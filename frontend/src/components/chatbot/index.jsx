import React, { useState } from 'react';
import axios from 'axios';

const languages = [
  "Hindi", "Gom", "Kannade", "Dogri", "Bodo", "Urdu", "Tamil", "Kashmiri",
  "Assamese", "Bengali", "Marathi", "Sindhi", "Maihtili", "Punjabi", 
  "Malayalam", "Manipuri", "Telugu", "Sanskrit", "Nepali", "Santali", 
  "Gujarati", "Oriya", "English"
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, isUser: true };
    setMessages([...messages, newMessage]);

    const formData = new FormData();
    formData.append('source_lang', language);
    formData.append('text', input);

    try {
      const response = await axios.post('http://localhost:8000/chatbot', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const botMessage = { text: response.data.response, isUser: false };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">Chatbot</h1>
        <div className="mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="h-64 overflow-y-auto mb-4 p-2 border border-gray-300 rounded">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
