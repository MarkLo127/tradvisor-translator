
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, ArrowLeft, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import ChatMessage from '@/components/chat/ChatMessage';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatState {
  selectedModel: string;
  apiKey: string;
  baseUrl: string;
  documentType: string;
  ticker: string;
}

const Chat = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as ChatState | null;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Check if we have the required state
  useEffect(() => {
    if (!state || !state.selectedModel || !state.apiKey || !state.documentType || !state.ticker) {
      navigate('/analysis');
      return;
    }
    
    // Add initial system message
    const initialMessages: Message[] = [
      {
        id: '1',
        role: 'system',
        content: language === 'zh' 
          ? `我將幫助您分析 ${state.ticker} 的 ${state.documentType} 文件。` 
          : `I'll help you analyze the ${state.documentType} document for ${state.ticker}.`,
        timestamp: new Date()
      }
    ];
    
    setMessages(initialMessages);
  }, [state, navigate, language]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example responses based on analysis
      let response = '';
      if (input.toLowerCase().includes('risk')) {
        response = language === 'zh' 
          ? `根據 ${state?.ticker} 的 ${state?.documentType} 文件分析，主要風險包括：\n\n1. 市場競爭加劇\n2. 法規變更風險\n3. 技術創新不足\n4. 供應鏈中斷\n5. 網絡安全威脅增加`
          : `Based on the analysis of ${state?.ticker}'s ${state?.documentType}, the main risks include:\n\n1. Increased market competition\n2. Regulatory changes\n3. Lack of technological innovation\n4. Supply chain disruptions\n5. Increased cybersecurity threats`;
      } else if (input.toLowerCase().includes('financ') || input.toLowerCase().includes('財務')) {
        response = language === 'zh'
          ? `${state?.ticker} 的財務狀況顯示年度收入增長 12%，但營業利潤率降低 2.5%，主要由於原材料成本上升和供應鏈挑戰。`
          : `${state?.ticker}'s financial position shows a 12% increase in annual revenue, but a 2.5% decrease in operating margin, primarily due to rising material costs and supply chain challenges.`;
      } else {
        response = language === 'zh'
          ? `我已分析了 ${state?.ticker} 的 ${state?.documentType} 文件。有什麼具體方面您想了解的嗎？例如：財務表現、風險因素、業務策略、管理層討論等。`
          : `I've analyzed the ${state?.documentType} for ${state?.ticker}. Is there a specific aspect you'd like to know about? For example: financial performance, risk factors, business strategy, management discussion, etc.`;
      }
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: language === 'zh' ? '發送訊息時出錯' : 'Error sending message',
        description: language === 'zh' ? '請稍後再試' : 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/analysis')}
            aria-label={language === 'zh' ? '返回' : 'Back'}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">
              {state?.ticker} - {state?.documentType}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === 'zh' ? '模型：' : 'Model: '}{state?.selectedModel}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSettings(true)}
          >
            {language === 'zh' ? '查看設置' : 'View Settings'}
          </Button>
        </div>
      </header>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.filter(m => m.role !== 'system').map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            ticker={state?.ticker || ''} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t p-4">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'zh' 
              ? '詢問有關此 SEC 文件的問題...' 
              : 'Ask a question about this SEC document...'}
            className="resize-none pr-12 min-h-[80px]"
            disabled={isLoading}
          />
          <Button 
            className="absolute right-2 bottom-2"
            size="icon"
            disabled={!input.trim() || isLoading}
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {language === 'zh' 
            ? '根據 SEC 文件提供的信息生成回應。請自行驗證重要資訊。' 
            : 'Responses are generated based on SEC documents. Please verify important information.'}
        </p>
      </div>
      
      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'zh' ? '分析設置' : 'Analysis Settings'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">
                {language === 'zh' ? '模型' : 'Model'}
              </h3>
              <p className="text-sm">{state?.selectedModel}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                {language === 'zh' ? '文件類型' : 'Document Type'}
              </h3>
              <p className="text-sm">{state?.documentType}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">
                {language === 'zh' ? '股票代號' : 'Ticker'}
              </h3>
              <p className="text-sm">{state?.ticker}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">API Key</h3>
              <p className="text-sm">••••••••{state?.apiKey.slice(-4)}</p>
            </div>
            {state?.baseUrl && (
              <div>
                <h3 className="font-medium mb-1">Base URL</h3>
                <p className="text-sm">{state?.baseUrl}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
