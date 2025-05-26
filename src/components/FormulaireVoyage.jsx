import { useState } from "react";
import axios from "axios";
import "../css/FormulaireReservation.css";

const FormulaireVoyage = () => {
  const [formData, setFormData] = useState({
    villeDepart: "",
    villeArrivee: "",
    dateDepart: "",
    prix: 0,
    nombrePlaces: 1,
    libelle: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "prix" || name === "nombrePlaces" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs requis
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        setErrorMessage("Tous les champs sont requis.");
        setSuccessMessage("");
        return;
      }
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/voyages", formData);
      setSuccessMessage("Voyage soumis avec succès !");
      setErrorMessage("");

      // Réinitialiser le formulaire
      setFormData({
        villeDepart: "",
        villeArrivee: "",
        dateDepart: "",
        prix: 0,
        nombrePlaces: 1,
        libelle: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur lors de la soumission du voyage.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="voyage-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Formulaire de Voyage</h2>

      <label>Ville de départ :</label>
      <input
        type="text"
        name="villeDepart"
        value={formData.villeDepart}
        onChange={handleChange}
        required
      />

      <label>Ville d’arrivée :</label>
      <input
        type="text"
        name="villeArrivee"
        value={formData.villeArrivee}
        onChange={handleChange}
        required
      />

      <label>Date de départ :</label>
      <input
        type="date"
        name="dateDepart"
        value={formData.dateDepart}
        onChange={handleChange}
        required
      />

      <label>Prix (€) :</label>
      <input
        type="number"
        name="prix"
        value={formData.prix}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />

      <label>Nombre de places :</label>
      <input
        type="number"
        name="nombrePlaces"
        value={formData.nombrePlaces}
        onChange={handleChange}
        required
        min="1"
      />

      <label>Libellé :</label>
      <input
        type="text"
        name="libelle"
        value={formData.libelle}
        onChange={handleChange}
        required
      />

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Soumission..." : "Soumettre Voyage"}
      </button>

      {successMessage && <p className="message success">{successMessage}</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
    </form>
  );
};

export default FormulaireVoyage;
