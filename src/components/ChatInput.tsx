
import React, { useState, KeyboardEvent } from 'react';
import { IconSend } from '@tabler/icons-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 bg-white dark:bg-gray-900 p-4 border-t dark:border-gray-800">
      <textarea
        className="flex-1 resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        rows={1}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={disabled}
        style={{ minHeight: '44px', maxHeight: '200px' }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className={`p-2 rounded-lg ${
          disabled || !message.trim()
            ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
            : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'
        }`}
      >
        <IconSend size={20} />
      </button>
    </div>
  );
};