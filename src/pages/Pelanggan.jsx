import React, { useState } from 'react';
import { Search, Filter, UserCheck, Download, Eye, Edit, Trash2 } from "lucide-react";

// Import Komponen Reusable asli Kucekin
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Table from "../components/Table";

// Import Data Dummy CRM
import dataPelangganRaw from '../data/dataPelanggan.json';

export default function Pelanggan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");

  // Menyelaraskan tab filter status keanggotaan (CRM Strategis)
  const filters = ["Semua", "VIP", "Premium", "Reguler"];

  // Filter logika data berdasarkan pencarian nama/ID dan kategori member
  const filteredPelanggan = dataPelangganRaw.filter(p => {
    const matchesSearch = p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Semua" || p.statusMember === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 pb-24 font-poppins animate-fade-in">
      {/* Menyelaraskan struktur PageHeader sesuai template Kucekin */}
      <PageHeader 
        title="Manajemen Pelanggan (CRM)" 
        subtitle="Analisis portofolio, segmentasi keanggotaan, dan nilai transaksi jangka panjang pelanggan." 
      />

      {/* Bagian Filter & Kategori Utama */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2 bg-gray-100/80 p-1 rounded-xl w-fit">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Aksi Tambah Ekspor Data Dummy */}
        <Button type="secondary" className="flex items-center gap-2">
          <Download size={16} />
          Export CSV (800 Baris)
        </Button>
      </div>

      {/* Bar Pencarian & Input Kontrol */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari nama atau ID customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors text-gray-800"
          />
        </div>
        <div className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          Menampilkan <span className="text-gray-700 font-bold">{filteredPelanggan.length}</span> Pelanggan
        </div>
      </div>

      {/* Implementasi Reusable Table Kucekin */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <Table headers={["ID Customer", "Nama Lengkap", "Kontak / Email", "Level Member", "Total Transaksi", "Interaksi Terakhir", "Aksi"]}>
          {filteredPelanggan.length > 0 ? (
            filteredPelanggan.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-5 font-bold text-gray-800">{p.id}</td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
                      {p.nama.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-700">{p.nama}</span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="text-sm text-gray-700 font-medium">{p.nomorHp}</div>
                  <div className="text-xs text-gray-400">{p.email}</div>
                </td>
                <td className="p-5">
                  {/* Styling Badge Keanggotaan Kustom */}
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide ${
                    p.statusMember === 'VIP' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                    p.statusMember === 'Premium' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {p.statusMember}
                  </span>
                </td>
                <td className="p-5 font-bold text-gray-800">{p.totalTransaksi}</td>
                <td className="p-5 text-sm text-gray-500">{p.transaksiTerakhir}</td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Profil">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Ubah">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                      <Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-12 text-center text-gray-400 bg-gray-50/50">
                Data customer dengan kategori <span className="font-semibold text-gray-700">"{activeFilter}"</span> tidak ditemukan.
              </td>
            </tr>
          )}
        </Table>
      </div>
    </div>
  );
}