import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './biodata/custom.css';
import BiodataDiri from './Biodata/BiodataDiri.jsx'; 
import TugasForm from './pertemuan-3/TugasForm.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <div>
    <App />
  </div>
);

