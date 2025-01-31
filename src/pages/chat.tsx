import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Send, Mic, Image, Paperclip, 
  Bot, User, Calendar, MapPin, 
  Hotel, Plane, Clock, X, 
  Maximize2, Minimize2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TravelAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your YatraSaarthi AI travel assistant. How can I help you plan your perfect trip today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    { icon: Plane, text: "Find flights" },
    { icon: Hotel, text: "Book hotels" },
    { icon: Calendar, text: "Plan itinerary" },
    { icon: MapPin, text: "Explore destinations" }
  ];

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "I'll help you with that! Let me gather some information about your travel preferences...",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const MessageBubble = ({ message }: { message: { id: number; type: 'bot' | 'user'; content: string; timestamp: string } }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.type === 'user' ? 'bg-blue-500 ml-2' : 'bg-gray-700 mr-2'
        }`}>
          {message.type === 'user' ? 
            <User className="h-5 w-5 text-white" /> : 
            <Bot className="h-5 w-5 text-white" />
          }
        </div>
        <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg p-3 ${
            message.type === 'user' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700 text-gray-100'
          }`}>
            <p>{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 mt-1">{message.timestamp}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={false}
      animate={isExpanded ? {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 50
      } : {
        width: '380px',
        height: '600px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 50
      }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full h-full bg-gray-800 border-gray-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-lg mr-3">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-100">Travel Assistant</h3>
              <p className="text-xs text-gray-400">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-100"
            >
              {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Button 
                  variant="outline" 
                  className="bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600"
                  onClick={() => setInputValue(suggestion.text)}
                >
                  <suggestion.icon className="h-4 w-4 mr-2" />
                  {suggestion.text}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Messages */}
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex items-center space-x-2"
              >
                <div className="bg-gray-700 rounded-full p-2">
                  <Bot className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-gray-100"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-gray-100"
              >
                <Image className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-gray-100"
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
            />
            <Button 
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TravelAssistant;