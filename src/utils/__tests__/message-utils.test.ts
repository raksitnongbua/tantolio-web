import { describe, it, expect } from 'vitest'
import {
  splitLongMessage,
  calculateReadingTime,
  generateThinkingDelay,
  calculateTypingDelay
} from '../message-utils'

describe('message-utils', () => {
  describe('splitLongMessage', () => {
    it('should return single message for short content', () => {
      const shortMessage = 'This is a short message.'
      const result = splitLongMessage(shortMessage)
      expect(result).toEqual([shortMessage])
    })

    it('should split long message into multiple parts at paragraph breaks', () => {
      // Create a message that will definitely exceed 300 characters when combined
      const part1 = 'First paragraph with some content that needs to be reasonably long to test the splitting functionality properly.'
      const part2 = 'Second paragraph with more content that makes this message longer and should trigger the split functionality when combined with other parts.'
      const part3 = 'Third paragraph with additional information that extends beyond the 300 character limit for sure and needs to be split into multiple messages for better readability and user experience in the chat interface.'
      const longMessage = `${part1}\n\n${part2}\n\n${part3}`
      
      const result = splitLongMessage(longMessage)
      expect(result.length).toBeGreaterThan(1)
      
      // Each result should either be under 300 chars OR be a single paragraph (no splits within paragraphs)
      result.forEach(msg => {
        const isShortEnough = msg.length <= 300
        const isSingleParagraph = !msg.includes('\n\n')
        expect(isShortEnough || isSingleParagraph).toBe(true)
      })
    })

    it('should handle content with no paragraph breaks', () => {
      const singleParagraph = 'This is a very long single paragraph without any double newlines that should be returned as is since there are no natural break points to split at and the content flows continuously without paragraph separation markers.'
      const result = splitLongMessage(singleParagraph)
      expect(result).toEqual([singleParagraph])
    })

    it('should handle empty string', () => {
      const result = splitLongMessage('')
      expect(result).toEqual([''])
    })

    it('should handle multiple short paragraphs', () => {
      const message = 'Short para 1.\n\nShort para 2.\n\nShort para 3.'
      const result = splitLongMessage(message)
      expect(result).toEqual([message])
    })

    it('should properly trim whitespace in split messages', () => {
      const message = '  First paragraph  \n\n  Second paragraph  \n\n  Third paragraph  '
      const result = splitLongMessage(message)
      result.forEach(msg => {
        expect(msg).toBe(msg.trim())
        expect(msg.startsWith(' ')).toBe(false)
        expect(msg.endsWith(' ')).toBe(false)
      })
    })

    it('should handle very long single paragraph gracefully', () => {
      const veryLongSingleParagraph = 'A'.repeat(1000)
      const result = splitLongMessage(veryLongSingleParagraph)
      expect(result).toEqual([veryLongSingleParagraph])
    })
  })

  describe('calculateReadingTime', () => {
    it('should calculate reading time for short message', () => {
      const message = 'Hello world'
      const readingTime = calculateReadingTime(message)
      expect(readingTime).toBe(500) // minimum 500ms
    })

    it('should calculate reading time for longer message', () => {
      const message = 'This is a longer message with multiple words to test the reading time calculation'
      const wordCount = message.trim().split(/\s+/).length
      const expectedTime = wordCount * 150
      const readingTime = calculateReadingTime(message)
      expect(readingTime).toBe(expectedTime)
    })

    it('should have minimum reading time of 500ms', () => {
      const shortMessage = 'Hi'
      const readingTime = calculateReadingTime(shortMessage)
      expect(readingTime).toBe(500)
    })

    it('should handle empty string', () => {
      const readingTime = calculateReadingTime('')
      expect(readingTime).toBe(500) // minimum 500ms
    })

    it('should handle single word', () => {
      const readingTime = calculateReadingTime('Hello')
      expect(readingTime).toBe(500) // 1 word * 150ms = 150ms, but minimum is 500ms
    })

    it('should calculate correctly for 10 words', () => {
      const message = 'one two three four five six seven eight nine ten'
      const readingTime = calculateReadingTime(message)
      expect(readingTime).toBe(1500) // 10 words * 150ms = 1500ms
    })

    it('should handle multiple spaces between words', () => {
      const message = 'word1    word2     word3'
      const readingTime = calculateReadingTime(message)
      expect(readingTime).toBe(500) // 3 words * 150ms = 450ms, minimum 500ms
    })
  })

  describe('generateThinkingDelay', () => {
    it('should generate delay within expected range', () => {
      const delays = Array.from({ length: 100 }, () => generateThinkingDelay())
      
      delays.forEach(delay => {
        expect(delay).toBeGreaterThanOrEqual(200)
        expect(delay).toBeLessThanOrEqual(500)
      })
    })

    it('should generate different values on multiple calls', () => {
      const delay1 = generateThinkingDelay()
      const delay2 = generateThinkingDelay()
      const delay3 = generateThinkingDelay()
      
      // With random generation, it's very unlikely all three will be identical
      const allSame = delay1 === delay2 && delay2 === delay3
      expect(allSame).toBe(false)
    })
  })

  describe('calculateTypingDelay', () => {
    it('should calculate typing delay for short message', () => {
      const message = 'Hi there'
      const typingDelay = calculateTypingDelay(message)
      expect(typingDelay).toBe(300) // 2 words * 100ms = 200ms, minimum 300ms
    })

    it('should calculate typing delay for longer message', () => {
      const message = 'This is a longer message with more words to type'
      const wordCount = message.trim().split(/\s+/).length
      const expectedDelay = wordCount * 100
      const typingDelay = calculateTypingDelay(message)
      expect(typingDelay).toBe(expectedDelay)
    })

    it('should have minimum typing delay of 300ms', () => {
      const shortMessage = 'Hi'
      const typingDelay = calculateTypingDelay(shortMessage)
      expect(typingDelay).toBe(300)
    })

    it('should handle empty string', () => {
      const typingDelay = calculateTypingDelay('')
      expect(typingDelay).toBe(300) // minimum 300ms
    })

    it('should calculate correctly for 10 words', () => {
      const message = 'one two three four five six seven eight nine ten'
      const typingDelay = calculateTypingDelay(message)
      expect(typingDelay).toBe(1000) // 10 words * 100ms = 1000ms
    })

    it('should handle whitespace-only message', () => {
      const message = '   '
      const typingDelay = calculateTypingDelay(message)
      expect(typingDelay).toBe(300) // minimum 300ms for empty content
    })
  })
})