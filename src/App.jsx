import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/layout'
import {
  ContactoPage,
  Dashboard,
  EquipoPage,
  InicioPage,
  LoginPage,
  MuiCardPage,
  NosotrosPage,
  PersonajePage,
  Productos,
  RegisterPage,
} from './pages'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<InicioPage />} />
                <Route path="/nosotros" element={<NosotrosPage />} />
                <Route path="/contactos" element={<ContactoPage />} />
                <Route path="/equipo" element={<EquipoPage />} />
                <Route path="/personajes" element={<PersonajePage />} />
                <Route path="/mui-cards" element={<MuiCardPage />} />
                <Route
                  path="/productos"
                  element={
                    <ProtectedRoute>
                      <Productos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
