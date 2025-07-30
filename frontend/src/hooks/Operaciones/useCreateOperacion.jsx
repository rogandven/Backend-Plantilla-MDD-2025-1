import Swal from 'sweetalert2';
import { CreateOperacion } from '@services/Operaciones.service';

async function addOperacionPopup(){
const {value: formValues} = await Swal.fire({
    title: 'Crear Operación',
    html: `
        <div>
    <label for="swal2-input1">Nombre de la actividad</label>
    <input id="swal2-input1" class="swal2-input" placeholder="Nombre de la actividad">
    </div>
    <div>
    <label for="swal2-input2">Monto</label>
    <input id="swal2-input2" class="swal2-input" placeholder="monto">
    </div>
    <div>
    <label for="swal2-input3">Tipo</label>
    <input id="swal2-input3" class="swal2-input" placeholder="tipo">
    </div>
     `,
    focusConfirm: false,
    showCancelButton: true, 
    confirmButtonText: 'Añadir',
    preConfirm: () => {
        const nombre_actividad = document.getElementById('swal2-input1').value;
        const monto = parseFloat(document.getElementById('swal2-input2').value.trim().replace(',', '.'));
       const tipo = document.getElementById('swal2-input3').value.trim().toUpperCase();
         if (!nombre_actividad || isNaN(monto) || (!tipo )) {
           Swal.showValidationMessage('Por favor, Ingresa todos los campos y monto debe ser numero ');
           return false;
         }
          if (nombre_actividad.length < 3 || nombre_actividad.length > 50) {
               Swal.showValidationMessage('El nombre de la actividad debe tener entre 3 y 50 caracteres');
               return false;
             }
             if (monto < 0) {  
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
      tipo: formValues.tipo
    };
  }
  return null;
}
export const useCreateOperacion = (fetchOperaciones) => {
  const handleCreateOperacion = async () => {
    try {
      const formValues = await addOperacionPopup();
      if (formValues) {
        const response = await CreateOperacion(formValues);
        if (response) {
          Swal.fire({
            title: 'Operación Creada ',
            text: 'La operación ha sido Creada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          await fetchOperaciones();
        }
      }
    } catch (error) {
      console.error('Error al crear operación:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo crear la operación',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  return { handleCreateOperacion };
}

export default useCreateOperacion;

