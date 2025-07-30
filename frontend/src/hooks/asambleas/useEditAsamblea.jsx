import { editAsamblea } from "../../services/asamblea.service";
import Swal from "sweetalert2";

function returnEmptyIfNull(s) {
  if (s === null || s === undefined) {
    return "";
  }
  return s;
}

/*
function convertDate(date) {
  return date.split(".", 2)[0];
}
*/

function isFutureDate(date) {
    const today = Date.now();
    date = Date.parse(date);
    if (today > date) {
      return false;
    }
    return true;
}

function convertToISOFormat(date, time) {
    
    if (time === undefined || time === null) {
      // console.log(undefined);
      return undefined;
    }
    if (date === undefined || date === null) {
      // console.log(undefined);
      return undefined;
    }
    const returnValue = date + "T" + time + ":00.000Z";
    // console.log(returnValue);
    return returnValue;
}

function returnEmptyStringIfUndefined(str) {
    if (str === undefined || str === null) {
      return "";
    }
    return str;
}

function convertFromISOFormat(ISOdate) {
    // console.log(ISOdate);
    // 2021-10-25T18:36:27Z
    var date = "";
    var time = "";
    if (ISOdate === undefined || ISOdate === null) {
      return {
        date: date,
        time: time
      };
    }
    ISOdate = ISOdate.split("T");
    date = returnEmptyStringIfUndefined(ISOdate[0]);
    try {
      time = ISOdate[1].split(":");
      time = time[0] + ":" + time[1];
    } catch (error) {
      // console.log(error);
      time = "";
    }

    const returnValue = {
      date: date,
      time: time
    };
    // console.log(returnValue);
    return returnValue;
}

async function editAsambleaInfo(asamblea) {
  const date = convertFromISOFormat(asamblea.date); 
  const { value: formValues } = await Swal.fire({
    title: "Editar Asamblea",
    html: `
    <div>
      <label for="swal2-input1">Descripción</label>  
      <input id="swal2-input1" class="swal2-input" placeholder="Descripción" value = "${asamblea.description}">
    </div>
    <div>
      <label for="swal2-input20">Fecha</label>  
      <input type="date" id="swal2-input20" class="swal2-input" placeholder="Fecha" value = "${date.date}">
    </div>
    <div>
      <label for="swal2-input21">Hora</label>  
      <input type="time" id="swal2-input21" class="swal2-input" placeholder="Hora" value = "${date.time}">
    </div> 
    <div>
      <label for="swal2-input3">URL</label>  
      <input type="url" id="swal2-input3" class="swal2-input" placeholder="URL" value = "${returnEmptyIfNull(asamblea.url)}">
    </div>
    <div>
      <label for="swal2-input4">Lugar</label>  
      <input id="swal2-input4" class="swal2-input" placeholder="Lugar" value = "${returnEmptyIfNull(asamblea.place)}">
    </div>            
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Editar",
    preConfirm: () => {
      var dataToSend = undefined;
      const description = document.getElementById("swal2-input1").value;
      const date = convertToISOFormat(document.getElementById("swal2-input20").value, document.getElementById("swal2-input21").value);
      var url = document.getElementById("swal2-input3").value;
      var place = document.getElementById("swal2-input4").value;

      if (!description || !date || !(url || place)) {
        Swal.showValidationMessage("Por favor, completa todos los campos");
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
          place = null;
      } else if (!url && place) {
          url = null;
      }
      
      dataToSend = { description, date, url, place };
      return dataToSend
    },
  });
  if (formValues) {
    return {
      description: formValues.description,
      date: formValues.date,
      url: formValues.url,
      place: formValues.place,      
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
