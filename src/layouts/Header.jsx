import { FaBell, FaSearch, FaEnvelope } from "react-icons/fa";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100 z-10">
            {/* Search Bar ala Laundry */}
            <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                </div>
                <input
                    type="text"
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-700"
                    placeholder="Cari no resi atau nama pelanggan..."
                />
            </div>

            {/* Kumpulan Icon & Profile */}
            <div className="flex items-center space-x-6">
                {/* Notifikasi */}
                <div className="flex items-center space-x-3">
                    <button className="relative p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <FaEnvelope className="text-lg" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="relative p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <FaBell className="text-lg" />
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center bg-blue-600 text-white text-[9px] font-bold rounded-full border-2 border-white">
                            3
                        </span>
                    </button>
                </div>

                {/* Garis Pembatas */}
                <div className="h-8 w-px bg-gray-200"></div>

                {/* User Profile */}
                <div className="flex items-center space-x-3 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Admin Fresh</p>
                        <p className="text-xs font-medium text-gray-400">Superadmin</p>
                    </div>
                    {/* Kamu bisa ganti src fotonya nanti */}
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-100 shadow-sm">
                        <img 
                            src="https://avatar.iran.liara.run/public/boy?username=Admin" 
                            alt="Admin Profile" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}