import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkdownRenderer } from '../markdown-renderer'

describe('MarkdownRenderer', () => {
  it('should render plain text content', () => {
    render(<MarkdownRenderer content="Hello world" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('should render bold text with markdown syntax', () => {
    render(<MarkdownRenderer content="This is **bold text**" />)
    expect(screen.getByText('bold text')).toBeInTheDocument()
    expect(screen.getByText('bold text').tagName).toBe('STRONG')
  })

  it('should render markdown links correctly', () => {
    render(<MarkdownRenderer content="Visit [Google](https://google.com)" />)
    
    const link = screen.getByRole('link', { name: 'Google' })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('https://google.com')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('should handle company links like Bitkub', () => {
    const content = '🟢 **Bitkub Online Co., Ltd.** ([bitkub.com](https://www.bitkub.com/))'
    render(<MarkdownRenderer content={content} />)
    
    const link = screen.getByRole('link', { name: 'bitkub.com' })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('https://www.bitkub.com/')
  })

  it('should handle company links like ProGaming', () => {
    const content = '🎮 **ProGaming Co., Ltd.** ([progaming.co.th](https://www.progaming.co.th/))'
    render(<MarkdownRenderer content={content} />)
    
    const link = screen.getByRole('link', { name: 'progaming.co.th' })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('https://www.progaming.co.th/')
  })

  it('should handle multiple links in content', () => {
    const content = 'Check out [Google](https://google.com) and [GitHub](https://github.com)'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByRole('link', { name: 'Google' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  })

  it('should handle mixed markdown formatting', () => {
    const content = 'This has **bold text** and a [link](https://example.com) together'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByText('bold text')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument()
  })

  it('should handle content with emojis', () => {
    const content = '🚀 This is **exciting** content with [links](https://example.com) 🎉'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByText(/🚀.*🎉/)).toBeInTheDocument()
    expect(screen.getByText('exciting')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'links' })).toBeInTheDocument()
  })

  it('should handle empty content', () => {
    render(<MarkdownRenderer content="" />)
    // Should not throw error and render empty div
    expect(document.querySelector('div')).toBeInTheDocument()
  })

  it('should handle content with only whitespace', () => {
    const { container } = render(<MarkdownRenderer content="   " />)
    // Whitespace content gets rendered as a br tag
    expect(container.querySelector('br')).toBeInTheDocument()
  })

  it('should handle content without markdown', () => {
    const plainContent = 'This is just plain text without any markdown formatting'
    render(<MarkdownRenderer content={plainContent} />)
    expect(screen.getByText(plainContent)).toBeInTheDocument()
  })

  it('should handle malformed markdown gracefully', () => {
    const malformedContent = 'This has **incomplete bold and [incomplete link'
    render(<MarkdownRenderer content={malformedContent} />)
    expect(screen.getByText(malformedContent)).toBeInTheDocument()
  })

  it('should handle special characters in links', () => {
    const content = 'Visit [Test & Co.](https://example.com/test?param=value&other=123)'
    render(<MarkdownRenderer content={content} />)
    
    const link = screen.getByRole('link', { name: 'Test & Co.' })
    expect(link.getAttribute('href')).toBe('https://example.com/test?param=value&other=123')
  })

  it('should handle nested markdown patterns', () => {
    const content = '**Bold with [link inside](https://example.com) text**'
    render(<MarkdownRenderer content={content} />)
    
    // The current implementation processes non-overlapping patterns first
    // So either bold or link will be processed, but not both in nested form
    const boldText = screen.getByText('Bold with [link inside](https://example.com) text')
    expect(boldText).toBeInTheDocument()
  })

  it('should prevent duplicate content rendering', () => {
    // Test the specific issue that was fixed - overlapping regex patterns
    const content = 'Bitkub Online Co., Ltd. (bitkub.com) - [bitkub.com](https://www.bitkub.com/)'
    render(<MarkdownRenderer content={content} />)
    
    // Should only have one clickable link, not duplicated content
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0].getAttribute('href')).toBe('https://www.bitkub.com/')
  })

  it('should handle line breaks in content', () => {
    const content = 'First line\n\nSecond line with **bold**\n\nThird line with [link](https://example.com)'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByText('First line')).toBeInTheDocument()
    expect(screen.getByText('bold')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument()
  })

  it('should sanitize dangerous HTML', () => {
    const dangerousContent = 'Hello <script>alert("xss")</script> world'
    render(<MarkdownRenderer content={dangerousContent} />)
    
    // Should render the text but not execute the script
    expect(screen.getByText(/Hello.*world/)).toBeInTheDocument()
    expect(document.querySelector('script')).not.toBeInTheDocument()
  })

  it('should handle very long content', () => {
    const longContent = 'A'.repeat(1000) + ' with **bold** and [link](https://example.com)'
    render(<MarkdownRenderer content={longContent} />)
    
    expect(screen.getByText('bold')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument()
  })

  it('should maintain accessibility attributes on links', () => {
    render(<MarkdownRenderer content="Visit [External Site](https://example.com)" />)
    
    const link = screen.getByRole('link', { name: 'External Site' })
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })
})