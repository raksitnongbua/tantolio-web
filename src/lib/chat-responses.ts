import { portfolioData } from './portfolio-data';
import type { ChatMessage, ChatResponse, TranslationMessages } from '@/types/chat';

export type { ChatMessage, ChatResponse, TranslationMessages };

export class PortfolioChatBot {
  private static getLocalizedResponse(key: string, language: 'en' | 'th', translations: TranslationMessages): string {
    try {
      if (key === 'whoIsRaksit' && translations.chat?.whoIsRaksit) {
        return translations.chat.whoIsRaksit
          .replace('{name}', portfolioData.personal.name)
          .replace('{nickname}', portfolioData.personal.nickname)
          .replace('{title}', portfolioData.personal.title)
          .replace('{company}', portfolioData.personal.company)
          .replace('{location}', portfolioData.personal.location);
      }
      
      if (key === 'contact' && translations.chat?.contact) {
        return translations.chat.contact
          .replace('{email}', portfolioData.personal.email)
          .replace('{location}', portfolioData.personal.location);
      }
      
      if (key === 'experience') {
        // For experience, we'll still use the hardcoded data structure but with proper formatting
        const experienceContent = `Here's Tan's professional experience and educational background:

**Professional Experience**

${portfolioData.experience.map(exp => 
  `**${exp.position}** at ${exp.company} (${exp.period})
${exp.description}`
).join('\n\n')}

**Educational Background**

${portfolioData.education.map(edu => 
  `**${edu.degree}**
${edu.school} (${edu.period})`
).join('\n\n')}`;

        const experienceContentTh = `นี่คือประสบการณ์การทำงานและการศึกษาของแทน:

**ประสบการณ์การทำงาน**

**Software Development Team Lead** ที่ Bitkub Online Co., Ltd. (2024 - ปัจจุบัน)
นำทีมพัฒนาในการสร้างแพลตฟอร์มการซื้อขายสกุลเงินดิจิทัลและโซลูชัน fintech ที่ล้ำสมัย ผู้ดูแลโดเมนผู้เชี่ยวชาญสำหรับระบบการยืนยันตัวตน (accounts.bitkub.com) ด้วยสถาปัตยกรรมแบบคู่: bitkub-auth ภายในที่ให้บริการ micro frontends โดยใช้ Domain-Driven Design และ OAuth 2.0 ภายนอกสำหรับการเชื่อมต่อกับบุคคลที่สาม ผู้เชี่ยวชาญด้าน frontend ที่มีการจัดการ session และระบบ ACL management สำหรับเครื่องมือภายในที่จัดการการเข้าถึงของลูกค้า ผู้ริเริ่มโครงการ design tokens โดยแนะนำแนวคิดจากศูนย์และสร้างมาตรฐานระบบออกแบบในหลายโปรเจค จัดการสถาปัตยกรรมทางเทคนิค การตรวจสอบโค้ด และการให้คำปรึกษาทีมพัฒนา

**Senior Frontend Developer** ที่ Bitkub Online Co., Ltd. (2022 - 2024)
เลื่อนตำแหน่งเป็น senior โดยมุ่งเน้นสถาปัตยกรรม frontend และการพัฒนา user interface ที่ซับซ้อน นำโครงการ frontend หลัก ให้คำปรึกษานักพัฒนารุ่นน้อง และมีส่วนร่วมในการพัฒนา design system เชี่ยวชาญใน React, TypeScript และเทคโนโลยี frontend ทันสมัยสำหรับแพลตฟอร์มการซื้อขายสกุลเงินดิจิทัล

**Junior Frontend Developer** ที่ Bitkub Online Co., Ltd. (2021 - 2022)
เริ่มต้นการเดินทางที่ Bitkub ในฐานะ junior frontend developer เรียนรู้และมีส่วนร่วมในการพัฒนาแพลตฟอร์มการซื้อขายสกุลเงินดิจิทัล ได้รับความเชี่ยวชาญใน React, JavaScript และโดเมน fintech ขณะที่สร้าง user interfaces สำหรับระบบการซื้อขายและการยืนยันตัวตน

**Web Developer & Game Developer** ที่ ProGaming Co., Ltd. (2016 - 2021)
ทำหน้าที่คู่ทั้งการพัฒนาเว็บและการพัฒนาเกมตามความต้องการทรัพยากรของบริษัท สำหรับการพัฒนาเว็บ: สร้าง user interface ที่สมบูรณ์โดยทำงานร่วมกับนักออกแบบผ่าน Adobe XD และ Figma ใช้ Node.js, ReactJS, Material UI, Formik, Storybook และ Redux สำหรับการจัดการ state พัฒนา backend APIs ด้วย Express.js และ Firebase Cloud Functions จัดการฐานข้อมูลด้วย Firebase Firestore, MongoDB, ParseServer, GraphQL, MinIO และ AWS สำหรับการพัฒนาเกม: สร้างระบบเกมที่สมบูรณ์ด้วย Unity สำหรับแพลตฟอร์ม iOS, Android และ PC ด้วยภาษา C# และ Unity Redux สำหรับการจัดการข้อมูล พัฒนาเกมบนเว็บโดยเริ่มจาก Unity Tiny ด้วย TypeScript และการรวม ReactJS ต่อมาเปลี่ยนเป็น Cocos TypeScript เพื่อความเสถียรที่ดีกว่า ใช้ Firebase Firestore สำหรับการจัดเก็บข้อมูล

**ประวัติการศึกษา**

**ปริญญาตรีสาขา Computer Game Multimedia**
มหาวิทยาลัย (2016 - 2020)`;
        
        return language === 'th' ? experienceContentTh : experienceContent;
      }
      
      return translations.chat?.[key] || translations.chat?.default || '';
    } catch (error) {
      console.error('Error getting localized response:', error);
      return translations?.chat?.default || 'Sorry, I encountered an error.';
    }
  }

