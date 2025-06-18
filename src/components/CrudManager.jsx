import React, { useState } from "react";
import axios from "axios";
import "../css/CrudManager.css";

const CrudManager = ({
  apiUrl,
  title,
  fields,
  data = [],
  onUpdateSuccess,
  readOnly = false,
}) => {
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Vérifications
  if (!apiUrl) {
    console.error("Erreur : apiUrl est requis pour CrudManager !");
    return (
      <div style={{ color: "red" }}>Erreur : l'URL de l'API est manquante.</div>
    );
  }

  if (!Array.isArray(data)) {
    console.error("Erreur : la prop `data` doit être un tableau !");
    return (
      <div style={{ color: "red" }}>
        Erreur : les données fournies ne sont pas valides.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editingId) {
      axios.put(`${apiUrl}/${editingId}`, formData).then(() => {
        setFormData({});
        setEditingId(null);
        onUpdateSuccess();
      });
    } else {
      axios.post(apiUrl, formData).then(() => {
        setFormData({});
        onUpdateSuccess();
      });
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    axios.delete(`${apiUrl}/${id}`).then(() => onUpdateSuccess());
  };

  return (
    <div className="crud-container">
      <h3 className="crud-title">{title}</h3>

      {!readOnly && (
        <div className="crud-form">
          {fields.map((field) => (
            <div key={field.name} className="crud-form-group">
              <label className="crud-label">{field.label} :</label>

              {field.type === "select" && field.options ? (
                <select
                  className="crud-input"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">-- Choisir --</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="crud-input"
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={`Entrez ${field.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}

          <button className="crud-button submit" onClick={handleSubmit}>
            {editingId ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      )}

      <table className="crud-table">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.label}</th>
            ))}
            {!readOnly && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {fields.map((field) => (
                <td key={field.name}>{item[field.name]}</td>
              ))}
              {!readOnly && (
                <td>
                  <button
                    className="crud-button edit"
                    onClick={() => handleEdit(item)}
                  >
                    Modifier
                  </button>
                  <button
                    className="crud-button delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Supprimer
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudManager;

// import React, { useState } from "react";
// import axios from "axios";
// import "../css/CrudManager.css";

// const CrudManager = ({
//   apiUrl,
//   title,
//   fields,
//   data = [],
//   onUpdateSuccess,
//   readOnly = false,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [editingId, setEditingId] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (editingId) {
//       axios.put(`${apiUrl}/${editingId}`, formData).then(() => {
//         setFormData({});
//         setEditingId(null);
//         onUpdateSuccess();
//       });
//     } else {
//       axios.post(apiUrl, formData).then(() => {
//         setFormData({});
//         onUpdateSuccess();
//       });
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData(item);
//     setEditingId(item.id);
//   };

//   const handleDelete = (id) => {
//     axios.delete(`${apiUrl}/${id}`).then(() => onUpdateSuccess());
//   };

//   return (
//     <div className="crud-container">
//       <h3 className="crud-title">{title}</h3>

//       {!readOnly && (
//         <div className="crud-form">
//           {fields.map((field) => (
//             <div key={field.name} className="crud-form-group">
//               <label className="crud-label">{field.label}:</label>
//               <input
//                 className="crud-input"
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name] || ""}
//                 onChange={handleChange}
//                 required={field.required}
//               />
//             </div>
//           ))}
//           <button className="crud-button submit" onClick={handleSubmit}>
//             {editingId ? "Mettre à jour" : "Ajouter"}
//           </button>
//         </div>
//       )}

//       <table className="crud-table">
//         <thead>
//           <tr>
//             {fields.map((field) => (
//               <th key={field.name}>{field.label}</th>
//             ))}
//             {!readOnly && <th>Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               {fields.map((field) => (
//                 <td key={field.name}>{item[field.name]}</td>
//               ))}
//               {!readOnly && (
//                 <td>
//                   <button
//                     className="crud-button edit"
//                     onClick={() => handleEdit(item)}
//                   >
//                     Modifier
//                   </button>
//                   <button
//                     className="crud-button delete"
//                     onClick={() => handleDelete(item.id)}
//                   >
//                     Supprimer
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CrudManager;
