
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ConversationStarters from '@/components/ConversationStarters';
import { getRandomTopics, generateResponse } from '@/services/conversationService';

// Define the Message interface
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm TalkEasy, your conversation assistant. Need help finding something to talk about? You can select from the suggested topics or tell me what you're interested in!",
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
    // Optional: automatically send the selected topic
    handleSendMessage(topic);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
          <div className="md:col-span-2">
            <ChatWindow 
              messages={messages} 
              onSendMessage={handleSendMessage}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
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
      
      <footer className="bg-white p-4 text-center text-gray-500 text-sm">
        <p>TalkEasy - Never run out of things to say</p>
      </footer>
    </div>
  );
};

export default Index;
