'use client';

import { useLocale } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { CalendlyLink } from '@/components/calendly/CalendlyLink';

const SYSTEM_CONTEXT = `You are a helpful assistant for Dr. Jan Duffy, a divorce real estate specialist in Las Vegas and Henderson, Nevada. You help visitors with questions about selling a home during divorce, property division, buyouts, refinancing, and related topics. Be professional, empathetic, and concise. For legal or tax advice, recommend consulting an attorney or tax professional. When visitors have situation-specific questions, encourage them to schedule a free 15-minute consultation with Dr. Jan Duffy—they can book online at calendly.com/drjanduffy or call (702) 500-1955.`;

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type AIChatWidgetProps = {
  className?: string;
};

export function AIChatWidget({ className = '' }: AIChatWidgetProps) {
  const locale = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageIdRef = useRef(0);
  const nextMessageId = useCallback(() => {
    messageIdRef.current += 1;
    return `chat-${messageIdRef.current}`;
  }, []);

  const apiPath = `/${locale}/api/ai/run`;

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userMessage: Message = { id: nextMessageId(), role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `${SYSTEM_CONTEXT}\n\nVisitor question: ${trimmed}`;

      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = data?.error ?? `Error ${res.status}`;
        setMessages(prev => [...prev, { id: nextMessageId(), role: 'assistant', content: `Sorry, I couldn't get a response: ${err}` }]);
        return;
      }

      const reply = typeof data.response === 'string' ? data.response : 'I could not generate a response.';
      setMessages(prev => [...prev, { id: nextMessageId(), role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        id: nextMessageId(),
        role: 'assistant',
        content: 'Something went wrong. Please try again or call (702) 500-1955 to speak with Dr. Jan Duffy.',
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, apiPath, nextMessageId]);

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`.trim()}>
      <div className="border-b border-gray-200 bg-blue-50 px-4 py-3">
        <h3 className="font-semibold text-gray-900">Divorce Real Estate Assistant</h3>
        <p className="text-sm text-gray-600">Ask about selling during divorce, property division, and more</p>
      </div>

      <div className="max-h-80 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500">Ask a question about divorce real estate in Las Vegas or Henderson.</p>
        )}
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`rounded-lg px-3 py-2 ${
              msg.role === 'user'
                ? 'ml-8 bg-blue-100 text-gray-900'
                : 'mr-8 bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="mr-8 rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-sm text-gray-500">Thinking...</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4">
        <p className="mb-3 text-center">
          <CalendlyLink className="text-sm font-medium text-blue-600 underline hover:text-blue-700">
            Schedule a free 15-minute call with Dr. Jan
          </CalendlyLink>
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your question..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
