// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/CrudManager.css";

// const ReservationCrudManager = ({ apiUrl, title, onUpdateSuccess }) => {
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     client: { id: "" },
//     voyage: { id: "" },
//     typeBillet: { id: "" },
//     dateReservation: "",
//     dateDepart: "",
//     nombrePersonnes: 1,
//     statut: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [clients, setClients] = useState([]);
//   const [voyages, setVoyages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//     fetchClients();
//     fetchVoyages();
//   }, []);

//   const fetchData = async () => {
//     const res = await axios.get(apiUrl);
//     setData(res.data);
//   };

//   const fetchClients = async () => {
//     const res = await axios.get("http://localhost:8080/api/clients");
//     setClients(res.data);
//   };

//   const fetchVoyages = async () => {
//     const res = await axios.get("http://localhost:8080/api/voyages");
//     setVoyages(res.data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["client", "voyage", "typeBillet"].includes(name)) {
//       setFormData((prev) => ({ ...prev, [name]: { id: value } }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       clientId: parseInt(formData.client.id),
//       voyageId: parseInt(formData.voyage.id),
//       typeBilletId: parseInt(formData.typeBillet.id),
//       dateReservation: formData.dateReservation,
//       dateDepart: formData.dateDepart,
//       nombrePersonnes: parseInt(formData.nombrePersonnes),
//       statut: formData.statut,
//     };

//     try {
//       setLoading(true);
//       if (editingId) {
//         await axios.put(`${apiUrl}/${editingId}`, payload);
//       } else {
//         await axios.post(apiUrl, payload);
//       }
//       fetchData();
//       onUpdateSuccess && onUpdateSuccess();
//       setFormData({
//         client: { id: "" },
//         voyage: { id: "" },
//         typeBillet: { id: "" },
//         dateReservation: "",
//         dateDepart: "",
//         nombrePersonnes: 1,
//         statut: "",
//       });
//       setEditingId(null);
//     } catch (err) {
//       console.error("Erreur CRUD :", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       client: { id: item.client.id },
//       voyage: { id: item.voyage.id },
//       typeBillet: { id: item.typeBillet.id },
//       dateReservation: item.dateReservation,
//       dateDepart: item.dateDepart,
//       nombrePersonnes: item.nombrePersonnes,
//       statut: item.statut,
//     });
//     setEditingId(item.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${apiUrl}/${id}`);
//     fetchData();
//   };

//   return (
//     <div className="crud-container">
//       <h2>{title}</h2>

//       <form onSubmit={handleSubmit} className="crud-form">
//         <select
//           name="client"
//           value={formData.client.id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Choisir un client --</option>
//           {clients.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.nom} {c.prenom}
//             </option>
//           ))}
//         </select>

//         <select
//           name="voyage"
//           value={formData.voyage.id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Choisir un voyage --</option>
//           {voyages.map((v) => (
//             <option key={v.id} value={v.id}>
//               {v.villeDepart} → {v.villeArrivee} ({v.dateDepart})
//             </option>
//           ))}
//         </select>

//         <select
//           name="typeBillet"
//           value={formData.typeBillet.id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Type de billet --</option>
//           <option value={1}>Standard</option>
//           <option value={2}>Premium</option>
//           <option value={3}>VIP</option>
//         </select>

//         <input
//           type="date"
//           name="dateReservation"
//           value={formData.dateReservation}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="date"
//           name="dateDepart"
//           value={formData.dateDepart}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="nombrePersonnes"
//           min="1"
//           value={formData.nombrePersonnes}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="statut"
//           value={formData.statut}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Statut --</option>
//           <option value="Confirmé">Confirmé</option>
//           <option value="En attente">En attente</option>
//           <option value="Annulé">Annulé</option>
//         </select>

//         <button type="submit" disabled={loading}>
//           {editingId ? "Mettre à jour" : "Ajouter"}
//         </button>
//       </form>

//       <table className="crud-table">
//         <thead>
//           <tr>
//             <th>Client</th>
//             <th>Voyage</th>
//             <th>Type de Billet</th>
//             <th>Date Réservation</th>
//             <th>Date Départ</th>
//             <th>Personnes</th>
//             <th>Statut</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((r) => (
//             <tr key={r.id}>
//               <td>
//                 {r.client.nom} {r.client.prenom}
//               </td>
//               <td>{["Standard", "Premium", "VIP"][r.typeBillet.id - 1]}</td>
//               <td>{r.dateReservation}</td>
//               <td>{r.dateDepart}</td>
//               <td>{r.nombrePersonnes}</td>
//               <td>{r.statut}</td>
//               <td>
//                 <button
//                   className="crud-button edit"
//                   onClick={() => handleEdit(r)}
//                 >
//                   Modifier
//                 </button>
//                 <button
//                   className="crud-button delete"
//                   onClick={() => handleDelete(r.id)}
//                 >
//                   Supprimer
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservationCrudManager;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ReservationCrudManager.css";

