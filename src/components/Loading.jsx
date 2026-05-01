export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 shadow-sm"></div>
            <p className="text-blue-600 font-bold text-lg tracking-wider animate-pulse">Menyiapkan Mesin Cuci...</p>
        </div>
    );
}