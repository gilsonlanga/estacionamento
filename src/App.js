import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import CadastroVagas from './pages/CadastroVagas';
import Home from './pages/Home';
import ListaVagas from './pages/ListaVagas';
import DetalhesVaga from './pages/DetalhesVaga';
import AlteracaoVaga from './pages/AlteracaoVaga';


function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroVagas />} />
          <Route path="/lista" element={<ListaVagas />} />
          <Route path="/detalhes/:id" element={<DetalhesVaga />} />
          <Route path="/alteracao/:id" element={<AlteracaoVaga />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
