import Swal from "sweetalert2";
import { deleteMeeting } from "@services/meeting.service";

async function confirmDeleteMeeting() {
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
    title: "Reunion eliminada",
    text: "La reunion ha sido eliminada correctamente",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

async function confirmError() {
  await Swal.fire({
    title: "Error",
    text: "No se pudo eliminar la reunión",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}

export const DeleteMeeting = (fetchMeeting) => {
  const handleDeleteMeeting = async (id) => {
    try {
      const isConfirmed = await confirmDeleteMeeting();
      if (isConfirmed) {
        const response = await deleteMeeting(id);
        if (response) {
          confirmAlert();
          await fetchMeeting();
        }
      }
    } catch (error) {
      console.error("Error al eliminar la reunión:", error);
      confirmError();
    }
  };

  return { handleDeleteMeeting };
};

export default DeleteMeeting;
