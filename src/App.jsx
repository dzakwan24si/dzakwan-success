import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

// Lazy Loading
const Login = React.lazy(() => import("./pages/auth/Login"));
const Beranda = React.lazy(() => import("./pages/Beranda"));
const CekStatus = React.lazy(() => import("./pages/CekStatus"));

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Beranda />} />
                    <Route path="/status" element={<CekStatus />} />
                </Route>
            </Routes>
        </Suspense>
    );
}