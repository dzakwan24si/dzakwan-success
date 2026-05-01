import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f9fd] font-poppins relative overflow-hidden">
            {/* Ornamen Geometris Air/Gelembung di background */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md relative z-10 border border-white/50 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                        <span className="text-3xl text-white">💧</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Fresh<span className="text-blue-500">Laundry.</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Sistem Manajemen Laundry Modern</p>
                </div>

                <Outlet /> {/* Halaman Login/Register akan masuk ke sini */}

                <p className="text-center text-xs text-gray-400 mt-8 font-medium">
                    © 2025 FreshLaundry System. All rights reserved.
                </p>
            </div>
        </div>
    );
}