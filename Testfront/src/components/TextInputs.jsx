const TextInput = ({ label, span2, ...otherOptions }) => {
  return (
    <div className={`flex flex-col ${span2 ? "col-span-2" : ""}`}>
      <label className="text-left mb-2 text-gray-500 font-bold text-base">
        {label}
      </label>
      <input
        {...otherOptions}
        className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
      />
    </div>
  );
};

export default TextInput;
