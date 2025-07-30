/*import Swal from "sweetalert2";
import { createSolicitud } from "@services/solicitud.service.js";

export const useCreateSolicitud = (fetchSolicitudes) => {
  const handleCreateSolicitud = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar Solicitud",
      html: `
        <input id="swal2-nombre" class="swal2-input" placeholder="Nombre completo">
        <input id="swal2-correo" class="swal2-input" placeholder="Correo institucional">
        <input id="swal2-carrera" class="swal2-input" placeholder="Carrera">
        <textarea id="swal2-descripcion" class="swal2-textarea" placeholder="Describe tu caso"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      preConfirm: () => {
        const nombre = document.getElementById("swal2-nombre").value;
        const correo = document.getElementById("swal2-correo").value;
        const carrera = document.getElementById("swal2-carrera").value;
        const descripcion = document.getElementById("swal2-descripcion").value;

        // Validaciones simples (puedes agregar más según tus reglas)
        if (!nombre || !correo || !carrera || !descripcion) {
          Swal.showValidationMessage("Completa todos los campos");
          return false;
        }
        // Puedes validar correo/carrera según tu backend

        return { nombre_estudiante: nombre, correo_estudiante: correo, carrera, descripcion };
      }
    });

    if (formValues) {
      try {
        await createSolicitud(formValues);
        Swal.fire("¡Registrada!", "Solicitud enviada correctamente", "success");
        await fetchSolicitudes();
      } catch (error) {
         console.error(error);
        Swal.fire("Error", "No se pudo registrar la solicitud", "error");
      }
    }
  };

  return { handleCreateSolicitud };
};

export default useCreateSolicitud;
*/

/*
import Swal from "sweetalert2";
import { createSolicitud } from "@services/solicitud.service.js";

export const useCreateSolicitud = (fetchSolicitudes) => {
  const handleCreateSolicitud = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar Solicitud",
      html: `
        <input id="swal2-nombre" class="swal2-input" placeholder="Nombre completo">
        <input id="swal2-correo" class="swal2-input" placeholder="Correo institucional">
        <input id="swal2-carrera" class="swal2-input" placeholder="Carrera">
        <textarea id="swal2-descripcion" class="swal2-textarea" placeholder="Describe tu caso"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      preConfirm: () => {
        const nombre = document.getElementById("swal2-nombre").value;
        const correo = document.getElementById("swal2-correo").value;
        const carrera = document.getElementById("swal2-carrera").value;
        const descripcion = document.getElementById("swal2-descripcion").value;

        // Validaciones simples (puedes agregar más según tus reglas)
        if (!nombre || !correo || !carrera || !descripcion) {
          Swal.showValidationMessage("Completa todos los campos");
          return false;
        }
        // Puedes validar correo/carrera según tu backend

        return {
          nombre_estudiante: nombre,
          correo_estudiante: correo,
          carrera,
          descripcion
        };
      }
    });

    if (formValues) {
      try {
        await createSolicitud(formValues);
        Swal.fire("¡Registrada!", "Solicitud enviada correctamente", "success");
        await fetchSolicitudes();
      } catch (error) {
        // 🔥 Cambiado: mostrar el mensaje del backend si existe
        console.error(error);
        Swal.fire(
          "Error",
          error?.response?.data?.message || "No se pudo registrar la solicitud",
          "error"
        );
      }
    }
  };

  return { handleCreateSolicitud };
};

export default useCreateSolicitud;
*/


import Swal from "sweetalert2";
import { createSolicitud } from "@services/solicitud.service.js";

export const useCreateSolicitud = (fetchSolicitudes) => {
  const handleCreateSolicitud = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar Solicitud",
      html: `
        <input id="swal2-nombre" class="swal2-input" placeholder="Nombre completo">
        <input id="swal2-correo" class="swal2-input" placeholder="Correo institucional">
        <input id="swal2-carrera" class="swal2-input" placeholder="Carrera">
        <textarea id="swal2-descripcion" class="swal2-textarea" placeholder="Describe tu caso"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      preConfirm: () => {
        const nombre = document.getElementById("swal2-nombre").value.trim();
        const correo = document.getElementById("swal2-correo").value.trim();
        const carrera = document.getElementById("swal2-carrera").value.trim();
        const descripcion = document
          .getElementById("swal2-descripcion")
          .value.trim();

        if (!nombre) {
          Swal.showValidationMessage("El nombre es obligatorio.");
          return false;
        }
        if (nombre.length < 3) {
          Swal.showValidationMessage(
            "El nombre debe tener al menos 3 caracteres."
          );
          return false;
        }
        if (!correo) {
          Swal.showValidationMessage("El correo es obligatorio.");
          return false;
        }
        if (!/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
          Swal.showValidationMessage("El correo no tiene formato válido.");
          return false;
        }

        if (!carrera) {
          Swal.showValidationMessage("La carrera es obligatoria.");
          return false;
        }
        if (carrera.length < 3) {
          Swal.showValidationMessage(
            "La carrera debe tener al menos 3 caracteres."
          );
          return false;
        }
        if (!descripcion) {
          Swal.showValidationMessage("La descripción es obligatoria.");
          return false;
        }
        if (descripcion.length < 10) {
          Swal.showValidationMessage(
            "La descripción debe tener al menos 10 caracteres."
          );
          return false;
        }
        return {
          nombre_estudiante: nombre,
          correo_estudiante: correo,
          carrera,
          descripcion,
        };
      },
    });

    if (formValues) {
      try {
        await createSolicitud(formValues);
        Swal.fire("¡Registrada!", "Solicitud enviada correctamente", "success");
        await fetchSolicitudes();
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.message || "No se pudo registrar la solicitud",
          "error"
        );
      }
    }
  };

  return { handleCreateSolicitud };
};

export default useCreateSolicitud;


