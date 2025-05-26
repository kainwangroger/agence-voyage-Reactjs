import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Navigations.css";

const Navigations = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className="nav-link">
            Accueil
          </NavLink>
        </li>

        {/* Si client ou admin */}
        {user?.role === "CLIENT" && (
          <>
            <li>
              <NavLink to="/voyages" className="nav-link">
                Acheter un billet de Voyage
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservations" className="nav-link">
                Faire une Réservation
              </NavLink>
            </li>
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <li>
              <NavLink to="/voyages" className="nav-link">
                Gestion des Voyages
              </NavLink>
            </li>
            <li>
              <NavLink to="/clients" className="nav-link">
                Gestion des Clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservations" className="nav-link">
                Gestion des Réservations
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                Dashboard Admin
              </NavLink>
            </li>
          </>
        )}

        <li>
          {user ? (
            <button className="nav-link" onClick={handleLogout}>
              Se Déconnecter
            </button>
          ) : (
            <NavLink to="/login" className="nav-link">
              Se Connecter
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigations;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../css/Navigations.css"; // Assurez-vous d'avoir ce fichier CSS
// import { useNavigate } from "react-router-dom";

// const Navigations = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/", { replace: true }); // on supprime le message (pas de state)
//   };
//   return (
//     <nav className="navigation">
//       <ul className="nav-list">
//         <li>
//           <NavLink to="/" className="nav-link">
//             Accueil
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/voyages" className="nav-link">
//             Voyages
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/clients" className="nav-link">
//             Clients
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/reservations" className="nav-link">
//             Réservations
//           </NavLink>
//         </li>
//         <li>
//           {/* // Si l'utilisateur est connecté, on affiche le bouton de déconnexion */}
//           {localStorage.getItem("user") ? (
//             <button className="nav-link" onClick={handleLogout}>
//               Se Déconnecter
//             </button>
//           ) : (
//             <NavLink to="/login" className="nav-link">
//               Se Connerter
//             </NavLink>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navigations;
