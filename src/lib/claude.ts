import Anthropic from '@anthropic-ai/sdk';
import { CHANCY_SYSTEM_PROMPT } from './protocols';

export class ChancyAI {
  private anthropic: Anthropic;
  
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
  }

  async processMessage(userMessage: string, conversationState: any) {
    try {
      const messages = this.buildMessageHistory(conversationState, userMessage);
      
      const response = await this.anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 4000,
        system: CHANCY_SYSTEM_PROMPT,
        messages: messages
      });

      return this.parseResponse(response);
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to process message');
    }
  }

  private buildMessageHistory(state: any, currentMessage: string): any[] {
    const messages = [];
    
    state.messages.forEach((msg: any) => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    });
    
    messages.push({
      role: 'user',
      content: currentMessage
    });
    
    return messages;
  }

  private parseResponse(response: any) {
    const content = response.content[0].text;
    
    let phase = 1;
    if (content.includes("So you're asking:")) {
      phase = 2;
    } else if (content.includes("probability:") || content.includes("%")) {
      phase = 3;
    } else if (content.includes("research citations")) {
      phase = 4;
    }
    
    return {
      response: content,
      phase
    };
  }
}