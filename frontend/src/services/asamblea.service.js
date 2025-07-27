import axios from '@services/root.service.js';

export async function asambleaMatchesDate(date) {
    try {
        const date1 = date.split("T");
        var date2 = null;
        const response = await axios.get('/asamblea');
        const data = response.data.data;
        for (var i = 0; i < data.length; i++) {
            date2 = (data[i].date.split("T"))[0];
            if (date1 == date2) {
                return "¡Se encontró un conflicto! ¿Agregar de todos modos?";
            }
        }
        return undefined;
    } catch (error) {
        console.error("Error al comparar asambleas:", error);
        return "No se pudo concluír si se encontró un conflicto o no. ¿Agregar de todos modos?"
    }
}

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

export async function createAsamblea(asambleaData) { 
    try {
        const response = await axios.post(`/asamblea`, asambleaData);
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