
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState, useEffect } from 'react';

interface DocumentTypeSelectorProps {
  selectedDocument: string;
  setSelectedDocument: (document: string) => void;
}

// Parse SEC document types from the sec.txt file
const parseSecDocuments = () => {
  // This is a simplified version. The actual implementation would parse the entire sec.txt
  return [
    {
      category: '註冊與上市申請',
      items: [
        { id: 'S-1', name: 'S-1: 首次公開發行（IPO）或其他首次註冊證券的表單' },
        { id: 'S-3', name: 'S-3: 已上市公司發行新證券的簡化註冊表單' },
        { id: 'S-4', name: 'S-4: 企業合併、交換要約或重組相關的證券註冊' },
        { id: 'S-8', name: 'S-8: 與員工福利計畫相關的證券註冊' },
        { id: 'F-1', name: 'F-1: 外國公司首次公開發行（IPO）或首次註冊證券' },
        { id: 'F-3', name: 'F-3: 外國公司發行新證券的簡化註冊表單' },
        { id: 'F-4', name: 'F-4: 外國企業合併、交換要約或重組相關的證券註冊' },
      ]
    },
    {
      category: '定期報告',
      items: [
        { id: '10-K', name: '10-K: 年度報告（美國公司）' },
        { id: '10-Q', name: '10-Q: 季度報告（美國公司）' },
        { id: '20-F', name: '20-F: 外國公司年度報告（SEC 註冊的外國公司）' },
        { id: '40-F', name: '40-F: 加拿大公司年度報告（符合 SEC 規範的加拿大公司）' },
        { id: '6-K', name: '6-K: 外國公司提交的臨時報告' },
      ]
    },
    {
      category: '重大事件披露',
      items: [
        { id: '8-K', name: '8-K: 重大事件披露（收購、破產、管理層變動等）' },
        { id: 'SC 13D', name: 'SC 13D: 當投資者持有公司 5% 以上股權時提交的詳細披露' },
        { id: 'SC 13G', name: 'SC 13G: 與 SC 13D 類似，但適用於被動投資者' },
        { id: '14A', name: '14A: 代理權聲明（年度股東會議與董事會選舉）' },
        { id: '14C', name: '14C: 不需要股東投票的資訊聲明' },
      ]
    },
  ];
};

const DocumentTypeSelector = ({ selectedDocument, setSelectedDocument }: DocumentTypeSelectorProps) => {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | undefined>('item-0');
  const [docGroups, setDocGroups] = useState<any[]>([]);

  // Initialize document groups
  useEffect(() => {
    setDocGroups(parseSecDocuments());
  }, []);

  // For the select dropdown
  const allDocuments = docGroups.flatMap(group => group.items);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'zh' ? '選擇 SEC 文件類型' : 'Select SEC Document Type'}
      </h2>
      <p className="text-muted-foreground mb-6">
        {language === 'zh' 
          ? '選擇您要分析的 SEC 文件類型' 
          : 'Choose which SEC document type you want to analyze'}
      </p>
      
      <Select value={selectedDocument} onValueChange={setSelectedDocument}>
        <SelectTrigger className="w-full mb-6">
          <SelectValue placeholder={language === 'zh' ? '選擇文件類型' : 'Select document type'} />
        </SelectTrigger>
        <SelectContent>
          {allDocuments.map(doc => (
            <SelectItem key={doc.id} value={doc.id}>
              {doc.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">
          {language === 'zh' ? '文件類型參考' : 'Document Type Reference'}
        </h3>
        
        <Accordion type="single" collapsible value={expanded} onValueChange={setExpanded} className="w-full">
          {docGroups.map((group, index) => (
            <AccordionItem key={`item-${index}`} value={`item-${index}`}>
              <AccordionTrigger className="font-medium text-left">
                {language === 'zh' ? group.category : group.category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  {group.items.map((item: any) => (
                    <li 
                      key={item.id} 
                      className={`py-1 px-2 rounded cursor-pointer hover:bg-muted ${
                        selectedDocument === item.id ? 'bg-muted font-medium' : ''
                      }`}
                      onClick={() => setSelectedDocument(item.id)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default DocumentTypeSelector;
