import axios from '@services/root.service.js';

export async function getAllMeeting(id) {
    try {
        const response = await axios.get(`/meeting${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener las reuniones:", error);
    }
}

export async function editMeeting(date, time, description) { 
    try {
        const response = await axios.put(`/meeting`, date, time, description);
        return response.data;
    } catch (error) {
        console.error("Error al editar reunion:", error);
    }
}

export async function deleteMeeting(id) {
    try {
        const response = await axios.delete(`/meeting/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar reunion:", error);
    }
}