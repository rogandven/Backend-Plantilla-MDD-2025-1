import Swal from "sweetalert2";
import { editSolicitud } from "@services/solicitud.service.js";

export const useEditSolicitud = (fetchSolicitudes) => {
  const handleEditSolicitud = async (solicitud) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar Solicitud",
      html: `
        <input id="swal2-nombre" class="swal2-input" value="${solicitud.nombre_estudiante}" placeholder="Nombre completo">
        <input id="swal2-correo" class="swal2-input" value="${solicitud.correo_estudiante}" placeholder="Correo institucional">
        <input id="swal2-carrera" class="swal2-input" value="${solicitud.carrera}" placeholder="Carrera">
        <textarea id="swal2-descripcion" class="swal2-textarea" placeholder="Describe tu caso">${solicitud.descripcion}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      preConfirm: () => {
        const nombre = document.getElementById("swal2-nombre").value;
        const correo = document.getElementById("swal2-correo").value;
        const carrera = document.getElementById("swal2-carrera").value;
        const descripcion = document.getElementById("swal2-descripcion").value;

        if (!nombre || !correo || !carrera || !descripcion) {
          Swal.showValidationMessage("Completa todos los campos");
          return false;
        }
        return { nombre_estudiante: nombre, correo_estudiante: correo, carrera, descripcion };
      }
    });

    if (formValues) {
      try {
        await editSolicitud(solicitud.id, formValues);
        Swal.fire("Actualizada", "Solicitud editada correctamente", "success");
        await fetchSolicitudes();
      } catch (error) {
         console.error(error);
        Swal.fire("Error", "No se pudo editar la solicitud", "error");
      }
    }
  };

  return { handleEditSolicitud };
};

export default useEditSolicitud;
