import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { TypingIndicator } from '../typing-indicator'

describe('TypingIndicator', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render typing indicator', () => {
    const { container } = render(<TypingIndicator />)
    
    expect(container.querySelector('.animate-bounce')).toBeInTheDocument()
  })

  it('should render with proper structure', () => {
    const { container } = render(<TypingIndicator />)
    
    expect(container.querySelector('.flex.gap-3')).toBeInTheDocument()
    expect(container.querySelector('.bg-muted\\/80')).toBeInTheDocument()
  })

  it('should have animated dots', () => {
    const { container } = render(<TypingIndicator />)
    
    const dots = container.querySelectorAll('.animate-bounce')
    expect(dots).toHaveLength(3)
    
    // Check that each dot has animation classes
    dots.forEach(dot => {
      expect(dot.className).toContain('animate-bounce')
    })
  })

  it('should have proper styling classes', () => {
    const { container } = render(<TypingIndicator />)
    
    const mainContainer = container.querySelector('.flex.gap-3')
    expect(mainContainer?.className).toContain('flex')
    expect(mainContainer?.className).toContain('gap-3')
    expect(mainContainer?.className).toContain('items-start')
  })

  it('should have staggered animation delays on dots', () => {
    const { container } = render(<TypingIndicator />)
    
    const dots = container.querySelectorAll('.animate-bounce')
    
    // Check that dots have different animation delays
    expect(dots[0].getAttribute('style')).toBe(null)
    expect(dots[1].getAttribute('style')).toContain('0.1s')
    expect(dots[2].getAttribute('style')).toContain('0.2s')
  })

  it('should maintain correct structure', () => {
    const { container } = render(<TypingIndicator />)
    
    const mainContainer = container.querySelector('.flex.gap-3')
    const dotsContainer = container.querySelector('.flex.space-x-1')
    
    expect(mainContainer).toBeInTheDocument()
    expect(dotsContainer).toBeInTheDocument()
    expect(dotsContainer?.children).toHaveLength(3)
  })

  it('should have correct dot styling', () => {
    const { container } = render(<TypingIndicator />)
    
    const dots = container.querySelectorAll('.animate-bounce')
    
    dots.forEach(dot => {
      expect(dot.className).toContain('w-2')
      expect(dot.className).toContain('h-2')
      expect(dot.className).toContain('bg-current')
      expect(dot.className).toContain('rounded-full')
      expect(dot.className).toContain('animate-bounce')
    })
  })

  it('should have background styling', () => {
    const { container } = render(<TypingIndicator />)
    
    const bgContainer = container.querySelector('.bg-muted\\/80')
    expect(bgContainer).toBeInTheDocument()
    expect(bgContainer?.className).toContain('rounded-lg')
    expect(bgContainer?.className).toContain('p-3')
  })
})