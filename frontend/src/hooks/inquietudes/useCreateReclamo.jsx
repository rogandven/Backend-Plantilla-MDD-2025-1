import Swal from "sweetalert2";
import { CreateReclamo } from "@services/inquietudes.service.js";

async function addReclamoPopup() {
  const { value: formValues } = await Swal.fire({
    title: "Añadir reclamo",
    html: `
    <div>
      <label for="swal2-nombre_del_profesor">Nombre del profesor</label>  
      <input id="swal2-nombre_del_profesor" class="swal2-input" placeholder="Nombre del profesor involucrado">
    </div>
    <div>
      <label for="swal2-descripcion">Descripción</label>
      <input id="swal2-descripcion" class="swal2-input" placeholder="Descripción de la queja">
    </div>
     <div>
      <label for="swal2-ramo">Ramo</label>
      <input id="swal2-ramo" class="swal2-input" placeholder="Ramo que dicta el profesor">
    </div>
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Añadir",
    preConfirm: () => {
      const nombre_del_profesor = document.getElementById("swal2-nombre_del_profesor").value.trim();
      const descripcion = document.getElementById("swal2-descripcion").value.trim();
      const ramo = document.getElementById("swal2-ramo").value.trim();

      if (!nombre_del_profesor|| !descripcion || !ramo) {
        Swal.showValidationMessage("Por favor, completa todos los campos");
        return false;
      }

      return { nombre_del_profesor, descripcion, ramo };
    },
  });
  if (formValues) {
    return {
      nombre_del_profesor: formValues.nombre_del_profesor,
      descripcion: formValues.descripcion,
      ramo: formValues.ramo,
    };
  }

  return null;
}

export const useCreateReclamo=(fetchReclamos) =>{
  const handleCreateReclamo = async ()=>{
    try {
      const formValues = await addReclamoPopup();
      // console.log(formValues);
      if(!formValues) return;

      const response = await CreateReclamo(formValues);
      if(response)
      {
        Swal.fire({
          title:"reclamo creado exitosamente",
          icon: "success",
          confirmButtonText: "aceptar"
        })
        await fetchReclamos();
      }
    } catch (error) {
      // console.log("Error al crear libro",error)
    }
  };
  return { handleCreateReclamo}
};

export default useCreateReclamo;