const ReservationCrudManager = ({ apiUrl, title, onUpdateSuccess }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    client: { id: "" },
    voyage: { id: "" },
    typeBillet: { id: "" },
    dateReservation: "",
    dateDepart: "",
    nombrePersonnes: 1,
    statut: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [clients, setClients] = useState([]);
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchClients();
    fetchVoyages();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(apiUrl);
    setData(res.data);
  };

  const fetchClients = async () => {
    const res = await axios.get("http://localhost:8080/api/clients");
    setClients(res.data);
  };

  const fetchVoyages = async () => {
    const res = await axios.get("http://localhost:8080/api/voyages");
    setVoyages(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["client", "voyage", "typeBillet"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: { id: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      clientId: parseInt(formData.client.id),
      voyageId: parseInt(formData.voyage.id),
      typeBilletId: parseInt(formData.typeBillet.id),
      dateReservation: formData.dateReservation,
      dateDepart: formData.dateDepart,
      nombrePersonnes: parseInt(formData.nombrePersonnes),
      statut: formData.statut,
    };

    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, payload);
      } else {
        await axios.post(apiUrl, payload);
      }
      fetchData();
      onUpdateSuccess && onUpdateSuccess();
      setFormData({
        client: { id: "" },
        voyage: { id: "" },
        typeBillet: { id: "" },
        dateReservation: "",
        dateDepart: "",
        nombrePersonnes: 1,
        statut: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error("Erreur CRUD :", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      client: { id: item.client.id },
      voyage: { id: item.voyage.id },
      typeBillet: { id: item.typeBillet.id },
      dateReservation: item.dateReservation,
      dateDepart: item.dateDepart,
      nombrePersonnes: item.nombrePersonnes,
      statut: item.statut,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchData();
  };

  return (
    <div className="crud-container">
      <h2 className="crud-title">{title}</h2>

      <form onSubmit={handleSubmit} className="crud-form">
        <select
          name="client"
          value={formData.client.id}
          onChange={handleChange}
          required
          className="crud-select"
        >
          <option value="">-- Choisir un client --</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom} {c.prenom}
            </option>
          ))}
        </select>

        <select
          name="voyage"
          value={formData.voyage.id}
          onChange={handleChange}
          required
          className="crud-select"
        >
          <option value="">-- Choisir un voyage --</option>
          {voyages.map((v) => (
            <option key={v.id} value={v.id}>
              {v.villeDepart} → {v.villeArrivee} ({v.dateDepart})
            </option>
          ))}
        </select>

        <select
          name="typeBillet"
          value={formData.typeBillet.id}
          onChange={handleChange}
          required
          className="crud-select"
        >
          <option value="">-- Type de billet --</option>
          <option value={1}>Standard</option>
          <option value={2}>Premium</option>
          <option value={3}>VIP</option>
        </select>

        <input
          type="date"
          name="dateReservation"
          value={formData.dateReservation}
          onChange={handleChange}
          required
          className="crud-input"
        />

        <input
          type="date"
          name="dateDepart"
          value={formData.dateDepart}
          onChange={handleChange}
          required
          className="crud-input"
        />

        <input
          type="number"
          name="nombrePersonnes"
          min="1"
          value={formData.nombrePersonnes}
          onChange={handleChange}
          required
          className="crud-input"
        />

        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          required
          className="crud-select"
        >
          <option value="">-- Statut --</option>
          <option value="Confirmé">Confirmé</option>
          <option value="En attente">En attente</option>
          <option value="Annulé">Annulé</option>
        </select>

        <button type="submit" disabled={loading} className="crud-button submit">
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Voyage</th>
            <th>Type de Billet</th>
            <th>Date Réservation</th>
            <th>Date Départ</th>
            <th>Personnes</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="crud-row">
              <td>
                {r.client.nom} {r.client.prenom}
              </td>
              <td>{["Standard", "Premium", "VIP"][r.typeBillet.id - 1]}</td>
              <td>{r.dateReservation}</td>
              <td>{r.dateDepart}</td>
              <td>{r.dateDepart}</td>
              <td>{r.nombrePersonnes}</td>
              <td>{r.statut}</td>
              <td className="crud-actions">
                <button
                  className="crud-button edit"
                  onClick={() => handleEdit(r)}
                >
                  Modifier
                </button>
                <button
                  className="crud-button delete"
                  onClick={() => handleDelete(r.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationCrudManager;
