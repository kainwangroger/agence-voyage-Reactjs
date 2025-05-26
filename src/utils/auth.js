// Cette fonction récupère le rôle de l'utilisateur connecté depuis le localStorage
export function getUserRole() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role || null; // retourne "ADMIN", "CLIENT", etc.
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle utilisateur :", error);
    return null;
  }
}

// Cette fonction enregistre les infos utilisateur dans le localStorage
export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// Cette fonction efface les infos utilisateur (ex: à la déconnexion)
export function logoutUser() {
  localStorage.removeItem("user");
}
