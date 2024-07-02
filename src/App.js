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
import { Cursos } from "./pages/Cursos";
import { MiCurso } from "./components/MiCurso";
import { AuthProvider } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import CreateCoffe from "./pages/CreateCoffe";
import { PrivateRoute } from "./auth/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<Coffes />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/cursos" element={<Cursos />}>
            <Route path=":url" element={<MiCurso />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
          <Route
            path="/nuevo-coffee"
            element={
              <PrivateRoute>
                <CreateCoffe />
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
