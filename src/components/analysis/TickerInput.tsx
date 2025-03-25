
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Search } from 'lucide-react';

interface TickerInputProps {
  ticker: string;
  setTicker: (ticker: string) => void;
}

const TickerInput = ({ ticker, setTicker }: TickerInputProps) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example company suggestions (in a real app, this would come from an API)
  const popularCompanies = [
    { ticker: 'NVDA', name: 'Nvidia Corporation' },
    { ticker: 'AVGO', name: 'Broadcom Inc' },
    { ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing' },

    { ticker: 'AMZN', name: 'Amazon.com, Inc' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
    { ticker: 'GOOGL', name: 'Alphabet Inc' },

    { ticker: 'META', name: 'Meta Platforms, Inc' },
    { ticker: 'TSLA', name: 'Tesla, Inc' },
    { ticker: 'AAPL', name: 'Apple Inc' },

    { ticker: 'BRK-B', name: 'Berkshire Hathaway Inc' },
    { ticker: 'BLK', name: 'BlackRock Inc' },
    { ticker: 'BX', name: 'Blackstone Group' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.toUpperCase());
    setSearchTerm(e.target.value);
  };

  const handleCompanySelect = (selectedTicker: string) => {
    setTicker(selectedTicker);
    setSearchTerm('');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'zh' ? '輸入股票代號' : 'Enter Stock Ticker'}
      </h2>
      <p className="text-muted-foreground mb-6">
        {language === 'zh' 
          ? '輸入您想分析的公司股票代號' 
          : 'Enter the stock ticker symbol of the company you want to analyze'}
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="ticker">
            {language === 'zh' ? '股票代號' : 'Stock Ticker'}
            <span className="text-destructive"> *</span>
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="ticker"
              value={ticker}
              onChange={handleInputChange}
              placeholder={language === 'zh' ? '例如：NVDA, AVGO, BRK-B' : 'e.g., NVDA, AVGO, BRK-B'}
              className="pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {language === 'zh' 
              ? '輸入股票代號' 
              : 'Enter the ticker symbol'}
          </p>
        </div>
        
        {/* Popular companies */}
        <div className="mt-8">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">
            {language === 'zh' ? '熱門公司' : 'Popular Companies'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {popularCompanies.map(company => (
              <div 
                key={company.ticker}
                className={`border rounded p-2 cursor-pointer hover:bg-muted transition-colors text-sm ${
                  ticker === company.ticker ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => handleCompanySelect(company.ticker)}
              >
                <div className="font-medium">{company.ticker}</div>
                <div className="text-muted-foreground">{company.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerInput;
