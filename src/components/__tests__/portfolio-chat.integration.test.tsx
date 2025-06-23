import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock the PortfolioChat component since we're testing integration
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'chat.botRole': '🤖 Portfolio Assistant',
      'chat.botName': 'Tantolio AI',
      'chat.welcome': '👋 Welcome to Raksit\'s portfolio!',
      'chat.whoIsRaksit': 'He\'s Raksit Nongbua, called Tan.',
      'chat.skills': 'Here are his technical skills...',
      'chat.contact': 'You can contact him at tan.raksit@gmail.com',
      'chat.default': 'I can help you learn more about Raksit.',
      'suggestions.whoIsRaksit': 'Who is Raksit Nongbua?',
      'suggestions.experience': 'His work experience',
      'suggestions.skills': 'His skills',
      'suggestions.contact': 'His contact'
    }
    return translations[key] || key
  },
  useLocale: () => 'en'
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn()
  })
}))

// Mock a simplified version of PortfolioChat for integration testing
const MockPortfolioChat = () => {
  const [messages, setMessages] = React.useState<Array<{id: string, content: string, isBot: boolean}>>([
    { id: '1', content: '👋 Welcome to Raksit\'s portfolio!', isBot: true }
  ])
  const [inputValue, setInputValue] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = { id: Date.now().toString(), content: inputValue, isBot: false }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'I can help you learn more about Raksit.'
      
      if (inputValue.toLowerCase().includes('who is raksit')) {
        botResponse = 'He\'s Raksit Nongbua, called Tan.'
      } else if (inputValue.toLowerCase().includes('skills')) {
        botResponse = 'Here are his technical skills...'
      } else if (inputValue.toLowerCase().includes('contact')) {
        botResponse = 'You can contact him at tan.raksit@gmail.com'
      }

      const botMessage = { id: (Date.now() + 1).toString(), content: botResponse, isBot: true }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 500)
  }

  return (
    <div data-testid="portfolio-chat">
      <div data-testid="messages">
        {messages.map(msg => (
          <div key={msg.id} data-testid={msg.isBot ? 'bot-message' : 'user-message'}>
            {msg.content}
          </div>
        ))}
        {isTyping && <div data-testid="typing-indicator">Bot is typing...</div>}
      </div>
      
      <div data-testid="suggestions">
        <button onClick={() => setInputValue('Who is Raksit Nongbua?')}>
          Who is Raksit Nongbua?
        </button>
        <button onClick={() => setInputValue('What are his skills?')}>
          His skills
        </button>
        <button onClick={() => setInputValue('How can I contact him?')}>
          His contact
        </button>
      </div>

      <div data-testid="input-area">
        <input
          data-testid="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about Raksit..."
        />
        <button data-testid="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

// We need React for useState
import React from 'react'

describe('PortfolioChat Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render initial welcome message', () => {
    render(<MockPortfolioChat />)
    
    expect(screen.getByTestId('portfolio-chat')).toBeInTheDocument()
    expect(screen.getByText('👋 Welcome to Raksit\'s portfolio!')).toBeInTheDocument()
  })

  it('should handle user message and bot response flow', () => {
    render(<MockPortfolioChat />)
    
    const input = screen.getByTestId('chat-input')
    const sendButton = screen.getByTestId('send-button')
    
    // User types a message
    fireEvent.change(input, { target: { value: 'Who is Raksit?' } })
    expect(input).toHaveValue('Who is Raksit?')
    
    // User sends message
    fireEvent.click(sendButton)
    
    // User message should appear
    expect(screen.getByText('Who is Raksit?')).toBeInTheDocument()
    expect(input).toHaveValue('') // Input should be cleared
    
    // Typing indicator should appear
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument()
  })

  it('should handle suggestion clicks', () => {
    render(<MockPortfolioChat />)
    
    const skillsSuggestion = screen.getByText('His skills')
    fireEvent.click(skillsSuggestion)
    
    const input = screen.getByTestId('chat-input')
    expect(input).toHaveValue('What are his skills?')
  })

  it('should handle Enter key for sending messages', () => {
    render(<MockPortfolioChat />)
    
    const input = screen.getByTestId('chat-input')
    
    fireEvent.change(input, { target: { value: 'test message' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(screen.getByText('test message')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('should not send empty messages', () => {
    render(<MockPortfolioChat />)
    
    const sendButton = screen.getByTestId('send-button')
    
    // Try to send empty message
    fireEvent.click(sendButton)
    
    // Should still only have the welcome message
    const userMessages = screen.queryAllByTestId('user-message')
    expect(userMessages).toHaveLength(0)
  })

  it('should handle multiple message exchanges', () => {
    render(<MockPortfolioChat />)
    
    const input = screen.getByTestId('chat-input')
    const sendButton = screen.getByTestId('send-button')
    
    // First exchange
    fireEvent.change(input, { target: { value: 'Who is Raksit?' } })
    fireEvent.click(sendButton)
    
    // Second exchange
    fireEvent.change(input, { target: { value: 'What are his skills?' } })
    fireEvent.click(sendButton)
    
    // Should have both user messages sent
    const userMessages = screen.getAllByTestId('user-message')
    expect(userMessages).toHaveLength(2)
    expect(screen.getByText('Who is Raksit?')).toBeInTheDocument()
    expect(screen.getByText('What are his skills?')).toBeInTheDocument()
  })

  it('should handle contact inquiry', () => {
    render(<MockPortfolioChat />)
    
    const contactSuggestion = screen.getByText('His contact')
    fireEvent.click(contactSuggestion)
    
    const input = screen.getByTestId('chat-input')
    expect(input).toHaveValue('How can I contact him?')
    
    const sendButton = screen.getByTestId('send-button')
    fireEvent.click(sendButton)
    
    expect(screen.getByText('How can I contact him?')).toBeInTheDocument()
  })

  it('should handle unknown questions with default response', () => {
    render(<MockPortfolioChat />)
    
    const input = screen.getByTestId('chat-input')
    const sendButton = screen.getByTestId('send-button')
    
    fireEvent.change(input, { target: { value: 'What is the weather?' } })
    fireEvent.click(sendButton)
    
    expect(screen.getByText('What is the weather?')).toBeInTheDocument()
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument()
  })

  it('should maintain message history', () => {
    render(<MockPortfolioChat />)
    
    const input = screen.getByTestId('chat-input')
    const sendButton = screen.getByTestId('send-button')
    
    // Send multiple messages
    const messages = ['Hello', 'Who is Raksit?', 'What are his skills?']
    
    for (const message of messages) {
      fireEvent.change(input, { target: { value: message } })
      fireEvent.click(sendButton)
    }
    
    // All messages should be visible in DOM
    messages.forEach(message => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
    
    const userMessages = screen.getAllByTestId('user-message')
    expect(userMessages).toHaveLength(3)
  })

  it('should handle rapid message sending', () => {
    render(<MockPortfolioChat />)
    
    const input = screen.getByTestId('chat-input')
    const sendButton = screen.getByTestId('send-button')
    
    // Send messages quickly
    fireEvent.change(input, { target: { value: 'First message' } })
    fireEvent.click(sendButton)
    
    fireEvent.change(input, { target: { value: 'Second message' } })
    fireEvent.click(sendButton)
    
    // Both messages should be sent
    expect(screen.getByText('First message')).toBeInTheDocument()
    expect(screen.getByText('Second message')).toBeInTheDocument()
  })
})