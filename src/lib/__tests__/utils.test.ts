import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-2 py-1', 'text-sm')
      expect(result).toBe('px-2 py-1 text-sm')
    })

    it('should handle conflicting Tailwind classes', () => {
      const result = cn('px-2 px-4', 'py-1 py-2')
      expect(result).toBe('px-4 py-2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'ignored-class')
      expect(result).toBe('base-class conditional-class')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['px-2', 'py-1'], 'text-sm')
      expect(result).toBe('px-2 py-1 text-sm')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        'px-2': true,
        'py-1': false,
        'text-sm': true
      })
      expect(result).toBe('px-2 text-sm')
    })

    it('should handle empty inputs', () => {
      expect(cn()).toBe('')
      expect(cn('')).toBe('')
      expect(cn(null, undefined, false)).toBe('')
    })

    it('should resolve Tailwind class conflicts correctly', () => {
      // Test margin conflicts
      expect(cn('m-1', 'm-2')).toBe('m-2')
      
      // Test padding conflicts
      expect(cn('p-1', 'px-2')).toBe('p-1 px-2')
      expect(cn('px-1', 'px-2')).toBe('px-2')
      
      // Test background color conflicts
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    })

    it('should handle complex class combinations', () => {
      const result = cn(
        'flex items-center justify-center',
        'px-4 py-2',
        'bg-blue-500 hover:bg-blue-600',
        'text-white font-medium',
        'rounded-md transition-colors'
      )
      expect(result).toContain('flex')
      expect(result).toContain('items-center')
      expect(result).toContain('justify-center')
      expect(result).toContain('px-4')
      expect(result).toContain('py-2')
      expect(result).toContain('bg-blue-500')
      expect(result).toContain('hover:bg-blue-600')
    })
  })
})