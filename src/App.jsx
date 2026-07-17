import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PaginaInicio from './components/Home/Home';
import VistaObra from './components/VistaObra/VistaObra';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PaginaInicio />} />
        <Route path="/art/:id" element={<VistaObra />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;