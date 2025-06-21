import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderContent = (text: string) => {
    // Split by lines to handle line breaks
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (line.trim() === '') {
        return <br key={lineIndex} />;
      }
      
      // Process inline formatting within each line
      const processedLine = processInlineFormatting(line);
      
      return (
        <div key={lineIndex} className="mb-1">
          {processedLine}
        </div>
      );
    });
  };
  
  const processInlineFormatting = (text: string) => {
    const parts: React.ReactNode[] = [];
    
    // Regex patterns for different markdown elements
    const patterns = [
      // Links: [text](url)
      {
        regex: /\[([^\]]+)\]\(([^)]+)\)/g,
        render: (match: RegExpMatchArray, key: number) => (
          <a
            key={key}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            {match[1]}
          </a>
        )
      },
      // Bold: **text**
      {
        regex: /\*\*([^*]+)\*\*/g,
        render: (match: RegExpMatchArray, key: number) => (
          <strong key={key} className="font-semibold">{match[1]}</strong>
        )
      },
      // Italic: *text*
      {
        regex: /\*([^*]+)\*/g,
        render: (match: RegExpMatchArray, key: number) => (
          <em key={key} className="italic">{match[1]}</em>
        )
      }
    ];
    
    // Find all matches and their positions
    const allMatches: Array<{
      match: RegExpMatchArray;
      start: number;
      end: number;
      render: (match: RegExpMatchArray, key: number) => React.ReactNode;
    }> = [];
    
    patterns.forEach(pattern => {
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        allMatches.push({
          match,
          start: match.index!,
          end: match.index! + match[0].length,
          render: pattern.render
        });
      }
    });
    
    // Sort matches by position and remove overlapping matches
    allMatches.sort((a, b) => a.start - b.start);
    
    // Remove overlapping matches (keep the first one)
    const nonOverlappingMatches = [];
    let lastEnd = 0;
    
    for (const match of allMatches) {
      if (match.start >= lastEnd) {
        nonOverlappingMatches.push(match);
        lastEnd = match.end;
      }
    }
    
    // Process the text with non-overlapping matches
    let lastIndex = 0;
    let keyCounter = 0;
    
    nonOverlappingMatches.forEach(({ match, start, end, render }) => {
      // Add text before the match
      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start));
      }
      
      // Add the rendered match
      parts.push(render(match, keyCounter++));
      
      lastIndex = end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };
  
  return (
    <div className="whitespace-pre-wrap leading-relaxed text-sm">
      {renderContent(content)}
    </div>
  );
}