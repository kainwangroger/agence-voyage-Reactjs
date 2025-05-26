import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import "../css/FormulaireReservation.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !motDePasse) {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setErreur("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        motDePasse,
      });

      const data = res.data;

      // ✅ Si ton backend retourne { email, role, nom, prenom }
      if (data.email && data.role) {
        // Enregistre uniquement le user (pas de token ici)
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: data.email,
            role: data.role,
            nom: data.nom,
            prenom: data.prenom,
          })
        );

        setSuccess("Connexion réussie !");
        navigate("/", {
          state: { message: "Vous êtes connecté !" },
        });

        // ✅ Force le rechargement du composant Navigations s’il ne détecte pas le changement
        window.location.reload(); // tu peux commenter cette ligne si tout marche sans ça
      } else {
        setErreur("Réponse inattendue du serveur.");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      if (err.response?.status === 401) {
        setErreur("Identifiants incorrects.");
      } else {
        setErreur("Erreur serveur ou réseau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {erreur && <p className="message error">{erreur}</p>}
        {success && <p className="message success">{success}</p>}
      </form>

      <div className="link-container">
        <p>
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
        <p>
          <Link to="/">← Retour à l'accueil</Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;

// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// // import "../css/FormulaireReservation.css";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [motDePasse, setMotDePasse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [erreur, setErreur] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !motDePasse) {
//       setErreur("Veuillez remplir tous les champs.");
//       return;
//     }

//     setLoading(true);
//     setErreur("");
//     setSuccess("");

//     try {
//       const res = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         motDePasse,
//       });

//       const data = res.data;

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem(
//           "user",
//           JSON.stringify(data.user || { email: data.email })
//         );
//         setSuccess("Connexion réussie !");
//         navigate("/", {
//           state: { message: "Vous êtes connecté avec token !" },
//         });
//       } else if (data.email && data.role) {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             email: data.email,
//             role: data.role,
//             nom: data.nom,
//             prenom: data.prenom,
//           })
//         );
//         setSuccess("Connexion réussie !");
//         navigate("/", {
//           state: { message: "Vous êtes connecté !" },
//         });
//       } else {
//         setErreur("Réponse inattendue du serveur.");
//       }
//     } catch (err) {
//       console.error("Erreur lors de la connexion :", err);
//       if (err.response?.status === 401) {
//         setErreur("Identifiants incorrects.");
//       } else {
//         setErreur("Erreur serveur ou réseau.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <input
//           className="form-input"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           className="form-input"
//           type="password"
//           placeholder="Mot de passe"
//           value={motDePasse}
//           onChange={(e) => setMotDePasse(e.target.value)}
//           required
//         />
//         <button className="submit-button" type="submit" disabled={loading}>
//           {loading ? "Connexion..." : "Se connecter"}
//         </button>

//         {erreur && <p className="message error">{erreur}</p>}
//         {success && <p className="message success">{success}</p>}
//       </form>

//       <div className="link-container">
//         <p>
//           Pas encore de compte ? <Link to="/register">S'inscrire</Link>
//         </p>
//         <p>
//           <Link to="/">← Retour à l'accueil</Link>
//         </p>
//       </div>
//     </>
//   );
// };

// export default LoginForm;
