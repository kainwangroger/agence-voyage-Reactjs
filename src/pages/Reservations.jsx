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
            placeholder: "Choisir un client",
            options: clients.map((client) => ({
              value: client.id,
              label: `${client.nom} ${client.prenom}`,
            })),
          },
          {
            name: "voyage",
            label: "Voyage",
            type: "select",
            placeholder: "Choisir un voyage",
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
            placeholder: "Choisir un type de billet",
          },
          {
            name: "dateReservation",
            label: "Date de Réservation",
            type: "date",
            placeholder: "Entrez la date de réservation",
          },
          {
            name: "nombrePersonnes",
            label: "Nombre de Personnes",
            type: "number",
            placeholder: "Entrez le nombre de personnes",
          },
          {
            name: "dateDepart",
            label: "Date de Départ",
            type: "date",
            placeholder: "Entrez la date de départ",
          },
          {
            name: "statut",
            label: "Statut",
            type: "select",
            options: statusOptions,
            placeholder: "Choisir un statut",
          },
        ]}
      />
    </div>
  );
};

export default Reservations;
