export default function SelectField({ label, name, value, onChange, options, error }) {
    return (
      <div className="mb-3">
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-2 border rounded focus:ring-2 focus:outline-none ${
            error ? "border-red-500 focus:ring-red-300 bg-red-50" : "border-gray-300 focus:ring-blue-500"
          }`}
        >
          <option value="">-- Pilih {label} --</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>{opt}</option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm font-semibold">{error}</span>}
      </div>
    );
  }