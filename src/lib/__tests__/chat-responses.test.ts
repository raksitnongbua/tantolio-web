import { describe, it, expect } from 'vitest';
import { PortfolioChatBot } from '../chat-responses';
import type { TranslationMessages } from '@/types/chat';

describe('chat-responses', () => {
  const mockTranslations: TranslationMessages = {
    chat: {
      botRole: '🤖 Portfolio Assistant',
      botName: 'Tantolio AI',
      welcome: "👋 Welcome to Raksit's portfolio!",
      whoIsRaksit:
        "He's {name}, called {nickname}, working as {title} at {company} in {location}.",
      skills: 'Here are his technical skills...',
      workExperience: '💼 **Detailed Professional Experience**...',
      experience: 'His professional experience...',
      contact: 'You can contact him at {email} in {location}.',
      default: 'I can help you learn more about Raksit Nongbua.',
    },
    suggestions: {
      whoIsRaksit: 'Who is Raksit Nongbua?',
      experience: 'His work experience and education',
      skills: 'His skill and tech stack knowledge',
      contact: 'His contact',
    },
  };

  describe('PortfolioChatBot.getResponse', () => {
    it('should handle "who is raksit" question', () => {
      const response = PortfolioChatBot.getResponse(
        'who is raksit nongbua',
        'en',
        mockTranslations
      );

      expect(response.content).toContain('Raksit Nongbua');
      expect(response.content).toContain('Tan');
      expect(response.content).toContain('Software Development Team Lead');
      expect(response.content).toContain('Bitkub');
      expect(response.content).toContain('Thailand');
      expect(response.suggestions).toBeDefined();
      expect(Array.isArray(response.suggestions)).toBe(true);
    });

    it('should handle skills question', () => {
      const response = PortfolioChatBot.getResponse(
        'what are his skills',
        'en',
        mockTranslations
      );

      expect(response.content).toBe('Here are his technical skills...');
      expect(response.isSkillsResponse).toBe(true);
      expect(response.suggestions).toBeDefined();
    });

    it('should handle detailed work experience question', () => {
      const response = PortfolioChatBot.getResponse(
        'tell me about his detailed work experience',
        'en',
        mockTranslations
      );

      expect(response.content).toBe(
        '💼 **Detailed Professional Experience**...'
      );
      expect(response.suggestions).toBeDefined();
    });

    it('should handle general experience question', () => {
      const response = PortfolioChatBot.getResponse(
        'tell me about his experience',
        'en',
        mockTranslations
      );

      expect(response.content).toContain('professional experience');
      expect(response.content).toContain('Software Development Team Lead');
      expect(response.content).toContain('Bitkub Online Co., Ltd.');
      expect(response.content).toContain('Educational Background');
    });

    it('should handle contact question', () => {
      const response = PortfolioChatBot.getResponse(
        'how can i contact him',
        'en',
        mockTranslations
      );

      expect(response.content).toContain('tan.raksit@gmail.com');
      expect(response.content).toContain('Thailand');
      expect(response.suggestions).toBeDefined();
    });

    it('should handle default/unknown questions', () => {
      const response = PortfolioChatBot.getResponse(
        'random question',
        'en',
        mockTranslations
      );

      expect(response.content).toBe(
        'I can help you learn more about Raksit Nongbua.'
      );
      expect(response.suggestions).toBeDefined();
    });

    it('should return fallback response without translations', () => {
      const response = PortfolioChatBot.getResponse('who is raksit');

      expect(response.content).toContain('tantolio');
      expect(response.content).toContain('Raksit Nongbua');
      expect(response.suggestions).toEqual([
        'Who is Raksit Nongbua?',
        'His work experience and education',
        'His skill and tech stack knowledge',
        'His contact',
      ]);
    });
  });

  describe('PortfolioChatBot aliases', () => {
    it('should handle "your" to "his" aliases', () => {
      const response1 = PortfolioChatBot.getResponse(
        'what are your skills',
        'en',
        mockTranslations
      );
      const response2 = PortfolioChatBot.getResponse(
        'what are his skills',
        'en',
        mockTranslations
      );

      expect(response1.content).toBe(response2.content);
      expect(response1.isSkillsResponse).toBe(true);
    });

    it('should handle experience aliases', () => {
      const aliases = [
        'work experience',
        'your experience',
        'his experience',
        'tell me about his experience',
      ];

      aliases.forEach((alias) => {
        const response = PortfolioChatBot.getResponse(
          alias,
          'en',
          mockTranslations
        );
        expect(response.content).toContain('professional experience');
      });
    });

    it('should handle contact aliases', () => {
      const aliases = [
        'contact',
        'how can i contact you',
        'how can i contact him',
        'his contact',
      ];

      aliases.forEach((alias) => {
        const response = PortfolioChatBot.getResponse(
          alias,
          'en',
          mockTranslations
        );
        expect(response.content).toContain('tan.raksit@gmail.com');
      });
    });

    it('should handle detailed work experience aliases', () => {
      const aliases = [
        'his detailed work experience',
        'detailed work experience',
        'tell me about his detailed work experience',
      ];

      aliases.forEach((alias) => {
        const response = PortfolioChatBot.getResponse(
          alias,
          'en',
          mockTranslations
        );
        expect(response.content).toBe(
          '💼 **Detailed Professional Experience**...'
        );
      });
    });

    it('should handle case insensitive matching', () => {
      const response1 = PortfolioChatBot.getResponse(
        'WHO IS RAKSIT NONGBUA',
        'en',
        mockTranslations
      );
      const response2 = PortfolioChatBot.getResponse(
        'who is raksit nongbua',
        'en',
        mockTranslations
      );

      expect(response1.content).toBe(response2.content);
    });

    it('should handle Thai aliases', () => {
      const thaiMockTranslations: TranslationMessages = {
        ...mockTranslations,
        chat: {
          ...mockTranslations.chat!,
          whoIsRaksit:
            'เขาคือ {name} เรียกว่า {nickname} ทำงานเป็น {title} ที่ {company} ใน {location}',
        },
      };

      const response = PortfolioChatBot.getResponse(
        'รักษิต หนองบัว คือใคร',
        'th',
        thaiMockTranslations
      );
      expect(response.content).toContain('Raksit Nongbua'); // Name is replaced as-is from portfolio data
      expect(response.content).toContain('Tan');
    });
  });

  describe('PortfolioChatBot.getWelcomeMessage', () => {
    it('should return welcome message with translations', () => {
      const welcome = PortfolioChatBot.getWelcomeMessage(
        'en',
        mockTranslations
      );

      expect(welcome.content).toBe("👋 Welcome to Raksit's portfolio!");
      expect(welcome.suggestions).toEqual([
        'Who is Raksit Nongbua?',
        'His work experience and education',
        'His skill and tech stack knowledge',
        'His contact',
      ]);
    });

    it('should return fallback English welcome message', () => {
      const welcome = PortfolioChatBot.getWelcomeMessage('en');

      expect(welcome.content).toContain(
        "Welcome to Raksit's interactive portfolio"
      );
      expect(welcome.content).toContain('tantolio');
      expect(welcome.content).toContain('playing games');
      expect(welcome.suggestions).toBeDefined();
    });

    it('should return fallback Thai welcome message', () => {
      const welcome = PortfolioChatBot.getWelcomeMessage('th');

      expect(welcome.content).toContain(
        'ยินดีต้อนรับสู่ผลงานแบบโต้ตอบของรักษิต'
      );
      expect(welcome.content).toContain('tantolio');
      expect(welcome.content).toContain('เล่นเกม');
      expect(welcome.suggestions).toBeDefined();
    });
  });

  describe('Error handling', () => {
    it('should handle malformed translations gracefully', () => {
      const badTranslations = {} as TranslationMessages;

      const response = PortfolioChatBot.getResponse(
        'who is raksit',
        'en',
        badTranslations
      );
      expect(response.content).toBeDefined();
      expect(response.suggestions).toBeDefined();
    });

    it('should handle missing chat object in translations', () => {
      const incompleteTranslations: TranslationMessages = {
        suggestions: mockTranslations.suggestions,
      };

      const response = PortfolioChatBot.getResponse(
        'who is raksit',
        'en',
        incompleteTranslations
      );
      expect(response.content).toBeDefined();
      expect(response.suggestions).toBeDefined();
    });

    it('should handle missing suggestions in translations', () => {
      const incompleteTranslations: TranslationMessages = {
        chat: mockTranslations.chat,
      };

      const response = PortfolioChatBot.getResponse(
        'who is raksit',
        'en',
        incompleteTranslations
      );
      expect(response.content).toBeDefined();
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions).toEqual([
        'Who is Raksit Nongbua?',
        'His work experience and education',
        'His skill and tech stack knowledge',
        'His contact',
      ]);
    });
  });

  describe('Response structure validation', () => {
    it('should always return valid ChatResponse structure', () => {
      const testMessages = [
        'who is raksit',
        'what are his skills',
        'his experience',
        'contact',
        'random question',
      ];

      testMessages.forEach((message) => {
        const response = PortfolioChatBot.getResponse(
          message,
          'en',
          mockTranslations
        );

        expect(response).toHaveProperty('content');
        expect(response).toHaveProperty('suggestions');
        expect(typeof response.content).toBe('string');
        expect(Array.isArray(response.suggestions)).toBe(true);
        expect(response.content.length).toBeGreaterThan(0);
        expect(response.suggestions?.length).toBeGreaterThan(0);
      });
    });

    it('should return suggestions as non-empty strings', () => {
      const response = PortfolioChatBot.getResponse(
        'test',
        'en',
        mockTranslations
      );

      response.suggestions?.forEach((suggestion) => {
        expect(typeof suggestion).toBe('string');
        expect(suggestion.length).toBeGreaterThan(0);
      });
    });
  });
});
