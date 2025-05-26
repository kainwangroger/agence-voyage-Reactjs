import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../css/RegisterForm.css"; // Assurez-vous d'avoir ce fichier CSS

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    nationalite: "",
    email: "",
    telephone: "",
    adresse: "",
    dateDeNaissance: "",
    motDePasse: "",
    role: "CLIENT", // ou "ADMIN"
  });

  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    if (!formData.email || !formData.motDePasse || !formData.nom) {
      setErreur("Veuillez remplir les champs obligatoires.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);
      setSuccess("Inscription réussie !");
      setFormData({
        nom: "",
        prenom: "",
        sexe: "",
        nationalite: "",
        email: "",
        telephone: "",
        adresse: "",
        dateDeNaissance: "",
        motDePasse: "",
        role: "CLIENT",
      });
      navigate("/login");
    } catch (error) {
      setErreur(
        error.response?.data?.message || "Erreur lors de l'inscription"
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        {erreur && <p className="message error">{erreur}</p>}
        {success && <p className="message success">{success}</p>}

        <input
          className="form-input"
          type="text"
          name="nom"
          placeholder="Nom "
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
        />
        <select
          className="form-input"
          name="sexe"
          value={formData.sexe}
          onChange={handleChange}
        >
          <option value="">Sexe</option>
          <option value="HOMME">Homme</option>
          <option value="FEMME">Femme</option>
        </select>
        <input
          className="form-input"
          type="text"
          name="nationalite"
          placeholder="Nationalité"
          value={formData.nationalite}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email "
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={formData.telephone}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="text"
          name="adresse"
          placeholder="Adresse"
          value={formData.adresse}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="date"
          name="dateDeNaissance"
          placeholder="Date de Naissance"
          value={formData.dateDeNaissance}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="password"
          name="motDePasse"
          placeholder="Mot de passe "
          value={formData.motDePasse}
          onChange={handleChange}
          required
        />

        <button className="submit-button" type="submit">
          S'inscrire
        </button>
      </form>

      <div className="link-container">
        <p>
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
        <p>
          <Link to="/">← Retour à l'accueil</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="register-form">
//         <input
//           type="text"
//           name="nom"
//           placeholder="Nom"
//           value={formData.nom}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />
//         <input
//           type="text"
//           name="prenom"
//           placeholder="Prénom"
//           value={formData.prenom}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />
//         <input
//           type="text"
//           name="sexe"
//           placeholder="Sexe (Homme/Femme)"
//           value={formData.sexe}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />

//         <input
//           type="text"
//           name="nationalite"
//           placeholder="Nationalité"
//           value={formData.nationalité}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Adresse email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />
//         <input
//           type="text"
//           name="telephone"
//           placeholder="Telephone"
//           value={formData.telephone}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />
//         <input
//           type="text"
//           name="adresse"
//           placeholder="Adresse"
//           value={formData.adresse}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />
//         <input
//           type="date"
//           name="dateDeNaissance"
//           placeholder="Date de naissance"
//           value={formData.dateDeNaissance}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />

//         <input
//           type="password"
//           name="motDePasse"
//           placeholder="Mot de passe"
//           value={formData.motDePasse}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />
//         <button type="submit" className="form-button">
//           S'inscrire
//         </button>

//         {erreur && <p className="message error">{erreur}</p>}
//         {success && <p className="message success">{success}</p>}
//       </form>

//       <div className="link-container">
//         <p>
//           Déjà un compte ? <Link to="/login">Se connecter</Link>
//         </p>
//         <p>
//           <Link to="/">← Retour à l'accueil</Link>
//         </p>
//       </div>
//     </>
//   );
// };

// export default RegisterForm;
