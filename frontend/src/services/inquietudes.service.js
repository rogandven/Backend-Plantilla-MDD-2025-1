import axios from '@services/root.service.js';

export async function GetReclamos() {
    try {
        const response= await axios.get('/inquietudes/')
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener reclamos:", error);
    }
}

export async function DeleteReclamo(reclamoId){
    try {
        const response =await axios.delete(`/inquietudes/${reclamoId}`);
        return response.data
    } catch (error) {
        console.error("Error al eliminar reclamo:", error);
    }
}

export async function EditReclamo(reclamoId, reclamoData) {
    try {
        const response = await axios.put(`/inquietudes/${reclamoId}`, reclamoData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error al editar reclamo:", error);
    }
}

export async function CreateReclamo(reclamoData) {
    try {
        const response = await axios.post(`/inquietudes/`, reclamoData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error al añadir reclamo:", error);
    }
}
