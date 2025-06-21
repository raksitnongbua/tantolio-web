/**
 * Function to split long messages into multiple parts for better readability
 * @param content - The message content to split
 * @returns Array of message parts
 */
export function splitLongMessage(content: string): string[] {
  // Split by double newlines (paragraph breaks) first
  const paragraphs = content.split('\n\n');
  
  // If only one paragraph and it's not too long, return as is
  if (paragraphs.length === 1 && content.length <= 300) {
    return [content];
  }
  
  const messages: string[] = [];
  let currentMessage = '';
  
  for (const paragraph of paragraphs) {
    // If adding this paragraph would make the message too long, start a new message
    if (currentMessage && (currentMessage + '\n\n' + paragraph).length > 300) {
      messages.push(currentMessage.trim());
      currentMessage = paragraph;
    } else {
      currentMessage = currentMessage ? currentMessage + '\n\n' + paragraph : paragraph;
    }
  }
  
  // Add the last message if there's content
  if (currentMessage.trim()) {
    messages.push(currentMessage.trim());
  }
  
  return messages.length > 0 ? messages : [content];
}

/**
 * Calculate reading time for a message to simulate natural conversation flow
 * @param message - The message to calculate reading time for
 * @returns Reading time in milliseconds
 */
export function calculateReadingTime(message: string): number {
  // Count words in message (more accurate than character count)
  const wordCount = message.trim().split(/\s+/).length;
  // Average human reading speed: ~250 words per minute (4.2 words per second)
  // For chat UX: faster pace at ~6-8 words per second = 125-167ms per word
  // Using 150ms per word for optimal balance of speed and readability
  return Math.max(500, wordCount * 150); // 150ms per word, minimum 0.5 second
}

/**
 * Generate a random AI thinking delay for more natural feel
 * @returns Delay in milliseconds
 */
export function generateThinkingDelay(): number {
  // Reduced thinking time for better UX - quick response like modern chat
  return Math.random() * 300 + 200; // 200ms to 500ms (much faster)
}

/**
 * Calculate typing delay to simulate realistic typing speed
 * @param message - The message being typed
 * @returns Typing delay in milliseconds
 */
export function calculateTypingDelay(message: string): number {
  // Average typing speed: 40-60 WPM for casual typing
  // For AI simulation: faster at ~80 WPM = 1.33 words per second = 750ms per word
  const wordCount = message.trim().split(/\s+/).length;
  return Math.max(300, wordCount * 100); // 100ms per word for typing effect
}