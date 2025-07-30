import Swal from "sweetalert2";
import { deleteAsamblea } from "@services/asamblea.service";

async function confirmDeleteAsamblea() {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
}

async function confirmAlert() {
  await Swal.fire({
    title: "Asamblea eliminada",
    text: "La asamblea ha sido eliminada correctamente",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

async function confirmError() {
  await Swal.fire({
    title: "Error",
    text: "No se pudo eliminar la asamblea",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}

export const useDeleteAsamblea = (fetchAsambleas) => {
  const handleDeleteAsamblea = async (asambleaId) => {
    try {
      const isConfirmed = await confirmDeleteAsamblea();
      if (isConfirmed) {
        const response = await deleteAsamblea(asambleaId);
        if (response) {
          confirmAlert();
          await fetchAsambleas();
        }
      }
    } catch (error) {
      console.error("Error al eliminar asamblea:", error);
      confirmError();
    }
  };

  return { handleDeleteAsamblea };
};

export default useDeleteAsamblea;
