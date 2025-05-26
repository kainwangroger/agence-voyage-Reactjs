import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Voyages from "./pages/Voyages";
import Reservations from "./pages/Reservations";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import TypeBillets from "./pages/TypeBillets";
import { getUserRole } from "./utils/auth";
import Layout from "./components/Layout";

function App() {
  const role = getUserRole();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes spécifiques à l’ADMIN */}
          {role === "ADMIN" && (
            <>
              <Route path="/clients" element={<Clients />} />
              <Route path="/voyages" element={<Voyages />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/type-billets" element={<TypeBillets />} />
            </>
          )}

          {/* Routes spécifiques au CLIENT */}
          {role === "CLIENT" && (
            <>
              <Route path="/voyages" element={<Voyages />} />
              <Route path="/reservations" element={<Reservations />} />
            </>
          )}

          {/* Fallback après tout (si pas de route matchée) */}
          <Route path="*" element={<h1>Page non trouvée</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// // // UtilisateursList.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Voyages from "./pages/Voyages";
// import Clients from "./pages/Clients";
// import TypeBillets from "./pages/TypeBillets";
// import Reservations from "./pages/Reservations";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/voyages" element={<Voyages />} />
//           <Route path="/clients" element={<Clients />} />
//           <Route path="/typebillets" element={<TypeBillets />} />
//           <Route path="/reservations" element={<Reservations />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="*" element={<Home />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// };

// export default App;
