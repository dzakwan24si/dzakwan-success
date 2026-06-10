import { Outlet } from "react-router-dom";
import Navbar from "../components/guest/Navbar";
import Footer from "../components/guest/Footer";

const GuestLayout = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Navbar />
      
      {/* Konten halaman (Hero, Services, dll) akan dirender di dalam tag main ini */}
      <main className="pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default GuestLayout;