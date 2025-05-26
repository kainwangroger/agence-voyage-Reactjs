import React from "react";
import RegisterForm from "../components/RegisterForm";
import "../css/Register.css"; // ⬅️ Import du CSS

const Register = () => {
  return (
    <>
      <h1 className="login-title">
        Bienvenue sur notre site de réservation de billets d'avion
      </h1>
      <div className="login-container">
        <h2 className="login-heading">
          {" "}
          Veuillez vous inscrire pour continuer.
        </h2>
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
