import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Ticket, CheckCircle2, AlertCircle, MoveRight, Copy, Check } from "lucide-react";

// Import API
import { transactionAPI } from "@/services/transactionAPI";
import { authAPI } from "@/services/authAPI";

export default function PromoMember() {
  const [poinSaya, setPoinSaya] = useState(0);
  const [userTier, setUserTier] = useState("Bronze");
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk melacak kode kupon mana yang sedang disalin pelanggan
  const [copiedCode, setCopiedCode] = useState(null);

  // Tarik data poin, tier, dan voucher aktif dari database Supabase
  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          
          // 1. Ambil Poin dan Tier asli milik pelanggan
          const profile = await authAPI.getMemberProfile(user.id);
          setPoinSaya(profile.poin || 0);
          setUserTier(profile.tier || "Bronze");

          // 2. Ambil seluruh master data promo dari database
          const allPromos = await transactionAPI.getAllPromos();

          // 3. FILTER MARKETING: Hanya tampilkan promo yang statusnya aktif (is_active = true)
          const promoValid = allPromos.filter(promo => promo.is_active === true);
          setPromos(promoValid);
        }
      } catch (error) {
        console.error("Gagal memuat halaman promo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromoData();
  }, []);

  // Fungsi menyalin kode promo ke clipboard browser secara instan
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000); // Reset icon setelah 2 detik
  };

  // Helper bantuan untuk menentukan warna gradient tiket berdasarkan tipe promo (Menjaga keindahan UI lama Anda)
  const getGradientColor = (tipe) => {
    if (tipe === 'Persen') return "from-blue-600 to-indigo-800";
    if (tipe === 'Nominal') return "from-orange-500 to-red-500";
    return "from-slate-700 to-slate-900"; // Untuk Gratis Ongkir
  };

  // Helper untuk menentukan singkatan teks di visual tiket besar
  const getJudulPendek = (promo) => {
    if (promo.tipe_promo === 'Persen') return `${promo.nilai_potongan}%`;
    if (promo.tipe_promo === 'Nominal') return `${promo.nilai_potongan / 1000}K`;
    return "FREE";
  };

  if (isLoading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-bold animate-pulse">Menyiapkan keuntungan Anda...</div>;
  }

  // Pisahkan data untuk kolom kanan (Voucher khusus yang targetnya pas dengan tier pelanggan saat ini)
  const voucherKhususTier = promos.filter(p => p.target_tier === userTier);
  // Data untuk kolom kiri (Semua promo umum atau promo yang lolos filter tier pelanggan)
  const katalogPenukaran = promos.filter(p => p.target_tier === 'Semua' || p.target_tier === userTier);

  return (
    <div className="space-y-8 animate-fade-in pb-12 w-full pt-4">
      
      {/* =========================================
          1. TYPOGRAPHY HERO & POIN BALANCE (SAMA PERSIS DENGAN YANG LAMA)
          ========================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-4 md:mb-8"
      >
        <div>
          <p className="text-slate-500 font-medium tracking-wide text-sm mb-2 uppercase">Reward Loyalitas</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
            Klaim<br/>Hadiahmu.
          </h1>
        </div>
        
        {/* Box Poin Hitam Besar Anda */}
        <div className="bg-slate-900 rounded-[2rem] px-8 py-6 text-white flex items-center justify-between gap-8 min-w-[320px] shadow-xl">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Status Keanggotaan</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-black tracking-tighter">{poinSaya} <span className="text-xs font-bold text-slate-400 tracking-normal">pt</span></h2>
              <span className="text-orange-400 font-extrabold text-xs bg-white/10 px-2.5 py-1 rounded-md border border-white/5 uppercase tracking-wider">
                {userTier} Member
              </span>
            </div>
          </div>
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10">
            <Star className="text-orange-400 fill-orange-400" size={28} />
          </div>
        </div>
      </motion.div>

      {/* STRUKTUR GRID 3 KOLOM ASIMETRIS (2/3 Kiri, 1/3 Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        
        {/* =========================================
            KOLOM KIRI (2/3): KATALOG PROMO UTAMA (TAMPILAN TIKET GRADIENT)
            ========================================= */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
              <Ticket size={16} className="text-slate-700" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Katalog Voucher</h2>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {katalogPenukaran.map((promo) => {
                const warnaGradient = getGradientColor(promo.tipe_promo);
                const teksPendek = getJudulPendek(promo);

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={promo.id} 
                    className="p-2 border border-slate-200 rounded-[2rem] bg-white flex flex-col sm:flex-row gap-2 group hover:border-slate-300 transition-colors"
                  >
                    {/* Sisi Kiri Tiket Besar (Visual Kode Diskon Anda) */}
                    <div className={`sm:w-1/3 rounded-[1.5rem] bg-gradient-to-br ${warnaGradient} p-6 text-white flex flex-col justify-between relative overflow-hidden min-h-[160px]`}>
                      <Ticket className="opacity-10 absolute -right-6 -bottom-6 w-32 h-32 rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-45" />
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4 z-10">Voucher</span>
                      <h3 className="text-5xl font-black leading-none tracking-tighter z-10">{teksPendek}</h3>
                    </div>

                    {/* Sisi Kanan Tiket (Detail Aturan & Aksi Salin) */}
                    <div className="sm:w-2/3 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                           <h4 className="font-black text-slate-900 text-xl mb-1">{promo.nama_promo}</h4>
                           <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">Tier: {promo.target_tier}</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed pr-4">
                          Gunakan kode unik di bawah saat membuat transaksi pesanan baru.
                        </p>
                        <div className="text-xs text-slate-400 font-semibold mt-2">
                          Syarat minimum transaksi: <span className="text-slate-700 font-bold">Rp {promo.min_belanja.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                        <div className="bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl font-mono font-black text-slate-800 tracking-wider text-sm">
                          {promo.kode_promo}
                        </div>
                        
                        <button 
                          onClick={() => handleCopyCode(promo.kode_promo)}
                          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                            copiedCode === promo.kode_promo
                              ? "bg-green-600 text-white shadow-green-600/10" 
                              : "bg-slate-900 text-white hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5"
                          }`}
                        >
                          {copiedCode === promo.kode_promo ? (
                            <><Check size={14} /> Tersalin</>
                          ) : (
                            <><Copy size={14} /> Salin Kode</>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {katalogPenukaran.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed">
                <Ticket size={32} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-bold">Belum ada voucher aktif saat ini.</p>
              </div>
            )}
          </div>
        </div>

        {/* =========================================
            KOLOM KANAN (1/3): VOUCHER EKSLUSIF TIER (MINI BADGE LIST)
            ========================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Star size={16} className="text-orange-500 fill-orange-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Khusus Tier Anda</h2>
          </div>

          <div className="space-y-4">
            {voucherKhususTier.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed">
                <AlertCircle size={28} className="text-slate-300 mx-auto mb-3" />
                <p className="text-xs text-slate-500 font-medium px-6 leading-relaxed">
                  Tidak ada voucher spesifik untuk tier <strong className="text-orange-500">{userTier}</strong>. Gunakan katalog umum di sebelah kiri.
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {voucherKhususTier.map((v) => {
                  const warnaGradient = getGradientColor(v.tipe_promo);
                  const teksPendek = getJudulPendek(v);
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      key={v.id} 
                      onClick={() => handleCopyCode(v.kode_promo)}
                      className="p-1.5 border border-slate-200 rounded-[1.5rem] bg-white flex items-center gap-2 relative overflow-hidden group hover:border-orange-300 transition-colors cursor-pointer"
                    >
                      {/* Visual Voucher Pendek Berwarna Kompleks */}
                      <div className={`w-20 h-20 rounded-[1rem] bg-gradient-to-br ${warnaGradient} flex flex-col items-center justify-center text-white shrink-0 shadow-sm`}>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-80 mb-0.5">Diskon</span>
                        <span className="text-xl font-black leading-none tracking-tighter">{teksPendek}</span>
                      </div>
                      
                      <div className="py-2 px-3 pr-8">
                        <h3 className="font-bold text-slate-900 text-sm mb-0.5 leading-tight group-hover:text-orange-500 transition-colors">{v.nama_promo}</h3>
                        <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wide">KODE: {v.kode_promo}</p>
                      </div>

                      <div className="absolute right-4 text-slate-300 group-hover:text-orange-500 transition-all transform translate-x-2 group-hover:translate-x-0">
                         {copiedCode === v.kode_promo ? <Check size={16} className="text-green-500" /> : <MoveRight size={16} />}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
          
          <div className="bg-slate-900 p-6 rounded-[2rem] text-center mt-6 shadow-md">
             <p className="text-xs text-slate-400 font-medium leading-relaxed">
               Klik atau salin kode voucher Anda, lalu masukkan pada halaman <strong className="text-white">Pemesanan</strong> untuk menikmati potongan harga otomatis.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}