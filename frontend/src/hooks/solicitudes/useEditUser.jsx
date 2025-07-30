
import Swal from "sweetalert2";
import { editUser } from "@services/user.service.js";

export const useEditUser = (fetchUsers) => {
  const handleEditUser = async (user) => {

    const { value: formValues } = await Swal.fire({
      title: "Editar Usuario",
      html: `
        <input id="swal-username" class="swal2-input" placeholder="Nombre de usuario" value="${user.username}" />
        <input id="swal-email" class="swal2-input" placeholder="Correo" value="${user.email}" />
        <input id="swal-rut" class="swal2-input" placeholder="RUT" value="${user.rut}" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          username: document.getElementById("swal-username").value.trim(),
          email: document.getElementById("swal-email").value.trim(),
          rut: document.getElementById("swal-rut").value.trim(),
        };
      },
    });

    if (formValues) {
      try {
        await editUser(user.id, formValues);
        Swal.fire("Actualizado", "Usuario modificado correctamente", "success");
        await fetchUsers();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo actualizar el usuario", "error");
      }
    }
  };

  return { handleEditUser };
};

export default useEditUser;
