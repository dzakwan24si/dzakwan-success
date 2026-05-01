import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({ username: "", password: "" });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        axios.post("https://dummyjson.com/user/login", {
            username: dataForm.username, // gunakan 'emilys' untuk test
            password: dataForm.password, // gunakan 'emilyspass' untuk test
        })
        .then((response) => {
            if (response.status === 200) {
                navigate("/"); // Sukses login, lempar ke Dashboard/Beranda
            }
        })
        .catch((err) => {
            setError(err.response?.data?.message || "Terjadi kesalahan sistem");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Masuk ke Akun 👋</h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-5 border border-red-100 flex items-center font-medium">
                    <span className="mr-2">⚠️</span> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Username (Coba: emilys)</label>
                    <input 
                        type="text" name="username" onChange={handleChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        placeholder="Masukkan username"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password (Coba: emilyspass)</label>
                    <input 
                        type="password" name="password" onChange={handleChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        placeholder="••••••••"
                    />
                </div>
                <button 
                    type="submit" disabled={loading}
                    className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-lg ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-blue-500/30'}`}
                >
                    {loading ? "Memproses..." : "Masuk Sekarang"}
                </button>
            </form>
        </div>
    );
}