import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useChatState } from '../use-chat-state'

describe('useChatState', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useChatState())

    expect(result.current.inputValue).toBe('')
    expect(result.current.isTyping).toBe(false)
    expect(result.current.suggestions).toEqual([])
    expect(result.current.lastResponse).toBe(null)
    expect(result.current.isGenerating).toBe(false)
    expect(result.current.loadingSuggestion).toBe(null)
    expect(result.current.isInitialized).toBe(false)
    expect(result.current.activeTimeoutsRef.current).toEqual([])
    expect(result.current.inputRef.current).toBe(null)
  })

  it('should update inputValue', () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.setInputValue('test message')
    })

    expect(result.current.inputValue).toBe('test message')
  })

  it('should update isTyping state', () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.setIsTyping(true)
    })

    expect(result.current.isTyping).toBe(true)

    act(() => {
      result.current.setIsTyping(false)
    })

    expect(result.current.isTyping).toBe(false)
  })

  it('should update suggestions array', () => {
    const { result } = renderHook(() => useChatState())
    const testSuggestions = ['suggestion 1', 'suggestion 2', 'suggestion 3']

    act(() => {
      result.current.setSuggestions(testSuggestions)
    })

    expect(result.current.suggestions).toEqual(testSuggestions)
  })

  it('should update lastResponse with skills response flag', () => {
    const { result } = renderHook(() => useChatState())
    const testResponse = { isSkillsResponse: true }

    act(() => {
      result.current.setLastResponse(testResponse)
    })

    expect(result.current.lastResponse).toEqual(testResponse)
  })

  it('should update isGenerating state', () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.setIsGenerating(true)
    })

    expect(result.current.isGenerating).toBe(true)

    act(() => {
      result.current.setIsGenerating(false)
    })

    expect(result.current.isGenerating).toBe(false)
  })

  it('should update loadingSuggestion state', () => {
    const { result } = renderHook(() => useChatState())
    const testSuggestion = 'Loading suggestion...'

    act(() => {
      result.current.setLoadingSuggestion(testSuggestion)
    })

    expect(result.current.loadingSuggestion).toBe(testSuggestion)

    act(() => {
      result.current.setLoadingSuggestion(null)
    })

    expect(result.current.loadingSuggestion).toBe(null)
  })

  it('should update isInitialized state', () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.setIsInitialized(true)
    })

    expect(result.current.isInitialized).toBe(true)
  })

  it('should manage activeTimeouts array', () => {
    const { result } = renderHook(() => useChatState())

    // Add some mock timeouts
    act(() => {
      const timeout1 = setTimeout(() => {}, 1000)
      const timeout2 = setTimeout(() => {}, 2000)
      result.current.activeTimeoutsRef.current = [timeout1, timeout2]
    })

    expect(result.current.activeTimeoutsRef.current).toHaveLength(2)
  })

  it('should clear all timeouts when clearTimeouts is called', () => {
    const { result } = renderHook(() => useChatState())
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    // Add some mock timeouts
    act(() => {
      const timeout1 = setTimeout(() => {}, 1000)
      const timeout2 = setTimeout(() => {}, 2000)
      result.current.activeTimeoutsRef.current = [timeout1, timeout2]
    })

    expect(result.current.activeTimeoutsRef.current).toHaveLength(2)

    // Clear all timeouts
    act(() => {
      result.current.clearTimeouts()
    })

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(2)
    expect(result.current.activeTimeoutsRef.current).toEqual([])

    clearTimeoutSpy.mockRestore()
  })

  it('should handle empty timeouts array in clearTimeouts', () => {
    const { result } = renderHook(() => useChatState())
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    // Clear timeouts when array is empty
    act(() => {
      result.current.clearTimeouts()
    })

    expect(clearTimeoutSpy).not.toHaveBeenCalled()
    expect(result.current.activeTimeoutsRef.current).toEqual([])

    clearTimeoutSpy.mockRestore()
  })

  it('should maintain reference stability for refs', () => {
    const { result, rerender } = renderHook(() => useChatState())
    
    const initialInputRef = result.current.inputRef
    const initialActiveTimeoutsRef = result.current.activeTimeoutsRef

    // Re-render and check that refs are stable
    rerender()

    expect(result.current.inputRef).toBe(initialInputRef)
    expect(result.current.activeTimeoutsRef).toBe(initialActiveTimeoutsRef)
    // clearTimeouts function is created fresh each time (inline function)
    expect(typeof result.current.clearTimeouts).toBe('function')
  })

  it('should handle complex state updates', () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.setInputValue('Hello')
      result.current.setIsTyping(true)
      result.current.setSuggestions(['suggestion 1', 'suggestion 2'])
      result.current.setIsGenerating(true)
      result.current.setIsInitialized(true)
      result.current.setLastResponse({ isSkillsResponse: false })
      result.current.setLoadingSuggestion('Loading...')
    })

    expect(result.current.inputValue).toBe('Hello')
    expect(result.current.isTyping).toBe(true)
    expect(result.current.suggestions).toEqual(['suggestion 1', 'suggestion 2'])
    expect(result.current.isGenerating).toBe(true)
    expect(result.current.isInitialized).toBe(true)
    expect(result.current.lastResponse).toEqual({ isSkillsResponse: false })
    expect(result.current.loadingSuggestion).toBe('Loading...')
  })

  it('should handle null values correctly', () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.setLastResponse(null)
      result.current.setLoadingSuggestion(null)
    })

    expect(result.current.lastResponse).toBe(null)
    expect(result.current.loadingSuggestion).toBe(null)
  })
})