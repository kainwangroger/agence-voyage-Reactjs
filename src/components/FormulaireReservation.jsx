import { useState } from "react";
import axios from "axios";
import "../css/FormulaireReservation.css";

const FormulaireReservation = () => {
  const [reservation, setReservation] = useState({
    client: { id: "" },
    voyage: { id: "" },
    typeBillet: { id: "" },
    dateReservation: "",
    dateDepart: "",
    nombrePersonnes: 1,
    statut: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["client", "voyage", "typeBillet"].includes(name)) {
      setReservation((prev) => ({
        ...prev,
        [name]: { id: value },
      }));
    } else {
      setReservation((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (
      !reservation.client.id ||
      !reservation.voyage.id ||
      !reservation.typeBillet.id ||
      !reservation.dateDepart ||
      !reservation.dateReservation ||
      !reservation.nombrePersonnes ||
      !reservation.statut
    ) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setSuccessMessage("");
      return;
    }

    const payload = {
      clientId: parseInt(reservation.client.id),
      voyageId: parseInt(reservation.voyage.id),
      typeBilletId: parseInt(reservation.typeBillet.id),
      dateReservation: reservation.dateReservation,
      dateDepart: reservation.dateDepart,
      nombrePersonnes: parseInt(reservation.nombrePersonnes),
      statut: reservation.statut,
    };

    console.log("Payload envoyé au backend :", payload);

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/reservations", payload);
      setSuccessMessage("Réservation effectuée avec succès !");
      setErrorMessage("");
      setReservation({
        client: { id: "" },
        voyage: { id: "" },
        typeBillet: { id: "" },
        dateReservation: "",
        dateDepart: "",
        nombrePersonnes: 1,
        statut: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur lors de la réservation.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Formulaire de Réservation</h2>

      <input
        name="client"
        placeholder="ID du client"
        value={reservation.client.id}
        onChange={handleChange}
        className="form-input"
        required
      />
      <input
        name="voyage"
        placeholder="ID du voyage"
        value={reservation.voyage.id}
        onChange={handleChange}
        className="form-input"
        required
      />
      <input
        name="typeBillet"
        placeholder="ID du type de billet"
        value={reservation.typeBillet.id}
        onChange={handleChange}
        className="form-input"
        required
      />
      <input
        type="date"
        name="dateReservation"
        value={reservation.dateReservation}
        onChange={handleChange}
        className="form-input"
        required
      />
      <input
        type="date"
        name="dateDepart"
        value={reservation.dateDepart}
        onChange={handleChange}
        className="form-input"
        required
      />
      <input
        type="number"
        name="nombrePersonnes"
        value={reservation.nombrePersonnes}
        onChange={handleChange}
        className="form-input"
        min="1"
        required
      />
      <input
        type="text"
        name="statut"
        value={reservation.statut}
        onChange={handleChange}
        className="form-input"
        required
      />

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Réservation en cours..." : "Réserver"}
      </button>

      {successMessage && <p className="message success">{successMessage}</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
    </form>
  );
};

export default FormulaireReservation;

// import { useState } from "react";
// import axios from "axios";
// import "../css/FormulaireReservation.css"; // Ton fichier CSS personnalisé

// const FormulaireReservation = () => {
//   const [reservation, setReservation] = useState({
//     clientId: "",
//     voyageId: "",
//     typeBilletId: "",
//     dateDepart: "",
//     nombrePersonnes: 1,
//   });

//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setReservation((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation simple (vérifie les IDs et les champs principaux)
//     if (
//       !reservation.client.id ||
//       !reservation.voyage.id ||
//       !reservation.typeBillet.id ||
//       !reservation.dateDepart ||
//       !reservation.nombrePersonnes
//     ) {
//       setErrorMessage("Veuillez remplir tous les champs.");
//       setSuccessMessage("");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:8080/api/reservations", reservation);
//       setSuccessMessage("Réservation effectuée avec succès !");
//       setErrorMessage("");
//       setReservation({
//         client: { id: "" },
//         voyage: { id: "" },
//         typeBillet: { id: "" },
//         dateReservation: "", // optionnel si géré côté backend
//         dateDepart: "",
//         nombrePersonnes: 1,
//       });
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Erreur lors de la réservation.");
//       setSuccessMessage("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="reservation-form" onSubmit={handleSubmit}>
//       <h2 className="form-title">Formulaire de Réservation</h2>

//       <input
//         name="client"
//         placeholder="ID du client"
//         value={reservation.client.id}
//         onChange={handleChange}
//         className="form-input"
//         required
//       />
//       <input
//         name="voyage"
//         placeholder="ID du voyage"
//         value={reservation.voyage.id}
//         onChange={handleChange}
//         className="form-input"
//         required
//       />
//       <input
//         name="typeBillet"
//         placeholder="ID du type de billet"
//         value={reservation.typeBillet.id}
//         onChange={handleChange}
//         className="form-input"
//         required
//       />
//       <input
//         type="date"
//         name="dateReservation"
//         value={reservation.dateReservation}
//         onChange={handleChange}
//         className="form-input"
//         required
//       />
//       <input
//         type="date"
//         name="dateDepart"
//         value={reservation.dateDepart}
//         onChange={handleChange}
//         className="form-input"
//         required
//       />
//       <input
//         type="number"
//         name="nombrePersonnes"
//         value={reservation.nombrePersonnes}
//         onChange={handleChange}
//         className="form-input"
//         min="1"
//         required
//       />

//       <button className="submit-button" type="submit" disabled={loading}>
//         {loading ? "Réservation en cours..." : "Réserver"}
//       </button>

//       {successMessage && <p className="message success">{successMessage}</p>}
//       {errorMessage && <p className="message error">{errorMessage}</p>}
//     </form>
//   );
// };

// export default FormulaireReservation;
