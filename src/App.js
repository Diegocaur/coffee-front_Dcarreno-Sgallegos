// import logo from './logo.svg';
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/menu.css";
import "./styles/normalize.css";
import "./styles/home.css";
import { Home } from "./pages/Home";
import { Coffes } from "./pages/Coffes";
import { Page2 } from "./pages/Page2";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer/footer";
import AcercaDePage from "./pages/AcercaDePage";
import { AuthProvider } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import CreateCoffe from "./components/FormularioCoffee";
import { PrivateRoute } from "./auth/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import TablaCoffees from "./pages/TablaCoffees";
import TablaClientes from "./pages/TablaClientes";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<Coffes />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/acercade" element={<AcercaDePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
          <Route
            path="/vercoffees"
            element={
              <PrivateRoute>
                <TablaCoffees></TablaCoffees>
              </PrivateRoute>
            }
          />
          <Route
            path="/verclientes"
            element={
              <PrivateRoute>
                <TablaClientes></TablaClientes>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<p>Ups, no existe la ruta</p>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
