
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, RefreshCw } from 'lucide-react';

interface ConversationStartersProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
  onRefreshTopics: () => void;
}

const ConversationStarters: React.FC<ConversationStartersProps> = ({
  topics,
  onSelectTopic,
  onRefreshTopics
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <MessageSquarePlus className="mr-2 h-5 w-5 text-chat-primary" />
          Conversation Starters
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefreshTopics}
          className="text-chat-primary border-chat-primary hover:bg-chat-primary hover:text-white"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          <span className="text-xs">Refresh</span>
        </Button>
      </div>
      
      <div className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin pr-1">
        {topics.map((topic, index) => (
          <Card 
            key={index} 
            className="topic-card p-3 cursor-pointer border-l-4 border-l-chat-primary hover:bg-gray-50 transition-all"
            onClick={() => onSelectTopic(topic)}
          >
            <p className="text-sm text-gray-700">{topic}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConversationStarters;
