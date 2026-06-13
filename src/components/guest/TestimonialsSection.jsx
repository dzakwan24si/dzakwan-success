import { useState } from 'react';

const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Pelanggan Setia',
    text: '"Saya sangat berterima kasih kepada Kucekin atas layanannya yang tanpa cela. Pakaian saya tidak pernah terlihat sebaik ini, dan kenyamanan antar-jemputnya sangat membantu!"',
    img: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/1b1d9932b-0437-99a1-8712-75de81c5aedb.png',
    rating: 5,
  },
  {
    name: 'Siti Aminah',
    role: 'Pelanggan Baru',
    text: '"Sudah beberapa bulan menggunakan Kucekin, dan saya selalu terkesan dengan perhatian mereka terhadap detail pakaian dan komitmen terhadap kepuasan pelanggan."',
    img: 'https://image.qwenlm.ai/public_source/ccc69bcd-f31d-4286-9fe8-970f55530d23/19fe7b6fa-0f95-9985-b29f-9d4eb7f28d3a.png',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 px-6 bg-slate-900 text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Feedback <span className="text-orange-500">Pelanggan Kami</span>
      </h2>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left relative">
              <div className="text-xs text-orange-300 font-semibold mb-2">{t.role}</div>
              <p className="text-sm text-white/90 leading-relaxed mb-6 italic">
                {t.text}
              </p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-700" />
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="flex gap-0.5 mt-1 text-orange-500 text-xs">
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                </div>
              </div>
              {/* Quote Icon */}
              <div className="absolute bottom-6 right-6 opacity-20">
                <svg width="40" height="40" viewBox="0 0 32 32" fill="currentColor" className="text-orange-500">
                  <path d="M8 16c0-4 3-7 7-7v3c-2.5 0-4 1.5-4 4h3v6H8v-6zM18 16c0-4 3-7 7-7v3c-2.5 0-4 1.5-4 4h3v6h-6v-6z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map(i => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${current === i ? 'w-6 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;