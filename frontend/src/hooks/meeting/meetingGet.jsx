import { useState } from 'react';
import { getAllMeeting } from '@services/meeting.service.js';

export const GetMeeting = () => { 
    const [meeting, setMeeting] = useState([]);
    
    const fetchMeeting = async () => {
        try {
            const data = await getAllMeeting();
            dataLogged(data);
            setMeeting(data);
        } catch (error) {
            console.error("Error al conseguir reuniones:", error);
        }
    };
    
    const dataLogged = (data) => {
        try {
            const { id } = JSON.parse(sessionStorage.getItem("Meetings"));
            for (let i = 0; i < data.length; i++) {
                if(data[i].id === id) {
                    data.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error procesando datos de reuniones agendadas:", error);
        }
    }

    return { meeting, setMeeting, fetchMeeting };
}

export default GetMeeting;