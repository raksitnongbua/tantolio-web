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
  // Average reading speed: ~200-250 words per minute (3.3-4.2 words per second)
  // Using faster speed for better UX: ~5 words per second = 200ms per word
  return Math.max(1000, wordCount * 200); // 200ms per word, minimum 1 second
}

/**
 * Generate a random AI thinking delay for more natural feel
 * @returns Delay in milliseconds
 */
export function generateThinkingDelay(): number {
  return Math.random() * 1000 + 800; // 800ms to 1800ms
}