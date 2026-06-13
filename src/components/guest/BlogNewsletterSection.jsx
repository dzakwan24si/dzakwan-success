const blogPosts = [
    {
      date: 'Jumat, 15 Mar 2024', readTime: '2 Min Baca',
      img: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/178b5e9f2-cefb-4036-b349-23df9da0a95c.png',
      tag: 'Tips Laundry', title: 'Trik Laundry Esensial yang Wajib Diketahui Setiap Ibu Rumah Tangga',
    },
    {
      date: 'Selasa, 12 Mar 2024', readTime: '8 Min Baca',
      img: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/10f9cbbe9-d24a-41e7-8216-fe1d820ec19f.png',
      tag: 'Perawatan', title: 'Panduan Utama Menghilangkan Noda Membandel pada Pakaian Putih',
    },
    {
      date: 'Minggu, 10 Mar 2024', readTime: '6 Min Baca',
      img: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/1c84509be-76fc-417c-8c69-c89c55898edb.png',
      tag: 'Keluarga', title: 'Teknik Menyortir Cucian yang Efisien untuk Keluarga Sibuk',
    },
  ];
  
  const BlogNewsletterSection = () => {
    return (
      <>
        {/* Blog Section */}
        <section id="blog" className="py-20 px-6 bg-white text-center">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto mb-10 gap-4">
            <h2 className="text-3xl font-bold text-slate-900">
              Baca <span className="text-orange-500">Artikel Terbaru</span> Kami
            </h2>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full px-6 py-2.5 text-sm font-semibold transition-all">
              Lihat Semua Artikel
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="h-48 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                    <span className="text-xs text-slate-400 font-medium">{post.readTime}</span>
                  </div>
                  <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {post.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Newsletter Section */}
        <section className="bg-slate-900 py-16 px-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="flex-1 hidden md:flex justify-end">
              <img 
                src="https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/1af527ad6-f727-4247-ada4-3cd5605d02c1.png" 
                alt="Newsletter" 
                className="max-w-[280px] rounded-2xl" 
              />
            </div>
            <div className="flex-1 text-center md:text-left text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Gabung ke Newsletter Kami</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Berlangganan untuk mendapatkan berita, promo eksklusif, dan tips seputar perawatan pakaian langsung ke kotak masuk Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <input type="email" placeholder="Masukkan email Anda" className="px-5 py-3 rounded-full text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto flex-1" />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-6 py-3 text-sm transition-colors shadow-md">
                  Langganan Sekarang
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default BlogNewsletterSection;