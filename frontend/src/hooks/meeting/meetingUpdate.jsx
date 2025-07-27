import { editMeeting } from "../../services/meeting.service";
import Swal from "sweetalert2";

async function editMeetingInfo(meeting) {
  const { value: formValues } = await Swal.fire({
    title: "Editar Reunion",
    html: `
    <div>
      <label for="swal2-input1">Ingrese el ID de la reunion a editar:</label>  
      <input id="swal2-input1" class="swal2-input" placeholder="Ejemplo: 10" value = "${meeting.id}">
    </div>
    <div>
      <label for="swal2-input2">Ingrese la nueva fecha de la reunion: </label>
      <label for="swal2-input2">Tiene que estar en formato dd-mm-aa</label>
      <input id="swal2-input2" class="swal2-input" type="datetime-local" placeholder="dd-mm-aa" value = "${meeting.date}">
    </div>
    <div>
      <label for="swal2-input2">Ingrese un nuevo horario para la reunion: </label>
      <label for="swal2-input2">Tiene que estar en formato 24 horas HH:MM</label>
      <input id="swal2-input2" class="swal2-input" placeholder="HH:MM" value = "${meeting.time}">
    </div>
    <div>
      <label for="swal2-input2">Ingrese una nueva descripcion de la asamblea (opcional): </label>
      <label for="swal2-input2">Tiene que tener entre 10 y 500 caracteres (no se puede exceder de los 500)</label>
      <input id="swal2-input2" class="swal2-input" placeholder="Descripcion" value = "${meeting.description}">
    </div>
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Editar",
    preConfirm: () => {
      const id = document.getElementById("swal2-input1").value;
      const date = document.getElementById("swal2-input2").value;
      const time = document.getElementById("swal2-input2").value;
      const description = document.getElementById("swal2-input2").value;

      if (!id || !date || !time || !description) {
        Swal.showValidationMessage("Por favor, completa todos los campos");
        return false;
      }

      if (description.length < 10 || description.length > 500) {
        Swal.showValidationMessage(
          "La descripción debe tener al menos 10 caracteres"
        );
        return false;
      }

      return { id, date, time, description };
    },
  });
  if (formValues) {
    return {
      id: formValues.id,
      date: formValues.date,
      time: formValues.time,
      description: formValues.description,
    };
  }
}

export const EditMeeting = (fetchMeeting) => {
  const handleEditMeeting = async (id, meeting) => {
    try {
      const formValues = await editMeetingInfo(meeting);
      if (!formValues) return;

      const response = await editMeeting(id, formValues);
      if (response) {
        await fetchMeeting();
      }
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  return { handleEditMeeting };
};

export default EditMeeting;
