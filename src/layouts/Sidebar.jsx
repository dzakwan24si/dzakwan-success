import { NavLink } from "react-router-dom";
import { FaHome, FaTshirt, FaStore, FaHandshake, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
    // Fungsi untuk mengubah warna menu jika sedang aktif
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-3.5 space-x-3 transition-all duration-300 font-medium
        ${isActive ? 
            "text-blue-700 bg-blue-50 shadow-sm" : 
            "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
        }`;

    return (
        <div className="flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0 z-20 font-poppins">
            {/* Logo Area */}
            <div className="flex items-center space-x-3 p-6 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="text-white text-xl">💧</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-extrabold text-xl text-gray-800 tracking-tight">
                        Fresh<span className="text-blue-500">Laundry.</span>
                    </span>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 px-4 overflow-y-auto">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Menu Utama</p>
                <ul className="space-y-1.5 text-sm">
                    <li>
                        <NavLink to="/" className={menuClass}>
                            <FaHome className="text-lg" /> <span>Beranda</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/status" className={menuClass}>
                            <FaTshirt className="text-lg" /> <span>Cek Cucian</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/outlet" className={menuClass}>
                            <FaStore className="text-lg" /> <span>Manajemen Outlet</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/kemitraan" className={menuClass}>
                            <FaHandshake className="text-lg" /> <span>Kemitraan</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Logout Button (Bottom) */}
            <div className="p-4 border-t border-gray-100">
                <button className="flex w-full items-center space-x-3 p-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all">
                    <FaSignOutAlt className="text-lg" />
                    <span>Keluar Sistem</span>
                </button>
            </div>
        </div>
    );
}