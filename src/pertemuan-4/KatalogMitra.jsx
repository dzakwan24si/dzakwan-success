import { useState } from "react";
import mitraData from "./data/mitra.json";

export default function KatalogMitra() {
  // 1. STATE MANAGEMENT
  const [viewMode, setViewMode] = useState("guest"); // "guest" atau "admin"
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterPengalaman, setFilterPengalaman] = useState("");

  // 2. DERIVED STATE (Pencarian & Filter)
  // Data otomatis tersaring setiap kali state di atas berubah
  const filteredMitra = mitraData.filter((mitra) => {
    const matchSearch = mitra.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori = filterKategori ? mitra.kategori === filterKategori : true;
    const matchPengalaman = filterPengalaman ? mitra.pengalaman === filterPengalaman : true;
    return matchSearch && matchKategori && matchPengalaman;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & VIEW TOGGLE */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-6 gap-4">
          <h1 className="text-2xl font-bold text-blue-700">TemanJasa Freelancers</h1>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode("guest")}
              className={`px-4 py-2 rounded-md font-semibold transition ${viewMode === "guest" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-200"}`}
            >
              Guest View (Card)
            </button>
            <button 
              onClick={() => setViewMode("admin")}
              className={`px-4 py-2 rounded-md font-semibold transition ${viewMode === "admin" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-200"}`}
            >
              Admin View (Table)
            </button>
          </div>
        </div>

        {/* SEARCH & 2 FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 1 Search */}
          <input 
            type="text" 
            placeholder="🔍 Cari nama mitra..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {/* Filter 1 */}
          <select 
            value={filterKategori} 
            onChange={(e) => setFilterKategori(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Semua Kategori</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Mobile Dev">Mobile Dev</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Copywriting">Copywriting</option>
          </select>
          {/* Filter 2 */}
          <select 
            value={filterPengalaman} 
            onChange={(e) => setFilterPengalaman(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Semua Pengalaman</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* KONDISI TAMPILAN (CONDITIONAL RENDERING) */}
        {filteredMitra.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            Tidak ada data yang sesuai pencarian.</div>
        ) : viewMode === "guest" ? (
          
          /* --- TAMPILAN GUEST (GRID & CARD RESPONSIVE) --- */
          /* Responsive: 1 kolom di HP, 2 di Tablet, 3 di Laptop, 4 di Layar Besar */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMitra.map((mitra) => (
              <div key={mitra.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
                <div className="p-5 flex flex-col items-center">
                  <img src={mitra.foto} alt={mitra.nama} className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-sm mb-4" />
                  <h2 className="text-xl font-bold text-gray-800">{mitra.nama}</h2>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mt-2 uppercase">{mitra.kategori}</span>
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-100 text-sm text-gray-600 space-y-2">
                  <p>⭐ <b>{mitra.statistik.rating}</b> ({mitra.statistik.projek} Projek)</p>
                  <p>💼 <b>Level:</b> {mitra.pengalaman}</p>
                  <p>💰 <b>Tarif:</b> Rp {mitra.tarif.toLocaleString("id-ID")}/jam</p>
                  <p>📍 <b>Lokasi:</b> {mitra.lokasi.kota}</p>
                </div>
              </div>
            ))}
          </div>

        ) : (

          /* --- TAMPILAN ADMIN (TABLE RESPONSIVE) --- */
          <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-gray-200">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-sm uppercase tracking-wider">
                  <th className="p-4">Foto</th>
                  <th className="p-4">Nama Mitra</th>
                  <th className="p-4">Kategori & Level</th>
                  <th className="p-4">Kontak (Nested)</th>
                  <th className="p-4">Tarif/Jam</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {filteredMitra.map((mitra, index) => (
                  <tr key={mitra.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="p-4">
                      <img src={mitra.foto} alt={mitra.nama} className="w-10 h-10 rounded-full shadow-sm" />
                    </td>
                    <td className="p-4 font-bold text-gray-900">{mitra.nama}
                      <span className="block text-xs font-normal text-gray-500">⭐ {mitra.statistik.rating} | 📍 {mitra.lokasi.kota}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-blue-600">{mitra.kategori}</span>
                      <span className="block text-xs text-gray-500">{mitra.pengalaman}</span>
                    </td>
                    <td className="p-4">
                      <p>✉️ {mitra.kontak.email}</p>
                      <p>📞 {mitra.kontak.wa}</p>
                    </td>
                    <td className="p-4 font-semibold text-green-600">
                      Rp {mitra.tarif.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}