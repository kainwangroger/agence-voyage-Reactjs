// Enregistrer un token dans le localStorage
export function saveToken(token) {
  localStorage.setItem("access_token", token);
}

// Récupérer le token JWT depuis le localStorage
export function getToken() {
  return localStorage.getItem("access_token");
}

// Supprimer le token du localStorage (ex: lors de la déconnexion)
export function removeToken() {
  localStorage.removeItem("access_token");
}

// Décoder un JWT (base64 → JSON)
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erreur de décodage du token :", error);
    return null;
  }
}

// Vérifie si le token est expiré
export function isTokenExpired() {
  const token = getToken();
  if (!token) return true;

  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true;

  const now = Date.now() / 1000;
  return decoded.exp < now;
}
