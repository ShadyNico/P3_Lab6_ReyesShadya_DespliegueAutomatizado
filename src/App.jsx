//import { useState } from 'react';
import './App.css'
//import './components/UseCard/UseCard.css';
import { Layout } from './components/layout/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InicioPage, NosotrosPage, ContactoPage, EquipoPage, PersonajePage } from './pages'

function App() {
  return (
    <BrowserRouter>
    <Layout>
        <Routes>
            <Route path="/" element={<InicioPage/>}/>
            <Route path="/nosotros" element={<NosotrosPage/>}/>
            <Route path="/contactos" element={<ContactoPage/>}/>
            <Route path="/equipo" element={<EquipoPage/>}/>
            <Route path="/personajes" element={<PersonajePage/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
    //<></>esto es un fragmento que enuelve el codigo que no se agrega al dom
  )
};

export default App;