  private static getSuggestions(translations: TranslationMessages): string[] {
    try {
      return [
        translations.suggestions?.whoIsRaksit || "Who is Raksit Nongbua?",
        translations.suggestions?.experience || "His work experience and education",
        translations.suggestions?.skills || "His skill and tech stack knowledge",
        translations.suggestions?.contact || "His contact"
      ];
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return [
        "Who is Raksit Nongbua?",
        "His work experience and education", 
        "His skill and tech stack knowledge",
        "His contact"
      ];
    }
  }

  // Add aliases for backward compatibility
  private static aliases: Record<string, string> = {
    "what are your skills": "what are his skills",
    "show me your projects": "show me his projects", 
    "tell me about your experience": "tell me about his experience",
    "what's your experience": "tell me about his experience",
    "what's his experience": "tell me about his experience",
    "his experience": "tell me about his experience",
    "your experience": "tell me about his experience",
    "work experience": "tell me about his experience",
    "what's your educational background": "tell me about his experience",
    "tell me about his education": "tell me about his experience",
    "what's his education": "tell me about his experience",
    "his education": "tell me about his experience",
    "your education": "tell me about his experience",
    "education": "tell me about his experience",
    "what's his educational background": "tell me about his experience",
    "how can i contact you": "how can i contact him",
    "contact": "how can i contact him",
    "tell me about authentication work": "tell me about his authentication work",
    "authentication work": "tell me about his authentication work",
    "tell me about his authentication work": "tell me about his experience",
    "authentication": "tell me about his experience",
    "bitkub work": "tell me about his experience",
    "his work": "tell me about his experience",
    // New standardized suggestion aliases
    "his work experience and education": "tell me about his experience",
    "work experience and education": "tell me about his experience", 
    "his skill and tech stack knowledge": "what are his skills",
    "skill and tech stack knowledge": "what are his skills",
    "skills": "what are his skills",
    "tech stack": "what are his skills",
    "his contact": "how can i contact him",
    // Thai aliases
    "รักษิต หนองบัว คือใคร": "who is raksit nongbua",
    "รักษิต หนองบัว คือใคร?": "who is raksit nongbua",
    "ประสบการณ์ทำงานและการศึกษา": "tell me about his experience",
    "ทักษะและความรู้ด้านเทคโนโลยี": "what are his skills",
    "ช่องทางติดต่อ": "how can i contact him"
  };

