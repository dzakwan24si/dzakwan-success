const whyChooseUsItems = [
    { label: 'Keahlian & Pengalaman', isBubble: false },
    { label: 'Kualitas Terjamin', isBubble: false },
    { label: 'Tepat Waktu', isBubble: false },
    { label: 'Kepuasan Pelanggan', isBubble: false },
    { label: 'Bebas ribet. Layanan antar-jemput tersedia.', isBubble: true },
    { label: 'Sangat Praktis', isBubble: false, isSolid: true },
    { label: 'Perawatan Personal', isBubble: false },
    { label: 'Harga Transparan', isBubble: false },
  ];
  
  const WhyChooseUsSection = () => {
    return (
      <section className="py-20 px-6 bg-slate-50 text-center relative overflow-hidden">
        {/* Background dekoratif */}
        <div className="absolute top-[5%] left-[10%] w-24 h-24 rounded-full bg-slate-900/5" />
        <div className="absolute bottom-[10%] right-[15%] w-32 h-32 rounded-full bg-orange-500/5" />
  
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 relative z-10">
          Mengapa Memilih <span className="text-orange-500">Kucekin?</span>
        </h2>
        <p className="text-sm text-slate-500 mb-12 relative z-10">
          Kami mengerti Anda memiliki banyak pilihan,<br />namun Kucekin memberikan yang terbaik untuk pakaian Anda.
        </p>
  
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-5xl mx-auto gap-10 relative z-10 min-h-[400px]">
          {/* Kolom Kiri */}
          <div className="hidden lg:flex flex-1 flex-col gap-8 items-end pr-5">
            {whyChooseUsItems.slice(0, 4).map((item, idx) => (
              <div key={idx} className={`
                flex items-center justify-center text-center font-semibold text-sm
                ${item.isBubble ? 'bg-orange-50 w-40 h-20 rounded-xl p-4 text-slate-700 leading-snug' : 'bg-white w-28 h-28 rounded-full shadow-sm text-slate-600'}
                ${!item.isSolid && !item.isBubble ? 'border-2 border-dashed border-orange-200' : ''}
              `}>
                {item.label}
              </div>
            ))}
          </div>
  
          {/* Gambar Tengah */}
          <div className="flex-1 flex justify-center relative w-full max-w-xs">
            <div className="relative">
              <img
                src="https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/1d7b8fc88-c630-4d25-9776-7869afedd9e9.png"
                alt="Mengapa memilih Kucekin"
                className="w-full max-w-[260px] rounded-2xl shadow-xl"
              />
              <button className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap shadow-lg transition-colors">
                Pesan Sekarang
              </button>
            </div>
          </div>
  
          {/* Kolom Kanan (dan Mobile gabungan) */}
          <div className="flex flex-wrap justify-center lg:flex-col gap-6 lg:gap-8 lg:items-start lg:pl-5 lg:flex-1 mt-10 lg:mt-0">
            {/* Di mobile, tampilkan semua item. Di desktop, hanya 4 terakhir */}
            {whyChooseUsItems.map((item, idx) => (
              <div key={`right-${idx}`} className={`
                ${idx < 4 ? 'flex lg:hidden' : 'flex'} items-center justify-center text-center font-semibold text-sm
                ${item.isBubble ? 'bg-orange-50 w-40 h-20 rounded-xl p-4 text-slate-700 leading-snug' : item.isSolid ? 'bg-orange-500 text-white w-28 h-28 rounded-full shadow-md' : 'bg-white w-28 h-28 rounded-full shadow-sm text-slate-600'}
                ${!item.isSolid && !item.isBubble ? 'border-2 border-dashed border-orange-200' : ''}
              `}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default WhyChooseUsSection;