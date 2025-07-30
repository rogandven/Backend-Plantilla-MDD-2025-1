/*
import { useState } from 'react';
import { getUsers } from '@services/user.service.js';

export const useGetUsers = () => { 
    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            dataLogged(data);
            setUsers(data);
        } catch (error) {
            console.error("Error consiguiendo usuarios:", error);
        }
    };
    
    const dataLogged = (data) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem("usuario"));
            for (let i = 0; i < data.length; i++) {
                if(data[i].rut === rut) {
                    data.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error procesando datos de usuario:", error);
        }
    }

    return { users, setUsers, fetchUsers };
}

export default useGetUsers;
*/

import { useState } from 'react';
import { getUsers } from '@services/user.service.js';

//hook para obtener usuarios con filtro opcional
export const useGetUsers = () => { 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (query = "") => {
        setLoading(true);
        try {
            const data = await getUsers(query);
            dataLogged(data);
            setUsers(data);
        } catch (error) {
            console.error("Error consiguiendo usuarios:", error);
            setUsers([]);
        }
        setLoading(false);
    };
    
    const dataLogged = (data) => {
        try {
            const usuario = JSON.parse(sessionStorage.getItem("usuario"));
            if (!usuario) return;
            const { rut } = usuario;
            for (let i = 0; i < data.length; i++) {
                if(data[i].rut === rut) {
                    data.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error procesando datos de usuario:", error);
        }
    }

    return { users, setUsers, fetchUsers, loading };
}

export default useGetUsers;