  static getResponse(message: string, language: 'en' | 'th' = 'en', translations?: TranslationMessages): ChatResponse {
    const normalizedMessage = message.toLowerCase().trim();
    
    // Check for aliases first
    const aliasedMessage = this.aliases[normalizedMessage] || normalizedMessage;
    
    // If translations are provided, use them for localized responses
    if (translations) {
      let responseKey = '';
      let isSkillsResponse = false;
      
      // Map message to response keys
      if (aliasedMessage.includes('who is raksit') || aliasedMessage.includes('รักษิต หนองบัว คือใคร')) {
        responseKey = 'whoIsRaksit';
      } else if (aliasedMessage.includes('what are his skills') || aliasedMessage.includes('ทักษะ')) {
        responseKey = 'skills';
        isSkillsResponse = true;
      } else if (aliasedMessage.includes('tell me about his experience') || aliasedMessage.includes('ประสบการณ์')) {
        responseKey = 'experience';
      } else if (aliasedMessage.includes('how can i contact') || aliasedMessage.includes('ติดต่อ')) {
        responseKey = 'contact';
      }
      
      if (responseKey) {
        return {
          content: this.getLocalizedResponse(responseKey, language, translations),
          suggestions: this.getSuggestions(translations),
          isSkillsResponse
        };
      }
      
      // Default response with localized content
      return {
        content: translations.chat?.default || 'I can help you learn more about Raksit Nongbua.',
        suggestions: this.getSuggestions(translations)
      };
    }
    
    // Fallback to default English responses if no translations provided
    return {
      content: `🤖 I'm tantolio, presenting Raksit Nongbua's portfolio. I can help you learn more about his background, skills, and projects. Try asking one of the questions below! 🚀`,
      suggestions: [
        "Who is Raksit Nongbua?",
        "His work experience and education",
        "His skill and tech stack knowledge",
        "His contact"
      ]
    };
  }

  static getWelcomeMessage(language: 'en' | 'th' = 'en', translations?: TranslationMessages): ChatResponse {
    if (translations && translations.chat?.welcome) {
      return {
        content: translations.chat.welcome,
        suggestions: this.getSuggestions(translations)
      };
    }
    
    // Fallback to default messages
    const welcomeMessages = {
      en: `👋 Welcome to Raksit's interactive portfolio! I'm tantolio, your personal assistant that can tell you all about Raksit Nongbua's background, skills, and projects. 🚀

🎮 Fun fact: Raksit loves playing games! Start by asking me "Who is Raksit Nongbua?" or choose from the suggestions below.`,
      th: `👋 ยินดีต้อนรับสู่ผลงานแบบโต้ตอบของรักษิต! ฉันคือ tantolio ผู้ช่วยส่วนตัวของคุณที่สามารถบอกทุกอย่างเกี่ยวกับประวัติ ทักษะ และโปรเจคของรักษิต หนองบัว 🚀

🎮 ข้อมูลน่ารู้: รักษิตชอบเล่นเกม! เริ่มต้นด้วยการถามฉัน "รักษิต หนองบัว คือใคร?" หรือเลือกจากข้อเสนอแนะด้านล่าง`
    };
    
    return {
      content: welcomeMessages[language],
      suggestions: [
        "Who is Raksit Nongbua?",
        "His work experience and education",
        "His skill and tech stack knowledge",
        "His contact"
      ]
    };
  }
}