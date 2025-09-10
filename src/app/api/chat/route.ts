import { NextRequest, NextResponse } from 'next/server';
import { ChancyAI } from '@/lib/claude';
import { v4 as uuidv4 } from 'uuid';

const chancyAI = new ChancyAI();

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json();
    
    let state: any = {
      id: conversationId,
      messages: [],
      phase: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const result = await chancyAI.processMessage(message, state);
    
    return NextResponse.json({
      response: result.response,
      phase: result.phase
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}