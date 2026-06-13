import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm px-6 md:px-12 h-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
          Q
        </div>
        <span className="text-xl font-extrabold text-slate-900">Kucek.In</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {['Beranda', 'Layanan', 'Harga', 'Lokasi', 'Blog'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Button Contact */}
      <button className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-all">
        Login
      </button>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 text-slate-900"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {mobileMenu ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {/* Mobile Nav Dropdown */}
      {mobileMenu && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg p-6 flex flex-col gap-4 md:hidden border-t border-gray-100">
          {['Beranda', 'Layanan', 'Harga', 'Lokasi', 'Blog'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-700 font-medium py-2">
              {item}
            </a>
          ))}
          <button className="bg-slate-900 text-white rounded-full px-6 py-3 text-sm font-semibold mt-2">
            Hubungi Kami
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;