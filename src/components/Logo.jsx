export default function Logo({ size = "text-xl" }) {
    return (
      <div className={`font-black tracking-tight text-gray-800 ${size}`}>
        Kucek<span className="text-blue-500">.in</span>
      </div>
    );
  }