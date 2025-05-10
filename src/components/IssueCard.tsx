
import React from 'react';
import { Button } from "@/components/ui/button";

interface IssueProps {
  issue: {
    id: string;
    title: string;
    status: string;
    component: string | null;
    hours: string;
    comments: number;
    assignee: string;
    emoji: string;
  };
}

const IssueCard: React.FC<IssueProps> = ({ issue }) => {
  return (
    <div className="bg-white mb-2 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="h-5 w-5 rounded-full border border-gray-200 mr-2"></div>
            <span className="text-xs text-gray-500 font-medium">{issue.id}</span>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-700 rounded text-xs py-0.5 px-2 font-semibold">
              {issue.assignee}
            </div>
          </div>
        </div>
        
        <h3 className="text-sm font-semibold mb-1">{issue.title} {issue.emoji}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-6 text-xs border-gray-200 text-gray-500 px-2.5 hover:bg-gray-50"
          >
            No component
          </Button>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>{issue.hours}</div>
          {issue.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageIcon />
              <span>{issue.comments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Custom Message icon
const MessageIcon = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default IssueCard;
