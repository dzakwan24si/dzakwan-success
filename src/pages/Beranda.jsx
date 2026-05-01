import { FaTshirt, FaCheckCircle, FaSpinner, FaMoneyBillWave } from "react-icons/fa";

export default function Beranda() {
    return (
        <div className="animate-fade-in font-poppins">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800">Ringkasan Hari Ini</h1>
                <p className="text-gray-500 mt-1">Pantau aktivitas outlet FreshLaundry Anda secara real-time.</p>
            </div>

            {/* 4 Card Statistik ala Portofolio */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 flex items-center space-x-4 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                        <FaTshirt />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Cucian Masuk</p>
                        <h2 className="text-3xl font-black text-gray-800">124<span className="text-sm font-medium text-gray-500 ml-1">kg</span></h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-cyan-50 flex items-center space-x-4 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-cyan-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-14 h-14 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                        <FaSpinner className="animate-spin-slow" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Sedang Dicuci</p>
                        <h2 className="text-3xl font-black text-gray-800">38<span className="text-sm font-medium text-gray-500 ml-1">kg</span></h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-50 flex items-center space-x-4 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                        <FaCheckCircle />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Siap Ambil</p>
                        <h2 className="text-3xl font-black text-gray-800">45<span className="text-sm font-medium text-gray-500 ml-1">kg</span></h2>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center space-x-4 text-white hover:-translate-y-1 transition-transform relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-blue-100 uppercase tracking-wider">Pendapatan</p>
                        <h2 className="text-3xl font-black">Rp 2.4<span className="text-lg font-medium ml-1">Jt</span></h2>
                    </div>
                </div>
            </div>

            {/* Tabel Order Terbaru */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Pesanan Terbaru</h3>
                    <button className="text-sm text-blue-600 font-semibold hover:underline">Lihat Semua</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">No. Resi</th>
                                <th className="p-4 font-semibold">Pelanggan</th>
                                <th className="p-4 font-semibold">Layanan</th>
                                <th className="p-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr className="border-b border-gray-50 hover:bg-blue-50/50 transition">
                                <td className="p-4 font-bold text-blue-600">#FRSH-001</td>
                                <td className="p-4 font-semibold">Ahmad Faris</td>
                                <td className="p-4 text-gray-500">Cuci Komplit (Reguler)</td>
                                <td className="p-4"><span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold">Sedang Dicuci</span></td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-blue-50/50 transition">
                                <td className="p-4 font-bold text-blue-600">#FRSH-002</td>
                                <td className="p-4 font-semibold">Siti Nurbaya</td>
                                <td className="p-4 text-gray-500">Cuci Kering (Kilat)</td>
                                <td className="p-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Siap Diambil</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}