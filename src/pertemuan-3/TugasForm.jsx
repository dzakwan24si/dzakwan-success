import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function TugasForm() {
  // 1. STATE: Menyimpan data input
  const [formData, setFormData] = useState({
    nama: "",
    noHp: "",
    umur: "",
    divisi: "",
    pengalaman: ""
  });   

  // 2. STATE: Menyimpan error validasi
  const [errors, setErrors] = useState({
    nama: "Wajib diisi", noHp: "Wajib diisi", umur: "Wajib diisi", divisi: "Wajib diisi", pengalaman: "Wajib diisi"
  });

  // STATE: Menampilkan hasil submit
  const [isSubmitted, setIsSubmitted] = useState(false);

  // LOGIKA 3 VALIDASI
  const validateInput = (name, value) => {
    let errorMsg = "";
    
    // Validasi 1: Required (Tidak boleh kosong)
    if (!value.trim()) {
      errorMsg = "Field ini tidak boleh kosong!";
    } else {
      if (name === "nama") {
        // Validasi 2: Nama tidak boleh angka
        if (/\d/.test(value)) errorMsg = "Nama tidak boleh mengandung angka!";
        else if (value.length < 3) errorMsg = "Nama minimal 3 huruf!";
      }
      if (name === "noHp") {
        // Validasi 3: No HP harus angka
        if (!/^\d+$/.test(value)) errorMsg = "Nomor HP hanya boleh berisi angka!";
        else if (value.length < 10) errorMsg = "Nomor HP minimal 10 digit!";
      }
      if (name === "umur") {
        if (!/^\d+$/.test(value)) errorMsg = "Umur harus berupa angka!";
        else if (parseInt(value) < 17) errorMsg = "Umur minimal 17 tahun!";
      }
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateInput(name, value) });
    setIsSubmitted(false); // Reset hasil jika user mengetik lagi
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Cek apakah semua field tidak ada error
  const isFormValid = Object.values(errors).every((err) => err === "");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Form Rekrutmen Divisi IT</h2>
        
        <form onSubmit={handleSubmit}>
          {/* 3 Inputan Teks */}
          <InputField label="Nama Lengkap" type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Ketik nama anda..." error={errors.nama} />
          <InputField label="Nomor HP / WA" type="text" name="noHp" value={formData.noHp} onChange={handleChange} placeholder="0812..." error={errors.noHp} />
          <InputField label="Umur" type="text" name="umur" value={formData.umur} onChange={handleChange} placeholder="Contoh: 20" error={errors.umur} />

          {/* 2 Select Dropdown */}
          <SelectField label="Divisi Tujuan" name="divisi" value={formData.divisi} onChange={handleChange} options={["Frontend Developer", "Backend Developer", "UI/UX Designer"]} error={errors.divisi} />
          <SelectField label="Pengalaman Kerja" name="pengalaman" value={formData.pengalaman} onChange={handleChange} options={["Fresh Graduate", "1-2 Tahun", "Lebih dari 2 Tahun"]} error={errors.pengalaman} />

          {/* CONDITIONAL RENDERING: Tombol Submit */}
          <div className="mt-6">
            {isFormValid ? (
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg shadow-md transition duration-300">
                Kirim Lamaran
              </button>
            ) : (
              <div className="w-full bg-gray-200 text-gray-500 font-bold p-3 rounded-lg text-center border-2 border-dashed border-gray-300">
                Lengkapi data dengan benar
              </div>
            )}
          </div>
        </form>

        {/* CONDITIONAL RENDERING: Hasil Akhir */}
        {isSubmitted && (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded text-green-800">
            <h3 className="font-bold text-lg mb-2">✅ Data Berhasil Disimpan!</h3>
            <ul className="list-disc ml-5 text-sm">
              <li>Nama: {formData.nama}</li>
              <li>No HP: {formData.noHp}</li>
              <li>Umur: {formData.umur} Tahun</li>
              <li>Divisi: {formData.divisi} ({formData.pengalaman})</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}