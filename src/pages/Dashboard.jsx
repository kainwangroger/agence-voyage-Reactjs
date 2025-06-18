import React, { useEffect, useState } from "react";
import axios from "axios";
import CrudManager from "../components/CrudManager";
import ReservationCrudManager from "../components/ReservationCrudManager";

import "../css/dashbord.css"; // Tu peux renommer ou adapter

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    clients: 0,
    voyages: 0,
    typeBillets: 0,
    reservations: 0,
  });

  const [clients, setClients] = useState([]);
  const [voyages, setVoyages] = useState([]);
  const [reservations, setReservations] = useState([]);

  const fetchData = async () => {
    try {
      const [clientsRes, voyagesRes, billetsRes, reservationsRes] =
        await Promise.all([
          axios.get("http://localhost:8080/api/clients"),
          axios.get("http://localhost:8080/api/voyages"),
          axios.get("http://localhost:8080/api/type-billets"),
          axios.get("http://localhost:8080/api/reservations"),
        ]);

      setClients(clientsRes.data);
      setVoyages(voyagesRes.data);
      setReservations(reservationsRes.data);

      setStats({
        clients: clientsRes.data.length,
        voyages: voyagesRes.data.length,
        typeBillets: billetsRes.data.length,
        reservations: reservationsRes.data.length,
      });
    } catch (err) {
      console.error("Erreur lors du chargement des données", err);
    }
  };
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

  useEffect(() => {
    fetchData();
  }, []);

  const clientFields = [
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
  ];

  const voyageFields = [
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
  ];

  const reservationFields = [
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
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Admin</h1>
      <div className="cards-container">
        <div className="section">
          <h2>Clients</h2>
          <p>{stats.clients}</p>
        </div>
        <div className="section">
          <h2>Voyages</h2>
          <p>{stats.voyages}</p>
        </div>
        <div className="section">
          <h2>Types de billets</h2>
          <p>{stats.typeBillets}</p>
        </div>
        <div className="section">
          <h2>Réservations</h2>
          <p>{stats.reservations}</p>
        </div>
      </div>

      <CrudManager
        apiUrl="http://localhost:8080/api/clients"
        title="Gestion des Clients"
        fields={clientFields}
        data={clients}
        onUpdateSuccess={fetchData}
      />

      <CrudManager
        apiUrl="http://localhost:8080/api/voyages"
        title="Gestion des Voyages"
        fields={voyageFields}
        data={voyages}
        onUpdateSuccess={fetchData}
      />

      <ReservationCrudManager
        apiUrl="http://localhost:8080/api/reservations"
        title="Gestion des Réservations"
        fields={reservationFields}
        data={reservations}
        onUpdateSuccess={fetchData}
      />
    </div>
  );
};

export default AdminDashboard;
