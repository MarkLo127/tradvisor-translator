
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const ModelSelector = ({ selectedModel, setSelectedModel }: ModelSelectorProps) => {
  const { language } = useLanguage();
  
  const models = [
    {
      id: 'openai',
      name: 'OpenAI GPT-4',
      description: language === 'zh' 
        ? '最強大的商業 AI 模型，具備優秀的理解和分析能力' 
        : 'Most powerful commercial AI model with excellent comprehension and analysis capabilities'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: language === 'zh' 
        ? 'Google 最新的 AI 模型，擅長多模態分析' 
        : 'Google\'s latest AI model, excelling in multimodal analysis'
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      description: language === 'zh' 
        ? '具有強大的文本理解和分析能力' 
        : 'Powerful text comprehension and analysis capabilities'
    },
    {
      id: 'deepseek',
      name: 'Deepseek',
      description: language === 'zh' 
        ? '專注於深度學習的開源 AI 模型' 
        : 'Open-source AI model focused on deep learning'
    },
    {
      id: 'grok',
      name: 'xAI Grok',
      description: language === 'zh' 
        ? '最新的對話式 AI 模型，具有獨特的分析視角' 
        : 'Latest conversational AI model with unique analytical perspective'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'zh' ? '選擇 AI 模型' : 'Select AI Model'}
      </h2>
      <p className="text-muted-foreground mb-6">
        {language === 'zh' 
          ? '選擇用於分析 SEC 文件的 AI 模型' 
          : 'Choose which AI model to use for SEC document analysis'}
      </p>
      
      <RadioGroup value={selectedModel} onValueChange={setSelectedModel} className="grid gap-4">
        {models.map(model => (
          <Card 
            key={model.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedModel === model.id 
                ? 'border-primary' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedModel(model.id)}
          >
            <CardContent className="p-4 flex items-start gap-4">
              <RadioGroupItem value={model.id} id={model.id} className="mt-1" />
              <div>
                <Label htmlFor={model.id} className="text-lg font-medium">
                  {model.name}
                </Label>
                <p className="text-muted-foreground text-sm mt-1">{model.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ModelSelector;
