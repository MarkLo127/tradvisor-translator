
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState, useEffect } from 'react';

interface DocumentTypeSelectorProps {
  selectedDocument: string;
  setSelectedDocument: (document: string) => void;
}

// Parse SEC document types based on sec.md and sec_en.md
const parseSecDocuments = (language: 'zh' | 'en') => {
  const documents = language === 'zh' ? [
    {
      category: '註冊聲明',
      items: [
        { id: 'S-1', name: 'S-1: 首次公開發行(IPO)投資招股說明書' },
        { id: 'S-3', name: 'S-3: 成熟發行人的證券發行招股說明書' },
        { id: 'S-4', name: 'S-4: 併購/收購相關證券註冊' },
        { id: 'S-8', name: 'S-8: 員工福利計劃證券發行' },
        { id: 'S-11', name: 'S-11: 房地產公司證券註冊' },
        { id: 'F-1', name: 'F-1: 外國私人發行人IPO註冊' },
        { id: 'F-3', name: 'F-3: 外國成熟發行人證券註冊' },
        { id: 'F-4', name: 'F-4: 外國發行人併購註冊' },
        { id: 'F-6', name: 'F-6: 美國存託憑證(ADR)註冊' },
        { id: 'N-1A', name: 'N-1A: 開放式基金註冊聲明' },
        { id: 'N-2', name: 'N-2: 封閉式基金註冊聲明' },
      ]
    },
    {
      category: '定期報告',
      items: [
        { id: '10-K', name: '10-K: 年報' },
        { id: '10-Q', name: '10-Q: 季報' },
        { id: '8-K', name: '8-K: 當前報告（重大事件）' },
        { id: '20-F', name: '20-F: 外國私人發行人年報' },
        { id: '40-F', name: '40-F: 加拿大發行人年報' },
        { id: '6-K', name: '6-K: 外國發行人當前報告' },
        { id: 'N-CSR', name: 'N-CSR: 年度/半年度股東報告' },
        { id: '13F-HR', name: '13F-HR: 機構管理者季度持股報告' },
      ]
    },
    {
      category: '代理與股東投票文件',
      items: [
        { id: 'DEF-14A', name: 'DEF 14A: 最終代理聲明' },
        { id: 'PRE-14A', name: 'PRE 14A: 初步代理聲明' },
        { id: 'DEF-14C', name: 'DEF 14C: 最終信息聲明' },
        { id: 'DEFM14A', name: 'DEFM14A: 併購相關最終代理聲明' },
        { id: 'N-PX', name: 'N-PX: 基金代理投票年度報告' },
      ]
    },
    {
      category: '收購與要約文件',
      items: [
        { id: 'SC-13D', name: 'SC 13D: 有益所有權收購聲明' },
        { id: 'SC-13G', name: 'SC 13G: 個人所有權收購聲明' },
        { id: 'SC-TO-T', name: 'SC TO-T: 第三方要約收購聲明' },
        { id: 'SC-TO-I', name: 'SC TO-I: 發行人要約收購聲明' },
        { id: 'SC-13E3', name: 'SC 13E3: 私有化交易聲明' },
      ]
    },
    {
      category: '內部交易報告',
      items: [
        { id: 'FORM-3', name: 'Form 3: 初始所有權聲明' },
        { id: 'FORM-4', name: 'Form 4: 證券交易記錄' },
        { id: 'FORM-5', name: 'Form 5: 年度所有權變更報告' },
        { id: 'FORM-144', name: 'Form 144: Rule 144下限制性證券出售通知' },
      ]
    },
    {
      category: '招股說明書',
      items: [
        { id: '424A', name: '424A: 初步招股說明書' },
        { id: '424B', name: '424B: 最終招股說明書' },
        { id: '497', name: '497: 投資公司招股說明書' },
        { id: '497K', name: '497K: 簡要招股說明書' },
        { id: 'FWP', name: 'FWP: 自由書面招股說明書' },
      ]
    },
    {
      category: '修正與後續文件',
      items: [
        { id: 'POS-AM', name: 'POS AM: 生效後修正' },
        { id: '485APOS', name: '485APOS: 投資公司生效前修正' },
        { id: '485BPOS', name: '485BPOS: 投資公司生效後修正' },
        { id: '10-K/A', name: '10-K/A: 年報修正' },
        { id: '10-Q/A', name: '10-Q/A: 季報修正' },
      ]
    },
    {
      category: '私募與眾籌文件',
      items: [
        { id: 'FORM-D', name: 'Form D: Regulation D私募發行' },
        { id: 'FORM-C', name: 'Form C: Regulation Crowdfunding發行聲明' },
        { id: '1-A', name: '1-A: Regulation A發行聲明（小型公開發行）' },
      ]
    },
    {
      category: '其他文件',
      items: [
        { id: 'EFFECT', name: 'EFFECT: 註冊生效通知' },
        { id: 'CORRESP', name: 'CORRESP: 公司與SEC的通信' },
        { id: 'NT-10K', name: 'NT 10-K: 延遲提交年報通知' },
        { id: 'NT-10Q', name: 'NT 10-Q: 延遲提交季報通知' },
        { id: '40-APP', name: '40-APP: 投資公司豁免申請' },
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
  ] : [
    {
      category: 'Registration Statements',
      items: [
        { id: 'S-1', name: 'S-1: Initial Public Offering (IPO) prospectus' },
        { id: 'S-3', name: 'S-3: Securities offering prospectus for seasoned issuers' },
        { id: 'S-4', name: 'S-4: Securities registration for mergers/acquisitions' },
        { id: 'S-8', name: 'S-8: Employee benefit plan securities offering' },
        { id: 'S-11', name: 'S-11: Real estate company securities registration' },
        { id: 'F-1', name: 'F-1: Foreign private issuer IPO registration' },
        { id: 'F-3', name: 'F-3: Foreign seasoned issuer securities registration' },
        { id: 'F-4', name: 'F-4: Foreign issuer merger registration' },
        { id: 'F-6', name: 'F-6: American Depositary Receipt (ADR) registration' },
        { id: 'N-1A', name: 'N-1A: Open-end fund registration statement' },
        { id: 'N-2', name: 'N-2: Closed-end fund registration statement' },
      ]
    },
    {
      category: 'Periodic Reports',
      items: [
        { id: '10-K', name: '10-K: Annual report' },
        { id: '10-Q', name: '10-Q: Quarterly report' },
        { id: '8-K', name: '8-K: Current report (material events)' },
        { id: '20-F', name: '20-F: Foreign private issuer annual report' },
        { id: '40-F', name: '40-F: Canadian issuer annual report' },
        { id: '6-K', name: '6-K: Foreign issuer current report' },
        { id: 'N-CSR', name: 'N-CSR: Annual/semi-annual shareholder report' },
        { id: '13F-HR', name: '13F-HR: Institutional manager quarterly holdings report' },
      ]
    },
    {
      category: 'Proxy and Voting Filings',
      items: [
        { id: 'DEF-14A', name: 'DEF 14A: Definitive proxy statement' },
        { id: 'PRE-14A', name: 'PRE 14A: Preliminary proxy statement' },
        { id: 'DEF-14C', name: 'DEF 14C: Definitive information statement' },
        { id: 'DEFM14A', name: 'DEFM14A: Definitive proxy statement for mergers/acquisitions' },
        { id: 'N-PX', name: 'N-PX: Fund proxy voting annual report' },
      ]
    },
    {
      category: 'Acquisition and Tender Offer Filings',
      items: [
        { id: 'SC-13D', name: 'SC 13D: Beneficial ownership acquisition statement' },
        { id: 'SC-13G', name: 'SC 13G: Individual ownership acquisition statement' },
        { id: 'SC-TO-T', name: 'SC TO-T: Third-party tender offer statement' },
        { id: 'SC-TO-I', name: 'SC TO-I: Issuer tender offer statement' },
        { id: 'SC-13E3', name: 'SC 13E3: Going-private transaction statement' },
      ]
    },
    {
      category: 'Insider Trading Filings',
      items: [
        { id: 'FORM-3', name: 'Form 3: Initial ownership statement' },
        { id: 'FORM-4', name: 'Form 4: Securities transaction record' },
        { id: 'FORM-5', name: 'Form 5: Annual ownership change report' },
        { id: 'FORM-144', name: 'Form 144: Notice of proposed sale under Rule 144' },
      ]
    },
    {
      category: 'Prospectuses',
      items: [
        { id: '424A', name: '424A: Preliminary prospectus' },
        { id: '424B', name: '424B: Final prospectus' },
        { id: '497', name: '497: Investment company prospectus' },
        { id: '497K', name: '497K: Summary prospectus' },
        { id: 'FWP', name: 'FWP: Free writing prospectus' },
      ]
    },
    {
      category: 'Amendments and Post-Effective Filings',
      items: [
        { id: 'POS-AM', name: 'POS AM: Post-effective amendment' },
        { id: '485APOS', name: '485APOS: Pre-effective amendment (investment companies)' },
        { id: '485BPOS', name: '485BPOS: Post-effective amendment (investment companies)' },
        { id: '10-K/A', name: '10-K/A: Amended annual report' },
        { id: '10-Q/A', name: '10-Q/A: Amended quarterly report' },
      ]
    },
    {
      category: 'Private Placement and Crowdfunding Filings',
      items: [
        { id: 'FORM-D', name: 'Form D: Regulation D private offering' },
        { id: 'FORM-C', name: 'Form C: Regulation Crowdfunding offering statement' },
        { id: '1-A', name: '1-A: Regulation A offering statement' },
      ]
    },
    {
      category: 'Miscellaneous Filings',
      items: [
        { id: 'EFFECT', name: 'EFFECT: Notice of registration effectiveness' },
        { id: 'CORRESP', name: 'CORRESP: Correspondence with the SEC' },
        { id: 'NT-10K', name: 'NT 10-K: Late annual report filing notification' },
        { id: 'NT-10Q', name: 'NT 10-Q: Late quarterly report filing notification' },
        { id: '40-APP', name: '40-APP: Investment company exemption application' },
      ]
    },
  ];
  return documents;
};

const DocumentTypeSelector = ({ selectedDocument, setSelectedDocument }: DocumentTypeSelectorProps) => {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | undefined>('item-0');
  const [docGroups, setDocGroups] = useState<any[]>([]);

  // Initialize document groups
  useEffect(() => {
    setDocGroups(parseSecDocuments(language));
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
                {group.category}
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
