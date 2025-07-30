import { useState } from "react"
import { getOperaciones } from '@services/Operaciones.service.js';
export const  useGetOperaciones = () => {
const[Operaciones, setOperaciones] = useState([]);
  const fetchOperaciones = async () => {
        try {
            const data = await getOperaciones();
            setOperaciones(data.data);
        } catch (error) {
            console.error("Error consiguiendo las Operaciones:", error);
        }
    }

    return{Operaciones, setOperaciones, fetchOperaciones};
}
export default useGetOperaciones;