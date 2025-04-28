import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Bot, Loader } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const location = useLocation();
  const messagesEndRef = useRef(null);
  
  // Initialize messages with just the bot greeting
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  
  // Initialize inputMessage with the passed first message if available
  const [inputMessage, setInputMessage] = useState(() => {
    return location.state?.firstMessage || '';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Replace with your actual API key - ideally use environment variables
  const OPENAI_API_KEY = import.meta.env.VITE_CHATGPT_API;
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      // Add user message to chat
      const userMessage = { text: inputMessage, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);
      
      try {
        // Call OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              ...messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
              })),
              { role: 'user', content: inputMessage }
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
          }
        );
        
        // Add bot response to chat
        const botMessage = { 
          text: response.data.choices[0].message.content, 
          sender: 'bot' 
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        setMessages(prev => [...prev, { 
          text: 'Sorry, I encountered an error. Please try again later.', 
          sender: 'bot' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="py-4 px-6 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">AI Chat Assistant</h1>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start max-w-xs md:max-w-md lg:max-w-lg">
                {msg.sender === 'bot' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <Bot size={18} className="text-purple-600" />
                  </div>
                )}
                
                <div
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                
                {msg.sender === 'user' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ml-2">
                    <User size={18} className="text-blue-600" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Loader size={18} className="text-purple-600 animate-spin" />
                <span className="text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <textarea
              rows="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 resize-none"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className={`p-3 rounded-lg flex items-center justify-center ${
                isLoading || !inputMessage.trim() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for a new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;