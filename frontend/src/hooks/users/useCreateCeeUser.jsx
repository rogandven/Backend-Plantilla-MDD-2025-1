import Swal from "sweetalert2";
import { registerCeeUser } from "@services/user.service.js";

//hook para crear usuarios CEE (solo Admin)
export const useCreateCeeUser = (fetchUsers) => {
  const handleCreateCeeUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar Integrante CEE",
      html:
        '<input id="swal2-username" class="swal2-input" placeholder="Nombre de usuario">' +
        '<input id="swal2-rut" class="swal2-input" placeholder="RUT xx.xxx.xxx-x">' +
        '<input id="swal2-email" class="swal2-input" placeholder="Correo @cee.ubiobio.cl">' +
        '<input id="swal2-password" type="password" class="swal2-input" placeholder="Contraseña">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {

        const username = document.getElementById("swal2-username").value.trim();
        const rut = document.getElementById("swal2-rut").value.trim();
        const email = document.getElementById("swal2-email").value.trim();
        const password = document.getElementById("swal2-password").value;

        if (!username || !rut || !email || !password) {
          Swal.showValidationMessage("Completa todos los campos.");
          return false;
        }
        if (!email.endsWith("@cee.ubiobio.cl")) {
          Swal.showValidationMessage("El correo debe terminar en @cee.ubiobio.cl");
          return false;
        }
        if (!/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/.test(rut)) {
          Swal.showValidationMessage("El rut debe tener formato xx.xxx.xxx-x");
          return false;
        }
        if (password.length < 8) {
          Swal.showValidationMessage("La contraseña debe tener al menos 8 caracteres");
          return false;
        }
        return [username, rut, email, password];
      },
    });

    if (formValues) {
      try {
        await registerCeeUser({
          username: formValues[0],
          rut: formValues[1],
          email: formValues[2],
          password: formValues[3],
        });
        await Swal.fire("Registrado", "Usuario CEE creado correctamente", "success");
        await fetchUsers(); 
      } catch (error) {
        //si el backend devuelve mensaje de error se muestra
        let msg = "No se pudo crear el usuario";
        if (error?.response?.data?.message) msg = error.response.data.message;
        Swal.fire("Error", msg, "error");
      }
    }
  };

  return { handleCreateCeeUser };
};

export default useCreateCeeUser;
