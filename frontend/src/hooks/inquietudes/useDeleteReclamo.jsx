import {DeleteReclamo} from '@services/inquietudes.service.js'
import Swal from 'sweetalert2';

export const useDeleteReclamo= (fetchReclamos) =>{
    const handleDeleteReclamo= async (reclamoId)=>{
        try {
            const response = await DeleteReclamo(reclamoId);
            if(response){
                Swal.fire({
                    title: "Reclamo eliminado",
                    text: "el reclamo ha sido eliminado correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                await fetchReclamos();
            }
        } catch (error) {
            console.error("Error al eliminar reclamo:", error);
        }
    };
    return {handleDeleteReclamo};
}

export default useDeleteReclamo;