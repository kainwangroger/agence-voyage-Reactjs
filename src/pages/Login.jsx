import React from "react";
import LoginForm from "../components/LoginForm";
import "../css//Login.css"; // ⬅️ N'oublie pas d'importer le CSS

const Login = () => {
  return (
    <>
      <h1 className="login-title">
        Bienvenue sur notre site de réservation de billets d'avion
      </h1>
      <div className="login-container">
        <h2 className="login-heading">
          {" "}
          Veuillez vous connecter pour continuer.
        </h2>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
