'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat from './components/Chat';
import PhaseIndicator from './components/PhaseIndicator';

export default function Home() {
  const [conversationId] = useState(() => uuidv4());
  const [messages, setMessages] = useState<any[]>([]);
  const [phase, setPhase] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          conversationId
        })
      });

      const data = await response.json();
      
      const assistantMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setPhase(data.phase);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Chancy.ai</h1>
          <p className="text-sm text-gray-600">
            Statistical Analysis for Informed Choices
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <PhaseIndicator currentPhase={phase} />
        <Chat
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          phase={phase}
        />
      </main>
    </div>
  );
}