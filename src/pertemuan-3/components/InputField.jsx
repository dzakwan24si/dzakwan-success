export default function InputField({ label, type, name, value, onChange, placeholder, error }) {
    return (
      <div className="mb-3">
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded focus:ring-2 focus:outline-none ${
            error ? "border-red-500 focus:ring-red-300 bg-red-50" : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {/* Conditional Rendering untuk Error */}
        {error && <span className="text-red-500 text-sm font-semibold">{error}</span>}
      </div>
    );
  }