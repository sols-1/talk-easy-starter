
import React from 'react';
import { MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-chat-primary to-chat-secondary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6" />
          <h1 className="text-xl font-bold">TalkEasy</h1>
        </div>
        <p className="text-sm font-light hidden md:block">Never run out of things to say</p>
      </div>
    </header>
  );
};

export default Header;
