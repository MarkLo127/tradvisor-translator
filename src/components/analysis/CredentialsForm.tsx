
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface CredentialsFormProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  secApiKey: string;
  setSecApiKey: (key: string) => void;
}

const CredentialsForm = ({ apiKey, setApiKey, baseUrl, setBaseUrl, secApiKey, setSecApiKey }: CredentialsFormProps) => {
  const { language } = useLanguage();
  
  const formSchema = z.object({
    apiKey: z.string().min(1, {
      message: language === 'zh' ? 'API Key 為必填欄位' : 'API Key is required'
    }),
    baseUrl: z.string(),
    secApiKey: z.string().min(1, {
      message: language === 'zh' ? 'SEC API Key 為必填欄位' : 'SEC API Key is required'
    })
  });

  const form = useForm({
    defaultValues: {
      apiKey,
      baseUrl,
      secApiKey
    },
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: { apiKey: string; baseUrl: string; secApiKey: string }) => {
    setApiKey(data.apiKey);
    setBaseUrl(data.baseUrl);
    setSecApiKey(data.secApiKey);
  };

  // Update parent state when form values change
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseUrl(e.target.value);
  };

  const handleSecApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecApiKey(e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'zh' ? '輸入 API 憑證' : 'Enter API Credentials'}
      </h2>
      <p className="text-muted-foreground mb-6">
        {language === 'zh' 
          ? '請提供您的 API Key 和 Base URL（如果有的話）' 
          : 'Please provide your API Key and Base URL (if applicable)'}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'zh' ? 'API Key' : 'API Key'}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={language === 'zh' ? '輸入您的 API Key' : 'Enter your API Key'}
                    value={apiKey}
                    onChange={handleApiKeyChange}
                  />
                </FormControl>
                <FormDescription>
                  {language === 'zh'
                    ? '您可以從 OpenAI 或其他 AI 提供商獲取 API Key'
                    : 'You can get an API Key from OpenAI or other AI providers'}
                </FormDescription>
                <FormMessage />  
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="baseUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'zh' ? '基本 URL（選填）' : 'Base URL (Optional)'}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={language === 'zh' ? '輸入基本 URL（如果有的話）' : 'Enter Base URL (if applicable)'}
                    value={baseUrl}
                    onChange={handleBaseUrlChange}
                  />
                </FormControl>
                <FormDescription>
                  {language === 'zh'
                    ? '如果您使用的是代理或自託管的 AI 服務，請輸入基本 URL'
                    : 'Enter a Base URL if you are using a proxy or self-hosted AI service'}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'zh' ? 'SEC API Key' : 'SEC API Key'}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={language === 'zh' ? '輸入您的 SEC API Key' : 'Enter your SEC API Key'}
                    value={secApiKey}
                    onChange={handleSecApiKeyChange}
                  />
                </FormControl>
                <FormDescription>
                  {language === 'zh'
                    ? <>您可以從 <a href="https://sec-api.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://sec-api.io</a> 獲取 SEC API Key</>
                    : <>You can get a SEC API Key from <a href="https://sec-api.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://sec-api.io</a></>}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CredentialsForm;
