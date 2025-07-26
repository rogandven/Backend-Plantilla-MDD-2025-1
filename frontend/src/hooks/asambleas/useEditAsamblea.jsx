import { editAsamblea } from "../../services/asamblea.service";
import Swal from "sweetalert2";

async function editAsambleaInfo(asamblea) {
  const { value: formValues } = await Swal.fire({
    title: "Editar Asamblea",
    html: `
    <div>
      <label for="swal2-input1">Nombre de asamblea</label>  
      <input id="swal2-input1" class="swal2-input" placeholder="Nombre de asamblea" value = "${asamblea.asambleaname}">
    </div>
    <div>
      <label for="swal2-input2">Correo electrónico</label>
      <input id="swal2-input2" class="swal2-input" placeholder="Correo electrónico" value = "${asamblea.email}">
    </div>
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Editar",
    preConfirm: () => {
      const asambleaname = document.getElementById("swal2-input1").value;
      const email = document.getElementById("swal2-input2").value;

      if (!asambleaname || !email) {
        Swal.showValidationMessage("Por favor, completa todos los campos");
        return false;
      }

      if (asambleaname.length < 3 || asambleaname.length > 30) {
        Swal.showValidationMessage(
          "El nombre de asamblea debe tener entre 3 y 30 caracteres"
        );
        return false;
      }

      if (!/^[a-zA-Z0-9_]+$/.test(asambleaname)) {
        Swal.showValidationMessage(
          "El nombre de asamblea solo puede contener letras, números y guiones bajos"
        );
        return false;
      }

      if (!email || email.length < 15 || email.length > 50) {
        Swal.showValidationMessage(
          "El correo electrónico debe tener entre 15 y 50 caracteres"
        );
        return false;
      }

      if (!/^[a-zA-Z0-9._%+-]+@(ubiobio|alumnos\.ubiobio)\.(com|cl)$/.test(email)) {
        Swal.showValidationMessage(
          "Por favor, ingresa un correo de Gmail válido (@gmail.com o @gmail.cl)"
        );
        return false;
      }
      return { asambleaname, email };
    },
  });
  if (formValues) {
    return {
      asambleaname: formValues.asambleaname,
      email: formValues.email,
    };
  }
}

export const useEditAsamblea = (fetchAsambleas) => {
  const handleEditAsamblea = async (asambleaId, asamblea) => {
    try {
      const formValues = await editAsambleaInfo(asamblea);
      if (!formValues) return;

      const response = await editAsamblea(asambleaId, formValues);
      if (response) {
        await fetchAsambleas();
      }
    } catch (error) {
      console.error("Error al editar asamblea:", error);
    }
  };

  return { handleEditAsamblea };
};

export default useEditAsamblea;
