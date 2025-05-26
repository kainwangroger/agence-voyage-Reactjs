import React, { useEffect, useState } from "react";
import ReservationCrudManager from "../components/ReservationCrudManager";
import axios from "axios";
import "../css/Reservations.css";

const Reservations = () => {
  const [clients, setClients] = useState([]);
  const [voyages, setVoyages] = useState([]);

  useEffect(() => {
    // Récupère les clients depuis le backend
    axios
      .get("http://localhost:8080/api/clients")
      .then((res) => setClients(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des clients :", err)
      );

    // Récupère les voyages depuis le backend
    axios
      .get("http://localhost:8080/api/voyages")
      .then((res) => setVoyages(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des voyages :", err)
      );
  }, []);

  const typeBilletOptions = [
    { value: 1, label: "Économique" },
    { value: 2, label: "Business" },
    { value: 3, label: "Première Classe" },
  ];

  const statusOptions = [
    { value: "Confirmé", label: "Confirmé" },
    { value: "En attente", label: "En attente" },
    { value: "Annulé", label: "Annulé" },
  ];

  return (
    <div className="reservations-container">
      <h1 className="reservations-title">
        Bienvenue sur notre site de réservation de billets d'avion
      </h1>
      <ReservationCrudManager
        apiUrl="http://localhost:8080/api/reservations"
        title="Gestion des Réservations"
        fields={[
          {
            name: "client",
            label: "Client",
            type: "select",
            options: clients.map((client) => ({
              value: client.id,
              label: `${client.nom} ${client.prenom}`,
            })),
          },
          {
            name: "voyage",
            label: "Voyage",
            type: "select",
            options: voyages.map((voyage) => ({
              value: voyage.id,
              label: `${voyage.destination} - ${voyage.dateDepart}`,
            })),
          },
          {
            name: "typeBillet",
            label: "Type de Billet",
            type: "select",
            options: typeBilletOptions,
          },
          {
            name: "dateReservation",
            label: "Date de Réservation",
            type: "date",
          },
          {
            name: "nombrePersonnes",
            label: "Nombre de Personnes",
            type: "number",
          },
          {
            name: "dateDepart",
            label: "Date de Départ",
            type: "date",
          },
          {
            name: "statut",
            label: "Statut",
            type: "select",
            options: statusOptions,
          },
        ]}
      />
    </div>
  );
};

export default Reservations;
