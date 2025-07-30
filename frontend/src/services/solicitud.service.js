import axios from '@services/root.service.js';

// Obtener todas las solicitudes
export async function getSolicitudes(query = '') {
  try {
    const response = await axios.get(`/solicitudes${query}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    throw error;
  }
}

// Crear solicitud nueva
export async function createSolicitud(solicitudData) {
  try {
    const response = await axios.post('/solicitudes', solicitudData);
    return response.data;
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    throw error;
  }
}

// Editar solicitud (solo estudiante dueño y si no está tomada)
export async function editSolicitud(id, solicitudData) {
  try {
    const response = await axios.put(`/solicitudes/${id}`, solicitudData);
    return response.data;
  } catch (error) {
    console.error("Error al editar solicitud:", error);
    throw error;
  }
}

// Eliminar solicitud (admin, CEE, o estudiante dueño si no está tomada)
export async function deleteSolicitud(id) {
  try {
    const response = await axios.delete(`/solicitudes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    throw error;
  }
}

// Cambiar estado (gestionar, resolver) — solo CEE
export async function changeSolicitudEstado(id, data) {
  try {
    const response = await axios.put(`/solicitudes/estado/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al cambiar estado de solicitud:", error);
    throw error;
  }
}
