const API_URL = import.meta.env.VITE_API_URL;

export async function getPreferences(token) {
  const res = await fetch(`${API_URL}/usuarios/preferences`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Error al obtener preferencias');
  return res.json();
}

export async function updatePreferences(token, payload) {
  const res = await fetch(`${API_URL}/usuarios/preferences`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al actualizar preferencias');
  return res.json();
}