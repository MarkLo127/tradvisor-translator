import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DocumentTypeSelector from '@/components/analysis/DocumentTypeSelector';
import ModelSelector from '@/components/analysis/ModelSelector';
import CredentialsForm from '@/components/analysis/CredentialsForm';
import TickerInput from '@/components/analysis/TickerInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type Step = 'model' | 'credentials' | 'document' | 'ticker';

const Analysis = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for the analysis setup process
  const [currentStep, setCurrentStep] = useState<Step>('model');
  const [selectedModel, setSelectedModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [ticker, setTicker] = useState('');

  const handleNext = () => {
    if (currentStep === 'model') {
      if (!selectedModel) {
        toast({
          title: language === 'zh' ? '請選擇模型' : 'Please select a model',
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('credentials');
    } else if (currentStep === 'credentials') {
      if (!apiKey) {
        toast({
          title: language === 'zh' ? '請輸入 API Key' : 'Please enter API Key',
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('document');
    } else if (currentStep === 'document') {
      if (!documentType) {
        toast({
          title: language === 'zh' ? '請選擇文件類型' : 'Please select a document type',
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('ticker');
    }
  };

  const handleBack = () => {
    if (currentStep === 'credentials') {
      setCurrentStep('model');
    } else if (currentStep === 'document') {
      setCurrentStep('credentials');
    } else if (currentStep === 'ticker') {
      setCurrentStep('document');
    }
  };

  const handleStartAnalysis = () => {
    if (!ticker) {
      toast({
        title: language === 'zh' ? '請輸入股票代號' : 'Please enter stock ticker',
        variant: "destructive",
      });
      return;
    }
    
    // Start analysis by navigating to the chat page with query parameters
    navigate(`/chat?model=${selectedModel}&docType=${documentType}&ticker=${ticker}`, {
      state: {
        selectedModel,
        apiKey,
        baseUrl,
        documentType,
        ticker
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-4xl py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {language === 'zh' ? 'SEC文件分析' : 'SEC Document Analysis'}
        </h1>
        
        <div className="bg-card border rounded-lg shadow-sm p-6 mb-6">
          {/* Progress steps */}
          <div className="flex justify-between mb-8">
            {['model', 'credentials', 'document', 'ticker'].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep === step 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : (
                        ['model', 'credentials', 'document', 'ticker'].indexOf(currentStep) > 
                        ['model', 'credentials', 'document', 'ticker'].indexOf(step as Step) 
                          ? 'border-primary bg-primary/20 text-primary' 
                          : 'border-muted bg-muted/20 text-muted-foreground'
                      )
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm text-muted-foreground">
                  {step === 'model' && (language === 'zh' ? '選擇模型' : 'Select Model')}
                  {step === 'credentials' && (language === 'zh' ? '輸入憑證' : 'Enter Credentials')}
                  {step === 'document' && (language === 'zh' ? '選擇文件' : 'Select Document')}
                  {step === 'ticker' && (language === 'zh' ? '輸入股票代號' : 'Enter Ticker')}
                </span>
              </div>
            ))}
          </div>
          
          {/* Step content */}
          <div className="mb-8">
            {currentStep === 'model' && (
              <ModelSelector
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            )}
            
            {currentStep === 'credentials' && (
              <CredentialsForm
                apiKey={apiKey}
                setApiKey={setApiKey}
                baseUrl={baseUrl}
                setBaseUrl={setBaseUrl}
              />
            )}
            
            {currentStep === 'document' && (
              <DocumentTypeSelector
                selectedDocument={documentType}
                setSelectedDocument={setDocumentType}
              />
            )}
            
            {currentStep === 'ticker' && (
              <TickerInput
                ticker={ticker}
                setTicker={setTicker}
              />
            )}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 'model'}
            >
              {language === 'zh' ? '上一步' : 'Back'}
            </Button>
            
            {currentStep !== 'ticker' ? (
              <Button onClick={handleNext}>
                {language === 'zh' ? '下一步' : 'Next'}
              </Button>
            ) : (
              <Button onClick={handleStartAnalysis}>
                {language === 'zh' ? '開始分析' : 'Start Analysis'}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analysis;
