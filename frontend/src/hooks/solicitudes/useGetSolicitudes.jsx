import { useState } from "react";
import { getSolicitudes } from "@services/solicitud.service.js";

export const useGetSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  const fetchSolicitudes = async (query = "") => {
    try {
      const data = await getSolicitudes(query);
      setSolicitudes(data.data || []);
    } catch (error) {
         console.error(error);
      setSolicitudes([]);
    }
  };

  return { solicitudes, setSolicitudes, fetchSolicitudes };
};

export default useGetSolicitudes;
