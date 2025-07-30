import axios from  '@services/root.service.js'


export async function getOperaciones() {
    try {
         const response = await axios.get('/operaciones/obtener');
         return response.data;
    } catch (error) {
        console.error("Error al obtener Operaciones:", error);
    }
}

export async function DeleteOperacion(operacionId) {
try {
    const response = await axios.delete(`/operaciones/Eliminar/`, {
  params: { id: operacionId }
});
    return response.data;
} catch (error) {
    console.error("Error al eliminar Operacion:", error); 
}

}

export async function editOperacion(operacionId,operacionData) {
try {
    const response = await axios.put(`/operaciones/Actualizacion?id=${operacionId}`,operacionData)
      return response.data;
} catch (error) {
    console.error("Error al editar Operacion:", error);
}

}

export async function CreateOperacion(operacionData) {
    try {
        // console.log(operacionData);
         if (!operacionData.nombre_actividad) {
            throw new Error("El nombre de la actividad es necesario");
        }
        const response = await axios.post(`/operaciones/create`,operacionData)
          return response.data;
    } catch (error) {
        console.error("Error al Crear la Operacion:", error);
    }
}
export async function getResumenFinanciero() {
    try {
        const response = await axios.get('/operaciones/resumen');
        return response.data;
    } catch (error) {
        console.error("Error al obtener Resumen Financiero:", error);
    }
}