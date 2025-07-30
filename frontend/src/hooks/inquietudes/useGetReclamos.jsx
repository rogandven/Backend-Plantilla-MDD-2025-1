import { useState } from "react"
import { GetReclamos } from "@services/inquietudes.service.js"
export const useGetReclamos= ()=>{
    const [reclamos,setReclamos]=useState([])

    const fetchReclamos =async() =>{
        try {
            const data =await GetReclamos();
            console.log(data.data);
            setReclamos(data.data);
        } catch (error) {
            console.error("Error al conseguir quejas",error);
    
        }
    }
    return {reclamos, setReclamos, fetchReclamos}
}

export default useGetReclamos;