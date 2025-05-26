import React, { useEffect, useState } from "react";
import axios from "axios";
import CrudManager from "../components/CrudManager";
import "../css/Voyages.css";

const Voyages = () => {
  const [voyages, setVoyages] = useState([]);

  useEffect(() => {
    fetchVoyages();
  }, []);

  const fetchVoyages = () => {
    axios
      .get("http://localhost:8080/api/voyages")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVoyages(res.data);
        } else {
          console.error("Données reçues non valides :", res.data);
          setVoyages([]); // pour éviter le crash
        }
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des voyages :", err)
      );
  };

  return (
    <div className="voyages-container">
      <h1 className="voyages-title">
        Bienvenue sur notre site de réservation de billets d'avion
      </h1>
      <p className="voyages-subtitle">
        Veuillez remplir les informations sur le voyage :
      </p>

      <CrudManager
        apiUrl="http://localhost:8080/api/voyages"
        title="Gestion des Voyages"
        fields={[
          {
            name: "villeDepart",
            label: "Ville de départ",
            type: "text",
            required: true,
          },
          {
            name: "villeArrivee",
            label: "Ville d'arrivée",
            type: "text",
            required: true,
          },
          {
            name: "dateDepart",
            label: "Date de départ",
            type: "date",
            required: true,
          },
          { name: "prix", label: "Prix", type: "number", required: true },
          {
            name: "nombrePlaces",
            label: "Nombre de places",
            type: "number",
            required: true,
          },
          { name: "libelle", label: "Libellé", type: "text", required: true },
        ]}
        data={voyages}
        onUpdateSuccess={fetchVoyages}
      />
    </div>
  );
};

export default Voyages;
