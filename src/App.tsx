
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message, ChatState } from './types';
import { generateId } from './lib/utils';

const INITIAL_MESSAGE: Message = {
  id: generateId(),
  role: 'assistant',
  content: "Hello! I'm your AI assistant. How can I help you today?",
  timestamp: Date.now(),
};

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [INITIAL_MESSAGE],
    isLoading: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: 'This is a placeholder response. In a real app, this would be connected to an AI API.',
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Chat
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {state.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {state.isLoading && (
              <div className="flex items-center justify-start gap-2 text-gray-500 dark:text-gray-400">
                <div className="animate-bounce">●</div>
                <div className="animate-bounce [animation-delay:0.2s]">●</div>
                <div className="animate-bounce [animation-delay:0.4s]">●</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={state.isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;