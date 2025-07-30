import Swal from "sweetalert2";
import { deleteSolicitud } from "@services/solicitud.service.js";

export const useDeleteSolicitud = (fetchSolicitudes) => {
  const handleDeleteSolicitud = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirm.isConfirmed) {
      try {
        await deleteSolicitud(id);
        Swal.fire("Eliminada", "Solicitud eliminada correctamente", "success");
        await fetchSolicitudes();
      } catch (error) {
         console.error(error);
        Swal.fire("Error", "No se pudo eliminar la solicitud", "error");
      }
    }
  };

  return { handleDeleteSolicitud };
};

export default useDeleteSolicitud;
