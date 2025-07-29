import { createMeetings } from '@services/meeting.service.js';
import Swal from "sweetalert2";

async function Createmeeting() {
  const { value: formValues } = await Swal.fire({
    title: "Crear Reunion",
    html: `
    <div>
      <label for="swal2-input1">Ingrese la fecha de la reunion: </label>
      <label for="swal2-input1">Tiene que estar en formato dd-mm-aa</label>
      <input id="swal2-input1" class="swal2-input" type="date" placeholder="dd-mm-aa" value = "${""}">
    </div>
    <div>
      <label for="swal2-input2">Ingrese el horario de la reunion: </label>
      <label for="swal2-input2">Tiene que estar en formato 24 horas HH:MM</label>
      <input id="swal2-input2" class="swal2-input" placeholder="HH:MM" value = "${""}">
    </div>
    <div>
      <label for="swal2-input3">Ingrese una descripcion de la reunion: </label>
      <label for="swal2-input3">Tiene que tener entre 10 y 500 caracteres (no se puede exceder de los 500)</label>
      <input id="swal2-input3" class="swal2-input" placeholder="Descripcion" value = "${""}">
    </div>
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Crear",
    preConfirm: () => {
      var date = document.getElementById("swal2-input1").value;
      const time = document.getElementById("swal2-input2").value;
      const description = document.getElementById("swal2-input3").value;

      if (!date || !time || !description) {
        Swal.showValidationMessage("Por favor, completa todos los campos");
        return false;
      }

      if (description.length < 10 || description.length > 500) {
        Swal.showValidationMessage(
          "La descripción debe tener al menos 10 caracteres"
        );
        return false;
      }

      return { date, time, description };
    },
  });
  if (formValues) {
    return {
      date: formValues.date,
      time: formValues.time,
      description: formValues.description,
    };
  }
}

export const useCreateMeeting=(fetchMeeting) =>{
  const handleCreateMeeting = async ()=>{
    try {
      const formValues = await Createmeeting();
      console.log(formValues);
      if(!formValues) return;

      const response = await createMeetings(formValues);
      if(response)
      {
        Swal.fire({
          title:"Reunion creada exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar"
        })
        await fetchMeeting();
      }
    } catch (error) {
      console.log("Error al crear la reunion",error)
    }
  };
  return { handleCreateMeeting}
};

export default useCreateMeeting;