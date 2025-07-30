import axios from '@services/root.service.js';

export async function getAllMeeting() {
    try {
        const response = await axios.get(`/meetings`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reuniones:", error);
    }
}

export async function createMeetings(data) {
    try {
        // console.log("-- START OF DATA --");
        // console.log(data);
        // console.log("-- END OF DATA --");
        const response = await axios.post(`/meetings`, data);
        return response.data;
    } catch (error) {
        console.error("Error al crear la reunion: ", error)
    }
}

export async function editMeeting(id, data) { 
    try {
        const response = await axios.put(`/meetings/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al editar reunion:", error);
    }
}

export async function deleteMeeting(id) {
    try {
        const response = await axios.delete(`/meetings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar reunion:", error);
    }
}