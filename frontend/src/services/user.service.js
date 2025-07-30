
import axios from '@services/root.service.js';

export async function getUsers() {
    try {
        const response = await axios.get('/users');
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

export async function editUser(userId, userData) { 
    try {
        const response = await axios.put(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }
}

export async function deleteUser(userId) {
    try {
        const response = await axios.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
}

export async function getProfile() { 
    try {
        const response = await axios.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        throw error;
    }
}

/*
import axios from '@services/root.service.js';

// Obtener usuarios (con filtros via query string)
export async function getUsers(query = '') {
    try {
        // Puedes pasar por ejemplo: "?username=juan&role=CEE"
        const response = await axios.get(`/users${query}`);
        // Compatibilidad con ambos formatos de respuesta
        return response.data.data || response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}

// Obtener un usuario por ID (opcional, útil para detalle/edición)
export async function getUserById(userId) {
    try {
        const response = await axios.get(`/users/${userId}`);
        return response.data.data || response.data;
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        throw error;
    }
}

// Editar usuario (por ID)
export async function editUser(userId, userData) { 
    try {
        const response = await axios.put(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error al editar usuario:", error);
        throw error;
    }
}

// Eliminar usuario (por ID)
export async function deleteUser(userId) {
    try {
        const response = await axios.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
}

// Registrar un nuevo integrante CEE (solo admin)
export async function registerCeeUser(userData) {
    try {
        const response = await axios.post('/users/register-cee', userData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario CEE:", error);
        throw error;
    }
}

// Obtener perfil del usuario autenticado
export async function getProfile() { 
    try {
        const response = await axios.get('/users/profile');
        return response.data.data || response.data;
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        throw error;
    }
}
*/