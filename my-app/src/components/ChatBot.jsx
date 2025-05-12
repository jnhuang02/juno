import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to track page changes

const ChatBot = () => {
  const location = useLocation(); // Get the current route
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Justin's chatbot. How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controls chatbot visibility
  const chatRef = useRef(null); // Reference for chatbot window

  // Close chatbot when navigating between pages
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const responses = {
    "who are you": "I'm Justin's AI chatbot here to assist you!",
    "tell me about justin": "Justin is a master's student at UCLA studying Applied Statistics & Data Science.",
    "what are justin's skills": "Justin has expertise in front-end development, machine learning, and data analytics.",
    "what does justin do for fun": "He enjoys lifting weights, running, swimming, playing basketball, DJing, and learning the guitar!",
    "contact justin": "You can reach Justin via LinkedIn or email at justin@example.com.",
    "default": "I'm not sure about that, but I can tell you more about Justin!"
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = responses[input.toLowerCase()] || responses["default"];
      setMessages((prev) => [...prev, { text: responseText, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8">
      {/* Floating Button to Open Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center space-x-3 px-5 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
          <span>Chat with me!</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div ref={chatRef} className="flex flex-col h-[500px] w-[400px] bg-blue-900 text-white rounded-lg shadow-lg p-4">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">ChatBot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white bg-transparent rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition duration-300"
            >
              X
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 max-w-xs rounded-lg ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-700"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-gray-400 mt-2">Chatbot is typing...</div>}
          </div>

          {/* Input Field & Send Button */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}  // Listen for Enter key
              className="flex-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
              placeholder="Ask me something..."
            />
            <button 
              onClick={handleSendMessage} 
              className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
