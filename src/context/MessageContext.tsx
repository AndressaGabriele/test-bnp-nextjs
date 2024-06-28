// context/MessageContext.tsx
import ErrorPopUp from '@/components/ErrorPopUp';
import SuccessPopup from '@/components/SuccessPopUp';
import React, { createContext, useContext, useState, ReactNode } from 'react';


type MessageType = {
  id: string;
  type: 'success' | 'error';
  message: string;
};

interface MessageContextType {
  messages: Array<MessageType>;
  addMessage: (message: MessageType) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const MessageProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Array<MessageType>>([]);

  const addMessage = (message: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setTimeout(() => {
      setMessages((prevMessages) => prevMessages.filter((m) => m.id !== message.id));
    }, 3000);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
      {messages.map((message) =>
        message.type === 'success' ? (
          <SuccessPopup
            key={message.id}
            message={message.message}
            onClose={() => {
              setMessages((prevMessages) => prevMessages.filter((m) => m.id !== message.id));
            }}
          />
        ) : (
          <ErrorPopUp
            key={message.id}
            message={message.message}
            onClose={() => {
              setMessages((prevMessages) => prevMessages.filter((m) => m.id !== message.id));
            }}
          />
        )
      )}
    </MessageContext.Provider>
  );
};
