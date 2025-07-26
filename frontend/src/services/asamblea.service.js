import axios from '@services/root.service.js';

export async function getAsambleas() {
    try {
        const response = await axios.get('/asamblea');
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener asambleas:", error);
    }
}

export async function editAsamblea(asambleaId, asambleaData) { 
    try {
        const response = await axios.put(`/asamblea/${asambleaId}`, asambleaData);
        return response.data;
    } catch (error) {
        console.error("Error al editar asamblea:", error);
    }
}

export async function deleteAsamblea(asambleaId) {
    try {
        const response = await axios.delete(`/asamblea/${asambleaId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar asamblea:", error);
    }
}

export async function getAsambleaData(id) { 
    try {
        const response = await axios.get('/asamblea/' + id);
        return response.data;
    } catch (error) {
        console.error("Error al obtener asamblea:", error);
        throw error;
    }
}