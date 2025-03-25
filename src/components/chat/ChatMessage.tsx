
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  ticker: string;
}

const ChatMessage = ({ message, ticker }: ChatMessageProps) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  const isUser = message.role === 'user';
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast({
        title: language === 'zh' ? '已複製到剪貼板' : 'Copied to clipboard',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-start gap-4 max-w-3xl mx-auto py-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div 
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-md",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {isUser ? (
          <span className="text-sm font-medium">
            {language === 'zh' ? '您' : 'You'}
          </span>
        ) : (
          <span className="text-sm font-medium">AI</span>
        )}
      </div>
      
      {/* Message content */}
      <div 
        className={cn(
          "relative group rounded-lg px-4 py-3 text-sm",
          isUser 
            ? "bg-primary text-primary-foreground mr-2" 
            : "bg-muted text-foreground ml-2"
        )}
      >
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>
        
        {/* Copy button - only for assistant messages */}
        {!isUser && (
          <button
            onClick={copyToClipboard}
            className={cn(
              "absolute -right-2 -top-2 p-1 rounded-md bg-background border",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "text-muted-foreground hover:text-foreground"
            )}
            aria-label={language === 'zh' ? '複製' : 'Copy'}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
