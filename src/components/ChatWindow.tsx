
import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  inputValue,
  setInputValue,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-sm border">
      <div className="p-4 border-b bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } animate-message-fade-in`}
          >
            <div className="flex max-w-[80%]">
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 mr-2">
                  <Avatar className="h-8 w-8 bg-chat-secondary">
                    <div className="text-xs font-medium text-white">TE</div>
                  </Avatar>
                </div>
              )}
              
              <div>
                <div 
                  className={`message-bubble ${
                    message.sender === 'user' ? 'user-message bg-chat-primary' : 'bot-message'
                  }`}
                >
                  {message.content}
                </div>
                <p className={`text-xs text-gray-500 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <div className="flex-shrink-0 ml-2">
                  <Avatar className="h-8 w-8 bg-blue-500">
                    <div className="text-xs font-medium text-white">You</div>
                  </Avatar>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
