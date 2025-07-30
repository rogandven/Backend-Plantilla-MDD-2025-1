/*import Swal from "sweetalert2";
import { changeSolicitudEstado } from "@services/solicitud.service.js";

export const useChangeSolicitudEstado = (fetchSolicitudes) => {
  const handleChangeEstado = async (solicitud) => {
    const { value: detalleResolucion } = await Swal.fire({
      title: "Resolver Solicitud",
      input: "textarea",
      inputLabel: "Detalle de resolución",
      inputPlaceholder: "Agrega comentarios sobre la resolución...",
      showCancelButton: true,
      confirmButtonText: "Marcar como resuelta",
    });

    if (detalleResolucion) {
      try {
        await changeSolicitudEstado(solicitud.id, {
          estado: "resuelta",
          detalleResolucion,
        });
        Swal.fire("Resuelta", "Solicitud marcada como resuelta", "success");
        await fetchSolicitudes();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo cambiar el estado", "error");
      }
    }
  };

  return { handleChangeEstado };
};

export default useChangeSolicitudEstado;
*/

import Swal from "sweetalert2";
import { changeSolicitudEstado } from "@services/solicitud.service.js";

export const useChangeSolicitudEstado = (fetchSolicitudes) => {
  const handleChangeEstado = async (solicitud) => {
    const { value: detalleResolucion } = await Swal.fire({
      title: "Resolver Solicitud",
      input: "textarea",
      inputLabel: "Detalle de resolución",
      inputPlaceholder: "Agrega comentarios sobre la resolución...",
      showCancelButton: true,
      confirmButtonText: "Marcar como resuelta",
    });

    if (detalleResolucion) {
      try {
        await changeSolicitudEstado(solicitud.id, {
          nuevoEstado: "resuelta",  
          detalleResolucion,
        });
        Swal.fire("Resuelta", "Solicitud marcada como resuelta", "success");
        await fetchSolicitudes();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo cambiar el estado", "error");
      }
    }
  };

  return { handleChangeEstado };
};

export default useChangeSolicitudEstado;
