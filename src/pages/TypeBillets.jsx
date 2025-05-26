import React, { useEffect, useState } from "react";
import axios from "axios";
import CrudManager from "../components/CrudManager";
import "../css/TypeBillets.css"; // ⬅️ Import du CSS

const TypeBillets = () => {
  const [typeBillets, setTypeBillets] = useState([]);

  useEffect(() => {
    fetchTypeBillets();
  }, []);

  const fetchTypeBillets = () => {
    axios
      .get("http://localhost:8080/api/type-billets")
      .then((res) => setTypeBillets(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des types de billets :", err)
      );
  };

  return (
    <div className="typebillets-container">
      <h1 className="typebillets-title">
        Bienvenue sur notre site de réservation de billets d'avion
      </h1>

      <CrudManager
        apiUrl="http://localhost:8080/api/type-billets"
        title="Gestion des Types de Billets"
        fields={[
          { name: "libelle", label: "Libellé", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
        ]}
        data={typeBillets}
        onUpdateSuccess={fetchTypeBillets}
      />
    </div>
  );
};

export default TypeBillets;
