interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser }) => {
  return (
    <div className={`mb-2 p-3 rounded-md ${isUser ? 'bg-blue-600 text-white self-end' : 'bg-gray-700 text-gray-100 self-start'}`}>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default ChatMessage;