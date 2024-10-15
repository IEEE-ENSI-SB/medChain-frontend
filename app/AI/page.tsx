"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

const ChatFront = () => {
  const [chatHistory, setChatHistory] = useState([
    { role: "user", content: "Hello, AI!" },
    { role: "ai", content: "Hello! How can I assist you today?" },
    { role: "user", content: "Can you explain quantum computing?" },
    { role: "ai", content: "Certainly! Quantum computing is a type of computation that harnesses the unique properties of quantum mechanics..." },
    { role: "user", content: "That's interesting. How does it differ from classical computing?" },
    { role: "ai", content: "The main difference between quantum and classical computing lies in how information is processed..." },
    { role: "user", content: "What are some practical applications of quantum computing?" },
    { role: "ai", content: "Quantum computing has several potential applications across various fields..." },
    { role: "user", content: "Are there any limitations to quantum computing?" },
    { role: "ai", content: "Yes, there are several challenges and limitations in quantum computing..." },
    { role: "user", content: "Thank you for the explanation!" },
    { role: "ai", content: "You're welcome! I'm glad I could help explain quantum computing. Do you have any more questions?" },
  ]);

  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setChatHistory([...chatHistory, { role: 'user', content: input }]);
      setInput('');
      // Here you would typically send the input to your AI and wait for a response
      // For now, we'll just simulate an AI response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { role: 'ai', content: "I've received your message and I'm processing it. How else can I assist you?" }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-green-50">
      <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-lg shadow-lg">
        <div className="bg-green-500 text-white p-2 md:p-4">
          <h2 className="text-lg md:text-xl font-bold">AI Assistant</h2>
        </div>
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[70%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-1 md:p-2 rounded-lg ${message.role === 'user' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {message.role === 'user' ? <User className="w-4 h-4 md:w-6 md:h-6" /> : <Bot className="w-4 h-4 md:w-6 md:h-6" />}
                </div>
                <div className={`p-2 md:p-3 rounded-lg ${message.role === 'user' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  <p className="text-sm md:text-base">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-2 md:p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-2 md:space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              <Send className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatFront;