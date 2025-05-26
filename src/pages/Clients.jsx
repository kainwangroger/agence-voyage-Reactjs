import React, { useEffect, useState } from "react";
import axios from "axios";
import CrudManager from "../components/CrudManager";
import "../css/Clients.css";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios
      .get("http://localhost:8080/api/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Erreur chargement clients :", err));
  };

  return (
    <div className="clients-container">
      <h1 className="clients-title">
        Bienvenue sur notre système de gestion des clients
      </h1>
      <CrudManager
        title="Liste des Clients"
        apiUrl="http://localhost:8080/api/clients"
        data={clients}
        onUpdateSuccess={fetchClients}
        readOnly={false}
        fields={[
          { name: "nom", label: "Nom", type: "text", required: true },
          { name: "prenom", label: "Prénom", type: "text", required: true },
          { name: "sexe", label: "Sexe", type: "text", required: true },
          {
            name: "nationalite",
            label: "Nationalité",
            type: "text",
            required: true,
          },
          { name: "adresse", label: "Adresse", type: "text", required: true },
          {
            name: "dateNaissance",
            label: "Date de naissance",
            type: "date",
            required: true,
          },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "telephone", label: "Téléphone", type: "text" },
          {
            name: "dateDeNaissance",
            label: "Date De Naissance",
            type: "date",
            required: true,
          },
          {
            name: "motDePasse",
            label: "Mot De Passe",
            type: "text",
            required: true,
          },
          { name: "role", label: "role", type: "role", required: true },
        ]}
      />
    </div>
  );
};

export default Clients;
