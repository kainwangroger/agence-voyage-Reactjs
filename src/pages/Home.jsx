import React, { useEffect, useState } from "react";
import axios from "axios";
import {} from "react-router-dom";

import "../css//Home.css"; // ⬅️ N'oublie pas d'importer le fichier CSS

const Home = () => {
  const [stats, setStats] = useState({
    clients: 0,
    voyages: 0,
    typeBillets: 0,
    reservations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, voyagesRes, typeBilletsRes, reservationsRes] =
          await Promise.all([
            axios.get("http://localhost:8080/api/clients"),
            axios.get("http://localhost:8080/api/voyages"),
            axios.get("http://localhost:8080/api/type-billets"),
            axios.get("http://localhost:8080/api/reservations"),
          ]);

        setStats({
          clients: clientsRes.data.length,
          voyages: voyagesRes.data.length,
          typeBillets: typeBilletsRes.data.length,
          reservations: reservationsRes.data.length,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Tableau de Bord</h1>
      <div className="cards-container">
        <div className="stat-card">
          <h2>Clients</h2>
          <p>{stats.clients}</p>
        </div>
        <div className="stat-card">
          <h2>Voyages</h2>
          <p>{stats.voyages}</p>
        </div>
        <div className="stat-card">
          <h2>Types de billet</h2>
          <p>{stats.typeBillets}</p>
        </div>
        <div className="stat-card">
          <h2>Réservations</h2>
          <p>{stats.reservations}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
