const workingProcess = [
    { icon: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/1e4f7da91-fec7-476b-9e86-6da4cae22008.png', title: 'Jadwalkan', desc: 'Pesan online atau via telepon, pilih waktu penjemputan.' },
    { icon: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/128cf47f9-21e1-41c3-813b-93c3be302d62.png', title: 'Penjemputan', desc: 'Tim Kucekin menjemput cucian kotor langsung di depan pintu Anda.' },
    { icon: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/114110c04-d43a-4efa-8676-55dbe14a4f00.png', title: 'Pencucian Ahli', desc: 'Kami mencuci dengan deterjen premium dan teknik terbaik.' },
    { icon: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/13f3563a8-5e95-4912-8c0a-2b23c5544f29.png', title: 'Pengantaran', desc: 'Pakaian diantar kembali dalam keadaan bersih, rapi, dan wangi.' },
  ];
  
  const WorkingProcessSection = () => {
    return (
      <section className="py-20 px-6 bg-white text-center relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-14 relative z-10">
          Cara Kerja <span className="text-orange-500">Kucekin</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto relative z-10">
          {workingProcess.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative group">
              {/* Lingkaran Icon */}
              <div className="w-24 h-24 rounded-full bg-slate-400 flex items-center justify-center mb-5 relative border-4 border-dashed border-orange-200 group-hover:bg-slate-800 transition-colors">
                <img src={step.icon} className="w-12 h-12 invert" alt={step.title} />
                
                {/* Nomor Step */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full text-white font-bold flex items-center justify-center border-2 border-white">
                  {idx + 1}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
  
              {/* Panah Penghubung (Hanya muncul di Desktop) */}
              {idx < workingProcess.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-[15%] w-[30%]">
                  <svg className="w-full h-2" preserveAspectRatio="none" viewBox="0 0 100 2">
                    <line x1="0" y1="1" x2="100" y2="1" stroke="#FFD0A0" strokeWidth="2" strokeDasharray="4,4" />
                    <polygon points="95,0 100,1 95,2" fill="#FFD0A0" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default WorkingProcessSection;