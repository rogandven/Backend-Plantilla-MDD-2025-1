import { createAsamblea, asambleaMatchesDate } from "../../services/asamblea.service";
import Swal from "sweetalert2";

function isFutureDate(date) {
    const today = Date.now();
    date = Date.parse(date);
    if (today > date) {
      return false;
    }
    return true;
}

async function confirmCreation(text) {
    var result2 = false;
    await Swal.fire({
      title: text,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        result2 = true;
      }
    })
    return result2;
}

function convertToISOFormat(date, time) {
    if (time === undefined || time === null) {
      return undefined;
    }
    if (date === undefined || date === null) {
      return undefined;
    }
    const returnValue = date + "T" + time + ":00.000Z";
    // console.log(returnValue);
    return returnValue;
}

async function createAsambleaInfo() {
  const { value: formValues } = await Swal.fire({
    title: "Crear Asamblea",
    html: `
    <div>
      <label for="swal2-input1">Descripción</label>  
      <input id="swal2-input1" class="swal2-input" placeholder="Descripción" value = "">
    </div>
    <div>
      <label for="swal2-input20">Fecha</label>  
      <input type="date" id="swal2-input20" class="swal2-input" placeholder="Fecha" value = "">
    </div>
    <div>
      <label for="swal2-input21">Hora</label>  
      <input type="time" id="swal2-input21" class="swal2-input" placeholder="Hora" value = "">
    </div>    
    <div>
      <label for="swal2-input3">URL</label>  
      <input type="url" id="swal2-input3" class="swal2-input" placeholder="URL" value = "">
    </div>
    <div>
      <label for="swal2-input4">Lugar</label>  
      <input id="swal2-input4" class="swal2-input" placeholder="Lugar" value = "">
    </div>            
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Crear",
    preConfirm: () => {
      var dataToSend = undefined;
      const description = document.getElementById("swal2-input1").value;
      const date = convertToISOFormat(document.getElementById("swal2-input20").value, document.getElementById("swal2-input21").value);
      var url = document.getElementById("swal2-input3").value;
      var place = document.getElementById("swal2-input4").value;

      if (!description) {
        Swal.showValidationMessage("La descripción es obligatoria");
        return false;
      }

      if (!date) {
        Swal.showValidationMessage("La fecha y hora son obligatorias");
        return false;
      }      

      if (description.length < 1 || description.length > 50) {
        Swal.showValidationMessage(
          "La descripción de asamblea debe tener entre 1 y 50 caracteres"
        );
        return false;
      }

      if (description.length < 1 || description.length > 50) {
        Swal.showValidationMessage(
          "La descripción de asamblea debe tener entre 1 y 50 caracteres"
        );
        return false;
      }

      if (!url && !place) {
        Swal.showValidationMessage(
          "El URL y el lugar no pueden ser ambos nulos"
        );
        return false;
      }

      if (url && !(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(url))) {
        Swal.showValidationMessage(
          "El URL no es válido"
        );
        return false;
      }

      if (place && (place.length < 1 || place.length > 50)) {
        Swal.showValidationMessage(
          "El lugar debe tener entre 1 y 50 caracteres"
        );
        return false;
      }

      if (!isFutureDate(date)) {
        Swal.showValidationMessage(
          "No se puede agendar una asamblea para una fecha que ya pasó"
        );
        return false;
      }
      
      if (url && !place) {
          dataToSend = { description, date, url }
      } else if (!url && place) {
          dataToSend = { description, date, place }
      } else {
          dataToSend = { description, date, url, place };
      }
      
      return dataToSend
    },
  });
  if (formValues) {
    var result2 = true;
    const result = await asambleaMatchesDate(formValues.date);
    if (result) {
      result2 = await confirmCreation(result);
      // console.log(result2);
    }
    if (result2) {
      return {
        description: formValues.description,
        date: formValues.date,
        url: formValues.url,
        place: formValues.place,      
      };
    } else {
      return false;
    }
  }
}

export const useCreateAsamblea = (fetchAsambleas) => {
  const handleCreateAsamblea = async () => {
    try {
      const formValues = await createAsambleaInfo();
      if (!formValues) return;

      const response = await createAsamblea(formValues);
      if (response) {
        await fetchAsambleas();
      }
    } catch (error) {
      console.error("Error al crear asamblea:", error);
    }
  };

  return { handleCreateAsamblea };
};

export default useCreateAsamblea;
