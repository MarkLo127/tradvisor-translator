
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
      id: 'gpt-4o',
      name: 'GPT-4o',
      description: language === 'zh' 
        ? '最強大的模型，支援多模態和上下文理解' 
        : 'Most powerful model with multimodal and context understanding'
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: language === 'zh' 
        ? '平衡效能與速度的選擇' 
        : 'Balanced performance and speed'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: language === 'zh' 
        ? '快速且成本效益高的選擇' 
        : 'Fast and cost-effective option'
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
