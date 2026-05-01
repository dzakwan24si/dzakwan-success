import { useState } from "react";
import { FaSearch, FaBoxOpen } from "react-icons/fa";

export default function CekStatus() {
    const [searchResi, setSearchResi] = useState("");
    const [isSearched, setIsSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearched(true);
    };

    return (
        <div className="animate-fade-in font-poppins max-w-4xl mx-auto">
            <div className="text-center mb-10 mt-4">
                <h1 className="text-4xl font-black text-gray-800 mb-3">Lacak Cucian Anda</h1>
                <p className="text-gray-500">Masukkan Nomor Resi Anda untuk mengetahui status proses laundry saat ini.</p>
            </div>

            {/* Kotak Pencarian */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input 
                    type="text" 
                    value={searchResi}
                    onChange={(e) => setSearchResi(e.target.value)}
                    className="block w-full pl-12 pr-32 py-5 bg-white border border-gray-200 rounded-2xl text-lg shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="Contoh: FRSH-001"
                    required
                />
                <button 
                    type="submit"
                    className="absolute inset-y-2 right-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl shadow-md transition-all"
                >
                    Lacak
                </button>
            </form>

            {/* Hasil Pencarian (Muncul setelah tombol dilacak) */}
            {isSearched && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden animate-fade-in mt-8">
                    {/* Hiasan background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
                    
                    <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
                        <div>
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Hasil Pelacakan</p>
                            <h2 className="text-2xl font-black text-blue-600 uppercase">{searchResi || "#FRSH-001"}</h2>
                        </div>
                        <div className="text-right">
                            <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-bold border border-cyan-200">
                                Proses Cuci
                            </span>
                        </div>
                    </div>

                    {/* Timeline Progress yang Estetik */}
                    <div className="relative pt-4 pb-8">
                        {/* Garis background timeline */}
                        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 -translate-y-1/2 rounded-full"></div>
                        {/* Garis progress (Misal baru sampai tahap 2) */}
                        <div className="absolute top-1/2 left-0 w-1/2 h-1.5 bg-blue-500 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                        <div className="relative flex justify-between items-center w-full z-10">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg ring-4 ring-white">1</div>
                                <span className="text-xs font-bold text-gray-700 mt-3">Diterima</span>
                            </div>
                            {/* Step 2 (Current) */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg ring-4 ring-white animate-pulse">2</div>
                                <span className="text-xs font-bold text-blue-600 mt-3">Dicuci</span>
                            </div>
                            {/* Step 3 */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center font-bold ring-4 ring-white">3</div>
                                <span className="text-xs font-bold text-gray-400 mt-3">Disetrika</span>
                            </div>
                            {/* Step 4 */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center font-bold ring-4 ring-white">4</div>
                                <span className="text-xs font-bold text-gray-400 mt-3">Selesai</span>
                            </div>
                        </div>
                    </div>

                    {/* Detail Order */}
                    <div className="bg-gray-50 rounded-2xl p-6 flex justify-between items-center mt-6 border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <FaBoxOpen className="text-2xl text-blue-500" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Cuci Komplit Reguler</p>
                                <p className="text-sm text-gray-500">Estimasi Selesai: Besok, 14:00 WIB</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 font-medium">Total Tagihan</p>
                            <p className="text-xl font-black text-gray-800">Rp 45.000</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}