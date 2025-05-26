import { useState } from "react";
import axios from "axios";
import "../css/FormulaireReservation.css"; // Assurez-vous d'avoir ce fichier CSS

const FormulaireTypeBillet = () => {
  const [typeBillet, setTypeBillet] = useState({
    nom: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTypeBillet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!typeBillet.nom || !typeBillet.description) {
      setErrorMessage("Tous les champs sont obligatoires.");
      setSuccessMessage("");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/typebillet", typeBillet);
      setSuccessMessage("Type de billet ajouté !");
      setErrorMessage("");
      setTypeBillet({ nom: "", description: "" }); // Réinitialisation du formulaire
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur lors de l’ajout.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="typebillet-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Ajouter un type de billet</h2>

      <input
        className="form-input"
        type="text"
        name="nom"
        placeholder="Nom"
        value={typeBillet.nom}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        type="text"
        name="description"
        placeholder="Description"
        value={typeBillet.description}
        onChange={handleChange}
        required
      />

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Ajout en cours..." : "Ajouter Type de billet"}
      </button>

      {successMessage && <p className="message success">{successMessage}</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
    </form>
  );
};

export default FormulaireTypeBillet;
