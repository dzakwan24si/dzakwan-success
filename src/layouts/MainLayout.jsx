import React from "react";
import { Outlet } from "react-router-dom";
const Sidebar = React.lazy(() => import("./Sidebar"));
const Header = React.lazy(() => import("./Header"));

export default function MainLayout() {
  return (
    <div className="h-screen w-full bg-white font-sans flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {/* Area konten tetap bisa di-scroll jika isinya panjang */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
}