import { editOperacion } from "@services/Operaciones.service";
import Swal from 'sweetalert2';

async function editOperacionAlert(operaciones){
const {value: formValues} = await Swal.fire({
  title: 'Editar Operación',
html: `
    <div>
<label for="swal2-input1">Nombre de la actividad</label>
<input id="swal2-input1" class="swal2-input" placeholder="Nombre de la actividad" value="${operaciones.nombre_actividad}">
</div>
<div>
<label for="swal2-input2">Monto</label>
<input id="swal2-input2" class="swal2-input" placeholder="Monto" value="${operaciones.monto}">
</div>
<div>
<label for="swal2-input3">Tipo</label>
<input id="swal2-input3" class="swal2-input" placeholder="tipo" value="${operaciones.tipo}">
</div>
||  `,
focusConfirm: false,
showCancelButton: true, 
confirmButtonText: 'Editar',
preConfirm: () => {
    const nombre_actividad = document.getElementById('swal2-input1').value;
    const monto = parseFloat(document.getElementById('swal2-input2').value.replace(',', '.'));
    const tipo = document.getElementById('swal2-input3').value;
 
  
    if (!nombre_actividad || isNaN(monto) || !tipo) {
      Swal.showValidationMessage('Por favor, Ingresa todos los campos');
      return false;
    }
    if (nombre_actividad.length < 3 || nombre_actividad.length > 50) {
      Swal.showValidationMessage('El nombre de la actividad debe tener entre 3 y 50 caracteres');
      return false;
    }
    if (monto < 0 ) {  
      Swal.showValidationMessage('El monto debe ser mayor a 0');
      return false;
    }
    return { nombre_actividad, monto, tipo };
  }
});

if (formValues) {
    return {
      nombre_actividad: formValues.nombre_actividad,
      monto: parseFloat(formValues.monto),
      tipo:formValues.tipo
    };
  }
}
export const useEditOperacion = (fetchOperaciones) => {
  const handleEditOperacion = async (operacionId,operaciones) => {
    try {
      const formValues = await editOperacionAlert(operaciones);
      if (formValues) {
        const response = await editOperacion(operacionId,formValues);
        if (response) {
          Swal.fire({
            title: 'Operación actualizada',
            text: 'La operación ha sido actualizada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          await fetchOperaciones();
        }
      }
    } catch (error) {
      console.error('Error al editar operación:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar la operación',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  return { handleEditOperacion };
}

export default useEditOperacion;