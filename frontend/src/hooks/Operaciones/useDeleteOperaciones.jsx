import Swal from 'sweetalert2';
import { DeleteOperacion} from '@services/Operaciones.service';

async function confirmDeleteOperacion() {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás deshacer esta acción',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });
  return result.isConfirmed;
}

async function confirmAlert() {
  await Swal.fire({
    title: 'Operación eliminada',
    text: 'La operación ha sido eliminada correctamente',
    icon: 'success',
    confirmButtonText: 'Aceptar',
  });
}

async function confirmError() {
  await Swal.fire({
    title: 'Error',
    text: 'No se pudo eliminar la operación',
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
}
export const useDeleteOperacion = (fetchOperaciones) => {
  const handleDeleteOperacion = async (operacionId) => {
    try {
      const isConfirmed = await confirmDeleteOperacion();
      if (isConfirmed) {
        const response = await DeleteOperacion(operacionId);
        if (response) {
          confirmAlert();
          await fetchOperaciones();
        }
      }
    } catch (error) {
      console.error('Error al eliminar operación:', error);
      confirmError();
    }
  };

  return { handleDeleteOperacion };
} 

export default useDeleteOperacion;