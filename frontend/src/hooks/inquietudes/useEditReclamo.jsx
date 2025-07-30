import {EditReclamo} from "@services/inquietudes.service.js";
import Swal from "sweetalert2";


async function editReclamoInfo(reclamo) {
  // console.log(reclamo);
    const { value: formValues }= await Swal.fire({
        title: "Editar reclamo",
        html: `
        <div>
          <label for="swal2-nombre_del_profesor">Nombre del profesor</label>  
          <input id="swal2-nombre_del_profesor" class="swal2-input" placeholder="Nombre del profesor" value = "${reclamo.nombre_del_profesor}">
        </div>
        <div>
          <label for="swal2-descripcion">Descripción</label>
          <input id="swal2-descripcion" class="swal2-input" placeholder="Descripción" value = "${reclamo.descripcion}">
        </div>
         <div>
          <label for="swal2-ramo">Ramo</label>
          <input id="swal2-ramo" class="swal2-input" placeholder="Ramo" value = "${reclamo.ramo}">
        </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Editar reclamo",
        preConfirm: () => {
        const nombre_del_profesor = document.getElementById("swal2-nombre_del_profesor").value;
        const descripcion = document.getElementById("swal2-descripcion").value;
        const ramo = document.getElementById("swal2-ramo").value;

        if (!nombre_del_profesor || !descripcion || !ramo) {
          Swal.showValidationMessage("Por favor, completa todos los campos");
          return false;
        }

        if (nombre_del_profesor.length < 3 || nombre_del_profesor.length > 50) {
          Swal.showValidationMessage(
            "El nombre del profesor debe tener entre 3 y 50 caracteres"
          );
          return false;
        }

        if (!/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/.test(nombre_del_profesor)) {
          Swal.showValidationMessage(
            "El nombre del profesor solo puede contener letras, números y guiones bajos"
          );
            return false;
        }

        if (descripcion.length < 3 || descripcion.length > 500) {
          Swal.showValidationMessage(
            "La descripción debe tener entre 3 y 500 caracteres"
          );
          return false;
        }

        if (!/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/.test(descripcion)) {
          Swal.showValidationMessage(
            "La descripción solo puede contener letras, números y guiones bajos"
          );
            return false;
        }

        if (ramo.length < 3 || ramo.length > 50) {
          Swal.showValidationMessage(
            "La ramo debe tener entre 3 y 50 caracteres"
          );
          return false;
        }

        if (!/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/.test(ramo)) {
          Swal.showValidationMessage(
            "La ramo solo puede contener letras, números y guiones bajos"
          );
            return false;
        }

        return { nombre_del_profesor, descripcion,ramo };
    },
   });
   if (formValues) {
    return {
      nombre_del_profesor: formValues.nombre_del_profesor,
      descripcion: formValues.descripcion,
      ramo: formValues.ramo,
    };
  }
}
export const useEditReclamo = (fetchReclamos) => {
  const handleEditReclamo = async (reclamoId, reclamo) => {
    try {
      const formValues = await editReclamoInfo(reclamo);
      if (!formValues) return;

      const response = await EditReclamo(reclamoId, formValues);
      if (response) {
        await fetchReclamos();
      }
    } catch (error) {
      console.error("Error al editar reclamos:", error);
    }
  };

  return { handleEditReclamo };
};

export default useEditReclamo;