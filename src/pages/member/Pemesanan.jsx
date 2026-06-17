import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, Ticket, CheckCircle2, Loader2, X } from 'lucide-react'; 

// Import fungsi API
import { transactionAPI } from '@/services/transactionAPI';
import { authAPI } from '@/services/authAPI';

const getIconForLayanan = (nama) => {
  const namaLower = nama.toLowerCase();
  if (namaLower.includes('lipat')) return '/img/LogoCuciLipat.png';
  if (namaLower.includes('setrika')) return '/img/LogoSetrika.png';
  if (namaLower.includes('karpet')) return '/img/LogoKarpet.png';
  if (namaLower.includes('sepatu')) return '/img/LogoCuciSepatu.png';
  if (namaLower.includes('sprei') || namaLower.includes('selimut')) return '/img/LogoCuciSprei.png';
  return '/img/LogoDryCleaning.png'; 
};

export default function Pemesanan() {
  const navigate = useNavigate();
  
  const [layananData, setLayananData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userTier, setUserTier] = useState("Bronze"); // State baru untuk Tier
  const [keranjang, setKeranjang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formDetail, setFormDetail] = useState({ nama: '', whatsapp: '', alamat: '', catatan: '' });

  // ==========================================
  // STATE PROMO ENGINE
  // ==========================================
  const [kodePromoInput, setKodePromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const services = await transactionAPI.getServices();
        setLayananData(services);

        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserId(user.id);
          
          const profile = await authAPI.getMemberProfile(user.id);
          setUserTier(profile.tier || "Bronze"); // Simpan Tier Pelanggan
          setFormDetail({ nama: user.fullname, whatsapp: profile.whatsapp || '', alamat: profile.alamat || '', catatan: '' });
        }
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const toggleLayanan = (item) => {
    const isExist = keranjang.find(k => k.id === item.id);
    if (isExist) setKeranjang(keranjang.filter(k => k.id !== item.id));
    else setKeranjang([...keranjang, { ...item, qty: 1, subtotal: item.harga }]);
  };

  const updateQty = (id, delta) => {
    setKeranjang(keranjang.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty, subtotal: newQty * item.harga };
      }
      return item;
    }));
  };

  const removeItem = (id) => setKeranjang(keranjang.filter(item => item.id !== id));

  // ==========================================
  // LOGIKA CEK KODE PROMO
  // ==========================================
  const handleApplyPromo = async () => {
    if (!kodePromoInput.trim()) return;
    setIsCheckingPromo(true);
    setPromoMessage({ type: "", text: "" });

    try {
        const promo = await transactionAPI.cekKodePromo(kodePromoInput);
        
        // 1. Validasi Minimal Belanja
        const totalSubtotal = keranjang.reduce((sum, item) => sum + item.subtotal, 0);
        if (totalSubtotal < promo.min_belanja) {
            setPromoMessage({ type: "error", text: `Minimal belanja untuk promo ini Rp ${promo.min_belanja.toLocaleString('id-ID')}` });
            setAppliedPromo(null);
            return;
        }

        // 2. Validasi Target Tier
        if (promo.target_tier !== 'Semua' && promo.target_tier !== userTier) {
            setPromoMessage({ type: "error", text: `Kode ini khusus untuk member ${promo.target_tier}. (Tier Anda: ${userTier})` });
            setAppliedPromo(null);
            return;
        }

        // Jika Lolos Semua Syarat
        setAppliedPromo(promo);
        setPromoMessage({ type: "success", text: `Promo "${promo.nama_promo}" berhasil dipasang!` });
        setKodePromoInput(""); // Kosongkan input
    } catch (error) {
        setPromoMessage({ type: "error", text: error.message || "Kode promo tidak ditemukan." });
        setAppliedPromo(null);
    } finally {
        setIsCheckingPromo(false);
    }
  };

  // ==========================================
  // KALKULASI HARGA TOTAL (DENGAN DISKON)
  // ==========================================
  const totalSubtotal = keranjang.reduce((sum, item) => sum + item.subtotal, 0);
  let ongkir = keranjang.length > 0 ? 10000 : 0;
  let diskon = 0;

  if (appliedPromo && keranjang.length > 0) {
      // Jika ternyata subtotal berubah (item dihapus) hingga di bawah syarat min_belanja, cabut diskonnya
      if (totalSubtotal < appliedPromo.min_belanja) {
          setAppliedPromo(null);
          setPromoMessage({ type: "error", text: "Diskon dicabut karena total belanja kurang dari syarat." });
      } else {
          if (appliedPromo.tipe_promo === 'Persen') diskon = (totalSubtotal * appliedPromo.nilai_potongan) / 100;
          else if (appliedPromo.tipe_promo === 'Nominal') diskon = appliedPromo.nilai_potongan;
          else if (appliedPromo.tipe_promo === 'Gratis Ongkir') diskon = ongkir;
      }
  }

  // Mencegah total akhir minus jika diskon terlalu besar
  const totalAkhir = Math.max(0, totalSubtotal + ongkir - diskon);

  const handlePesan = async (e) => {
    e.preventDefault();
    if (keranjang.length === 0 || !userId) return;
    setIsSubmitting(true);

    try {
      const date = new Date();
      const tglStr = `${date.getDate()}${date.getMonth()+1}${date.getFullYear().toString().slice(-2)}`;
      const randomNum = Math.floor(Math.random() * 90) + 10;
      const resiId = `KUC-${tglStr}-${randomNum}`;

      const orderData = {
        id: resiId,
        user_id: userId,
        alamat_jemput: `${formDetail.alamat} (Catatan: ${formDetail.catatan || '-'})`,
        total_harga: totalAkhir,
        diskon_voucher: diskon, // Simpan nominal diskon ke database!
        status_pesanan: 'Diterima',
        status_bayar: 'Belum Lunas'
      };

      const cartItems = keranjang.map(item => ({
        layanan_id: item.id,
        qty: item.qty,
        harga_satuan: item.harga,
        subtotal: item.subtotal
      }));

      await transactionAPI.createTransaction(orderData, cartItems);

      alert(`Pesanan berhasil! Total bayar Anda Rp ${totalAkhir.toLocaleString('id-ID')}`);
      navigate('/member/pesanan');

    } catch (error) {
      alert("Terjadi kesalahan saat memproses pesanan Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-bold animate-pulse">Menyiapkan Form...</div>;

  return (
    <div className="bg-transparent space-y-8 animate-fade-in pb-10 w-full">
      
      <div className="mb-8">
        <Link to="/member" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-orange-500 mb-4"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg> Kembali ke Dasbor Member</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">Formulir Pemesanan</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-5">1. Pilih Layanan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {layananData.map((item) => {
                const isSelected = keranjang.some(k => k.id === item.id);
                return (
                  <div key={item.id} onClick={() => toggleLayanan(item)} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex justify-center shadow-sm border border-slate-100 shrink-0 p-2"><img src={getIconForLayanan(item.nama_layanan)} alt={item.nama_layanan} className="w-full h-full object-contain" /></div>
                        <div><div className="font-bold text-slate-900 text-sm">{item.nama_layanan}</div><div className="text-xs text-slate-500 mt-0.5">Rp {item.harga.toLocaleString('id-ID')} / {item.jenis === 'Kiloan' ? 'kg' : 'pcs'}</div></div>
                    </div>
                    {isSelected && <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md"><CheckCircle2 size={16} /></div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-5">2. Detail Penjemputan</h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label><input type="text" value={formDetail.nama} onChange={(e) => setFormDetail({...formDetail, nama: e.target.value})} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 text-sm font-medium" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-2">No. WhatsApp</label><input type="tel" value={formDetail.whatsapp} onChange={(e) => setFormDetail({...formDetail, whatsapp: e.target.value})} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 text-sm font-medium" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Penjemputan</label><textarea rows="3" required value={formDetail.alamat} onChange={(e) => setFormDetail({...formDetail, alamat: e.target.value})} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 text-sm resize-y font-medium"></textarea></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-2">Catatan Khusus</label><input type="text" value={formDetail.catatan} onChange={(e) => setFormDetail({...formDetail, catatan: e.target.value})} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 text-sm" /></div>
            </form>
          </div>
        </div>

        {/* BAGIAN KANAN: Ringkasan & Promo */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-slate-900 text-white p-7 md:p-8 rounded-3xl shadow-xl sticky top-24 border border-slate-800">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><ShoppingCart size={20} className="text-orange-400" /> Keranjang Pesanan</h2>
            
            <div className="min-h-[150px]">
              <AnimatePresence>
                {keranjang.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-slate-500 mt-10 mb-10"><ShoppingCart size={40} className="mb-3 opacity-20" /><p className="text-sm font-medium">Belum ada layanan dipilih</p></motion.div>
                ) : (
                    <div className="space-y-4 mb-6 pb-6 border-b border-slate-700/50">
                        {keranjang.map((item) => (
                            <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                <div className="flex justify-between items-start mb-3"><div className="font-semibold text-sm pr-4">{item.nama_layanan}</div><button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-red-400 transition-colors bg-slate-800 p-1.5 rounded-lg"><Trash2 size={14}/></button></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-1 border border-slate-700">
                                        <button type="button" onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center hover:text-orange-400">-</button>
                                        <span className="text-xs font-bold w-10 text-center">{item.qty} {item.jenis === 'Kiloan' ? 'kg' : 'pcs'}</span>
                                        <button type="button" onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center hover:text-orange-400">+</button>
                                    </div>
                                    <div className="font-bold text-sm text-orange-400">Rp {item.subtotal.toLocaleString('id-ID')}</div>
                                </div>
                            </motion.div>
                        ))}
                        <div className="flex justify-between items-center pt-4 px-2"><div className="font-semibold text-sm text-slate-400">Biaya Antar-Jemput</div><div className="font-semibold text-sm text-slate-300">Rp {ongkir.toLocaleString('id-ID')}</div></div>
                    </div>
                )}
              </AnimatePresence>
            </div>

            {/* SEKSI INPUT KODE PROMO */}
            <div className="mb-6 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Ticket size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Punya kode promo?" value={kodePromoInput} onChange={(e) => setKodePromoInput(e.target.value.toUpperCase())} disabled={appliedPromo !== null || keranjang.length === 0} className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white uppercase placeholder:text-slate-500 focus:border-orange-500 outline-none disabled:opacity-50" />
                    </div>
                    {appliedPromo ? (
                        <button type="button" onClick={() => setAppliedPromo(null)} className="px-4 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-colors"><X size={18} /></button>
                    ) : (
                        <button type="button" onClick={handleApplyPromo} disabled={!kodePromoInput || keranjang.length === 0 || isCheckingPromo} className="px-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 transition-colors text-sm">
                            {isCheckingPromo ? <Loader2 size={18} className="animate-spin" /> : "Pakai"}
                        </button>
                    )}
                </div>

                {/* Pesan Error / Success Promo */}
                {promoMessage.text && (
                    <div className={`mt-3 text-xs font-bold flex items-start gap-1.5 ${promoMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {promoMessage.type === 'success' ? <CheckCircle2 size={14} className="shrink-0 mt-0.5" /> : <alertCircle size={14} className="shrink-0 mt-0.5" />}
                        {promoMessage.text}
                    </div>
                )}
                
                {/* Rincian Diskon Jika Berlaku */}
                {appliedPromo && (
                    <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center text-green-400 font-bold text-sm">
                        <span>Diskon Promo</span>
                        <span>- Rp {diskon.toLocaleString('id-ID')}</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mb-8 px-2">
              <div className="text-sm font-bold text-orange-400">Total Estimasi</div>
              <div className="text-2xl font-black text-orange-500">Rp {totalAkhir.toLocaleString('id-ID')}</div>
            </div>

            <button onClick={handlePesan} disabled={isSubmitting || keranjang.length === 0 || !formDetail.alamat} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-2xl py-4 transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] disabled:shadow-none flex justify-center">
              {isSubmitting ? 'Memproses Pesanan...' : 'Konfirmasi Pesanan'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}