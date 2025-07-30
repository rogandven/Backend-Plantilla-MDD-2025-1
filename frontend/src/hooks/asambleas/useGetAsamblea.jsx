import { useState } from 'react';
import { getAsambleas } from '@services/asamblea.service.js';

export const useGetAsambleas = () => { 
    const [asambleas, setAsambleas] = useState([]);
    
    const fetchAsambleas = async () => {
        try {
            const data = await getAsambleas();
            // dataLogged(data);
            setAsambleas(data);
        } catch (error) {
            console.error("Error consiguiendo asambleas:", error);
        }
    };
    
    /*
    const dataLogged = (data) => {
        try {
            const { id } = JSON.parse(sessionStorage.getItem("asamblea"));
            for (let i = 0; i < data.length; i++) {
                if(data[i].id === id) {
                    data.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error procesando datos de asamblea:", error);
        }
    }
    */

    return { asambleas, setAsambleas, fetchAsambleas };
}

export default useGetAsambleas;