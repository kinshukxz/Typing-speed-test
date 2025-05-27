const TypingBox = ({ text, input, onChange, disabled }) => {
  return (
    <div className="w-full max-w-xl text-center mb-6">
      <p className="mb-4 text-lg sm:text-xl break-words">{text}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-base sm:text-lg"
        placeholder="Start typing here..."
      />
    </div>
  );
};
export default TypingBox;