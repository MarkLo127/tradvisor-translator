
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

interface ModelOption {
  id: string;
  name: string;
  description: string;
}

interface VendorModels {
  id: string;
  name: string;
  models: ModelOption[];
}

const ModelSelector = ({ selectedModel, setSelectedModel }: ModelSelectorProps) => {
  const { language } = useLanguage();
  
  const vendors: VendorModels[] = [
    {
      id: 'OpenAI',
      name: language === 'zh' ? 'OpenAI' : 'OpenAI',
      models: [
        {
          id: 'gpt-4.5-preview-2025-02-27',
          name: 'gpt-4.5',
          description: language === 'zh'
            ? '最大，功能最強大的GPT模型'
            : 'Largest and most capable GPT model'
        },
        {
          id: 'o1-2024-12-17',
          name: 'o1',
          description: language === 'zh'
            ? '高智能推理模型'
            : 'High-intelligence reasoning model'
        },
        {
          id: 'o3-mini-2025-01-31',
          name: 'o3-mini',
          description: language === 'zh'
           ? '快速，靈活，聰明的推理模型'
            : 'Fast, flexible, intelligent reasoning model'
        }
      ]
    },
    {
      id: 'Gemini',
      name: language === 'zh' ? 'Google' : 'Google',
      models: [
        {
          id: 'gemini-2.0-pro-exp-02-05',
          name: 'gemini-2.0-pro-exp',
          description: language === 'zh'
            ? '最強大的 Gemini 2.0 模型'
            : 'The most powerful Gemini 2.0 model'
        },
        {
          id: 'gemini-2.0-flash',
          name: 'gemini-2.0-flash',
          description: language === 'zh'
            ? '新一代功能、速度、思考、即時串流和多模態生成'
            : 'New generation of functions, speed, thinking, instant streaming and multi-modal generation'
        },
        {
          id: 'gemini-2.0-flash-lite',
          name: 'gemini-2.0-flash-lite',
          description: language === 'zh'
           ? '以成本效益和低延遲時間為優先的 Gemini 2.0 Flash 模型'
            : 'Gemini 2.0 Flash model with cost-effectiveness and low latency as the priority'
        }
      ]
    },
    {
      id: 'Anthropic',
      name: language === 'zh' ? 'Anthropic' : 'Anthropic',
      models: [
        {
          id: 'claude-3-7-sonnet-20250219',
          name: 'claude-3-7-sonnet',
          description: language === 'zh'
            ? '最高水平的智能和能力，具有可切換的延伸思考功能'
            : 'The highest level of intelligence and ability, with switchable extended thinking function'
        },
        {
          id: 'claude-3-opus-20240229',
          name: 'claude-3-opus',
          description: language === 'zh'
            ? '用於複雜任務的強大模型'
            : 'Powerful models for complex tasks'
        },
        {
          id: 'claude-3-haiku-20240307',
          name: 'claude-3-haiku',
          description: language === 'zh'
           ? '快速且準確的目標性能'
            : 'Fast and accurate target performance'
        }
      ]
    },
    {
      id: 'DeepSeek',
      name: language === 'zh' ? 'DeepSeek' : 'DeepSeek',
      models: [
        {
          id: 'deepseek-chat',
          name: 'DeepSeek-V3',
          description: language === 'zh'
            ? '專門適用於數學、編碼和中文等任務，效能對標GPT-4o'
            : 'Specially suitable for tasks such as mathematics, coding and Chinese, performance benchmark GPT-4o'
        },
        {
          id: 'deepseek-reasoner',
          name: 'DeepSeek-R1',
          description: language === 'zh'
            ? '專門適用於數學、編碼和邏輯等任務，性能對標OpenAI o1'
            : 'Specially applicable to tasks such as mathematics, coding and logic, performance benchmarking OpenAI o1'
        }
      ]
    },
    {
      id: 'xAI',
      name: language === 'zh' ? 'xAI' : 'xAI',
      models: [
        {
          id: 'grok-2-1212',
          name: 'grok-2',
          description: language === 'zh'
            ? 'Grok 2模型支援函式呼叫和結構化輸出。'
            : 'Grok 2 model supporting function calling and structured outputs.'
        },
        {
          id: 'grok-2-vision-1212',
          name: 'grok-2-vision',
          description: language === 'zh'
           ? 'Grok 2影象理解模型能夠處理文件、圖表等'
            : 'Grok 2 image understanding model capable of processing documents, diagrams, and more.'
        }
      ]
    }
  ];

  const [selectedVendor, setSelectedVendor] = useState<string>('');

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
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            {language === 'zh' ? '選擇模型廠商' : 'Select Model Vendor'}
          </Label>
          <Select
            value={selectedVendor}
            onValueChange={(value) => {
              setSelectedVendor(value);
              setSelectedModel('');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'zh' ? '請選擇廠商' : 'Choose a vendor'} />
            </SelectTrigger>
            <SelectContent>
              {vendors.map((vendor) => (
                <SelectItem key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedVendor && (
          <div className="space-y-2">
            <Label>
              {language === 'zh' ? '選擇模型' : 'Select Model'}
            </Label>
            <Select
              value={selectedModel}
              onValueChange={setSelectedModel}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === 'zh' ? '請選擇模型' : 'Choose a model'} />
              </SelectTrigger>
              <SelectContent>
                {vendors
                  .find((v) => v.id === selectedVendor)
                  ?.models.map((model) => (
                    <SelectItem
                      key={model.id}
                      value={model.id}
                      className="flex flex-col items-start"
                    >
                      <div className="font-medium">{model.name}</div>
                      <div className="text-sm text-muted-foreground">{model.description}</div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSelector;
