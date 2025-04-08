import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ConversationStarters from '@/components/ConversationStarters';
import { getRandomTopics, generateResponse } from '@/services/conversationService';
import { useAuth } from '@/contexts/AuthContext';

// Define the Message interface
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access the chat");
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: `Hello${user ? ` ${user.name}` : ''}! I'm TalkEasy, your conversation assistant. Need help finding something to talk about? You can select from the suggested topics or tell me what you're interested in!`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  const [topics, setTopics] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Load initial topics
  useEffect(() => {
    refreshTopics();
  }, []);

  const refreshTopics = () => {
    const newTopics = getRandomTopics(8);
    setTopics(newTopics);
    toast.success("New conversation topics loaded!");
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = generateResponse(content);
      const botMessage: Message = {
        id: uuidv4(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for realism
  };

  const handleSelectTopic = (topic: string) => {
    setInputValue(topic);
    // Automatically send the selected topic
    handleSendMessage(topic);
  };

  // If not authenticated, don't render the chat
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          <div className="md:col-span-2 flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden">
            <h2 className="p-4 border-b bg-gray-50 font-medium text-gray-700">Chat with TalkEasy</h2>
            <div className="flex-1">
              <ChatWindow 
                messages={messages} 
                onSendMessage={handleSendMessage}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <ConversationStarters 
              topics={topics} 
              onSelectTopic={handleSelectTopic}
              onRefreshTopics={refreshTopics}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white p-4 text-center text-gray-500 text-sm shadow-inner">
        <p>TalkEasy - Never run out of things to say</p>
      </footer>
    </div>
  );
};

export default Index;
