import { describe, it, expect } from 'vitest'
import { portfolioData, type PortfolioData } from '../portfolio-data'

describe('portfolio-data', () => {
  describe('portfolioData structure', () => {
    it('should have correct personal information structure', () => {
      expect(portfolioData.personal).toBeDefined()
      expect(portfolioData.personal.name).toBe('Raksit Nongbua')
      expect(portfolioData.personal.nickname).toBe('Tan')
      expect(portfolioData.personal.title).toBe('Software Development Team Lead')
      expect(portfolioData.personal.company).toBe('Bitkub')
      expect(portfolioData.personal.location).toBe('Thailand')
      expect(portfolioData.personal.email).toBe('tan.raksit@gmail.com')
      expect(portfolioData.personal.bio).toBeDefined()
      expect(typeof portfolioData.personal.bio).toBe('string')
      expect(portfolioData.personal.bio.length).toBeGreaterThan(50)
    })

    it('should have comprehensive skills structure', () => {
      expect(portfolioData.skills).toBeDefined()
      expect(Array.isArray(portfolioData.skills.frontend)).toBe(true)
      expect(Array.isArray(portfolioData.skills.backend)).toBe(true)
      expect(Array.isArray(portfolioData.skills.database)).toBe(true)
      expect(Array.isArray(portfolioData.skills.authentication)).toBe(true)
      expect(Array.isArray(portfolioData.skills.tools)).toBe(true)
      expect(Array.isArray(portfolioData.skills.specializations)).toBe(true)
    })

    it('should have valid frontend skills', () => {
      const { frontend } = portfolioData.skills
      expect(frontend).toContain('React')
      expect(frontend).toContain('Next.js')
      expect(frontend).toContain('TypeScript')
      expect(frontend).toContain('Tailwind CSS')
      expect(frontend.every(skill => typeof skill === 'string')).toBe(true)
      expect(frontend.length).toBeGreaterThan(5)
    })

    it('should have valid authentication skills', () => {
      const { authentication } = portfolioData.skills
      expect(authentication).toContain('OAuth 2.0')
      expect(authentication).toContain('Session Management')
      expect(authentication).toContain('JWT')
      expect(authentication).toContain('Bitkub-Auth')
      expect(authentication.every(skill => typeof skill === 'string')).toBe(true)
    })

    it('should have valid projects structure', () => {
      expect(Array.isArray(portfolioData.projects)).toBe(true)
      expect(portfolioData.projects.length).toBeGreaterThan(0)
      
      portfolioData.projects.forEach(project => {
        expect(project.name).toBeDefined()
        expect(typeof project.name).toBe('string')
        expect(project.description).toBeDefined()
        expect(typeof project.description).toBe('string')
        expect(Array.isArray(project.technologies)).toBe(true)
        expect(project.status).toBeDefined()
        expect(typeof project.status).toBe('string')
      })
    })

    it('should have Bitkub authentication project', () => {
      const authProject = portfolioData.projects.find(
        project => project.name === 'Bitkub Authentication System'
      )
      expect(authProject).toBeDefined()
      expect(authProject?.technologies).toContain('OAuth 2.0')
      expect(authProject?.technologies).toContain('Micro Frontend')
      expect(authProject?.technologies).toContain('Domain-Driven Design')
      expect(authProject?.status).toBe('Ongoing')
    })

    it('should have valid experience structure', () => {
      expect(Array.isArray(portfolioData.experience)).toBe(true)
      expect(portfolioData.experience.length).toBeGreaterThan(0)
      
      portfolioData.experience.forEach(exp => {
        expect(exp.company).toBeDefined()
        expect(typeof exp.company).toBe('string')
        expect(exp.position).toBeDefined()
        expect(typeof exp.position).toBe('string')
        expect(exp.period).toBeDefined()
        expect(typeof exp.period).toBe('string')
        expect(exp.description).toBeDefined()
        expect(typeof exp.description).toBe('string')
        expect(exp.website).toBeDefined()
        expect(typeof exp.website).toBe('string')
        expect(exp.logo).toBeDefined()
        expect(typeof exp.logo).toBe('string')
      })
    })

    it('should have current Bitkub team lead position', () => {
      const currentPosition = portfolioData.experience[0]
      expect(currentPosition.company).toBe('Bitkub Online Co., Ltd.')
      expect(currentPosition.position).toBe('Software Development Team Lead')
      expect(currentPosition.period).toBe('2024 - Present')
      expect(currentPosition.website).toBe('https://www.bitkub.com/')
    })

    it('should have chronological work experience', () => {
      const bitkubPositions = portfolioData.experience.filter(
        exp => exp.company === 'Bitkub Online Co., Ltd.'
      )
      expect(bitkubPositions.length).toBe(3)
      
      // Check progression: Team Lead -> Senior -> Junior
      expect(bitkubPositions[0].position).toBe('Software Development Team Lead')
      expect(bitkubPositions[1].position).toBe('Senior Frontend Developer')
      expect(bitkubPositions[2].position).toBe('Junior Frontend Developer')
    })

    it('should have ProGaming experience', () => {
      const progamingExp = portfolioData.experience.find(
        exp => exp.company === 'ProGaming Co., Ltd.'
      )
      expect(progamingExp).toBeDefined()
      expect(progamingExp?.position).toBe('Web Developer & Game Developer')
      expect(progamingExp?.period).toBe('2016 - 2021')
      expect(progamingExp?.website).toBe('https://www.progaming.co.th/')
    })

    it('should have valid education structure', () => {
      expect(Array.isArray(portfolioData.education)).toBe(true)
      expect(portfolioData.education.length).toBeGreaterThan(0)
      
      portfolioData.education.forEach(edu => {
        expect(edu.school).toBeDefined()
        expect(typeof edu.school).toBe('string')
        expect(edu.degree).toBeDefined()
        expect(typeof edu.degree).toBe('string')
        expect(edu.period).toBeDefined()
        expect(typeof edu.period).toBe('string')
      })
    })

    it('should have computer game multimedia degree', () => {
      const degree = portfolioData.education[0]
      expect(degree.degree).toBe("Bachelor's in Computer Game Multimedia")
      expect(degree.period).toBe('2016 - 2020')
    })
  })

  describe('data validation', () => {
    it('should have valid email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(emailRegex.test(portfolioData.personal.email)).toBe(true)
    })

    it('should have valid website URLs', () => {
      const urlRegex = /^https?:\/\/.+/
      portfolioData.experience.forEach(exp => {
        expect(urlRegex.test(exp.website)).toBe(true)
      })
    })

    it('should have consistent period formats', () => {
      const periodRegex = /^\d{4}\s*-\s*(\d{4}|Present)$/
      portfolioData.experience.forEach(exp => {
        expect(periodRegex.test(exp.period)).toBe(true)
      })
      portfolioData.education.forEach(edu => {
        expect(periodRegex.test(edu.period)).toBe(true)
      })
    })

    it('should have non-empty descriptions', () => {
      portfolioData.projects.forEach(project => {
        expect(project.description.length).toBeGreaterThan(20)
      })
      portfolioData.experience.forEach(exp => {
        expect(exp.description.length).toBeGreaterThan(50)
      })
    })

    it('should have proper TypeScript typing', () => {
      // Type check that portfolioData matches PortfolioData type
      const data: PortfolioData = portfolioData
      expect(data).toBeDefined()
    })
  })

  describe('content quality', () => {
    it('should have technical skills relevant to current role', () => {
      const allSkills = [
        ...portfolioData.skills.frontend,
        ...portfolioData.skills.backend,
        ...portfolioData.skills.authentication,
        ...portfolioData.skills.specializations
      ]
      
      expect(allSkills).toContain('React')
      expect(allSkills).toContain('TypeScript')
      expect(allSkills).toContain('OAuth 2.0')
      expect(allSkills).toContain('Design Systems')
      expect(allSkills).toContain('Team Leadership')
    })

    it('should mention key technologies in project descriptions', () => {
      const authProject = portfolioData.projects.find(
        project => project.name === 'Bitkub Authentication System'
      )
      expect(authProject?.description).toContain('OAuth 2.0')
      expect(authProject?.description).toContain('micro frontend')
      expect(authProject?.description).toContain('Domain-Driven Design')
    })

    it('should have progression in career timeline', () => {
      const bitkubExperience = portfolioData.experience.filter(
        exp => exp.company === 'Bitkub Online Co., Ltd.'
      )
      
      // Should show progression from Junior -> Senior -> Team Lead
      expect(bitkubExperience.length).toBe(3)
      expect(bitkubExperience[0].position).toContain('Team Lead')
      expect(bitkubExperience[1].position).toContain('Senior')
      expect(bitkubExperience[2].position).toContain('Junior')
    })

    it('should have consistent company branding', () => {
      const bitkubExperience = portfolioData.experience.filter(
        exp => exp.company === 'Bitkub Online Co., Ltd.'
      )
      
      bitkubExperience.forEach(exp => {
        expect(exp.website).toBe('https://www.bitkub.com/')
        expect(exp.logo).toBe('/bitkub.jpg')
      })
    })
  })
})