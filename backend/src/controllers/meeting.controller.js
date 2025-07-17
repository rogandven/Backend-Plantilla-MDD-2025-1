"use strict";
import { AppDataSource } from "../config/configDb.js";
import { Meeting } from "../entity/meeting.entity.js";

const meetingRepository = AppDataSource.getRepository(Meeting);

// Función para validar el formato de fecha (DD/MM/YYYY)
const isValidDateFormat = (dateStr) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateStr)) return false;
    
    const [, day, month, year] = dateStr.match(regex);
    const date = new Date(year, month - 1, day);
    
    return date.getDate() == day && 
           date.getMonth() == month - 1 && 
           date.getFullYear() == year;
};

// Función para validar el formato de hora (HH:mm)
const isValidTimeFormat = (timeStr) => {
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!regex.test(timeStr)) return false;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

// Función para convertir fecha de formato DD/MM/YYYY a Date
const parseDate = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split('/');
    const [hours, minutes] = timeStr.split(':');
    return new Date(year, month - 1, day, hours, minutes);
};

// Crear una nueva reunión
export const createMeeting = async (req, res) => {
    try {
        const { date, time, description } = req.body;

        // Validaciones de fecha
        if (!date) {
            return res.status(400).json({
                message: "La fecha es requerida"
            });
        }

        if (!isValidDateFormat(date)) {
            return res.status(400).json({
                message: "El formato de fecha debe ser DD/MM/YYYY (ejemplo: 20/07/2025)"
            });
        }

        // Validaciones de hora
        if (!time) {
            return res.status(400).json({
                message: "La hora es requerida"
            });
        }

        if (!isValidTimeFormat(time)) {
            return res.status(400).json({
                message: "El formato de hora debe ser HH:mm en formato 24 horas (ejemplo: 15:30)"
            });
        }

        // Validaciones de descripción
        if (!description) {
            return res.status(400).json({
                message: "La descripción es requerida"
            });
        }

        if (description.length < 10) {
            return res.status(400).json({
                message: "La descripción debe tener al menos 10 caracteres"
            });
        }

        if (description.length > 500) {
            return res.status(400).json({
                message: "La descripción no puede exceder los 500 caracteres"
            });
        }
          // Convertir y verificar la fecha/hora
        const meetingDateTime = parseDate(date, time);
        const now = new Date();

        if (meetingDateTime < now) {
            return res.status(400).json({
                message: "No se pueden agendar reuniones con fecha y hora anterior a la actual"
            });
        }

        // Crear la reunión
        const meeting = await meetingRepository.create({
            date: date,
            time: time,
            description,
            createdBy: req.user.username,// Asumiendo que el middleware de autenticación agrega el usuario a req
            status: "scheduled"
        });

        // Guardar la reunión
        await meetingRepository.save(meeting);

        return res.status(201).json({
            message: "Reunión agendada exitosamente",
            meeting
        });
    } catch (error) {
        console.error("Error al crear reunión:", error);
        return res.status(500).json({
            message: "Error al agendar la reunión"
        });
    }
};

// Obtener todas las reuniones
export const getAllMeetings = async (req, res) => {
    try {
        const meetings = await meetingRepository.find({
            order: {
                date: "ASC"
            }
        });
        
        return res.json(meetings);
    } catch (error) {
        console.error("Error al obtener reuniones:", error);
        return res.status(500).json({
            message: "Error al obtener las reuniones"
        });
    }
};

// Obtener una reunión específica
export const getMeetingById = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await meetingRepository.findOne({
            where: { id: parseInt(id) }
        });

        if (!meeting) {
            return res.status(404).json({
                message: "Reunión no encontrada"
            });
        }

        return res.json(meeting);
    } catch (error) {
        console.error("Error al obtener reunión:", error);
        return res.status(500).json({
            message: "Error al obtener la reunión"
        });
    }
};

// Actualizar una reunión
export const updateMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time, description } = req.body;

        // Validaciones de fecha
        if (date) {
            if (!isValidDateFormat(date)) {
                return res.status(400).json({
                    message: "El formato de fecha debe ser DD/MM/YYYY (ejemplo: 20/07/2025)"
                });
            }
        }

        // Validaciones de hora
        if (time) {
            if (!isValidTimeFormat(time)) {
                return res.status(400).json({
                    message: "El formato de hora debe ser HH:mm en formato 24 horas (ejemplo: 15:30)"
                });
            }
        }

        // Validaciones de descripción
        if (description) {
            if (description.length < 10) {
                return res.status(400).json({
                    message: "La descripción debe tener al menos 10 caracteres"
                });
            }

            if (description.length > 500) {
                return res.status(400).json({
                    message: "La descripción no puede exceder los 500 caracteres"
                });
            }
        }

        const meeting = await meetingRepository.findOne({
            where: { id: parseInt(id) }
        });

        if (!meeting) {
            return res.status(404).json({
                message: "Reunión no encontrada"
            });
        }

        // Verificar que la fecha no sea anterior a la actual
        const meetingDate = new Date(date);
        const now = new Date();
        
        if (meetingDate < now) {
            return res.status(400).json({
                message: "No se pueden agendar reuniones con fecha anterior a la actual"
            });
        }

        // Si se actualiza fecha u hora, validar que no sea en el pasado
        if (date || time) {
            const newDate = date || meeting.date;
            const newTime = time || meeting.time;
            const meetingDateTime = parseDate(newDate, newTime);
            
            if (meetingDateTime < new Date()) {
                return res.status(400).json({
                    message: "No se pueden agendar reuniones con fecha y hora anterior a la actual"
                });
            }
            
            if (date) meeting.date = date;
            if (time) meeting.time = time;
        }
        if (description) {
            meeting.description = description;
        }

        await meetingRepository.save(meeting);

        return res.json({
            message: "Reunión actualizada exitosamente",
            meeting
        });
    } catch (error) {
        console.error("Error al actualizar reunión:", error);
        return res.status(500).json({
            message: "Error al actualizar la reunión"
        });
    }
};

// Eliminar una reunión
export const deleteMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await meetingRepository.findOne({
            where: { id: parseInt(id) }
        });

        if (!meeting) {
            return res.status(404).json({
                message: "Reunión no encontrada"
            });
        }

        await meetingRepository.remove(meeting);

        return res.json({
            message: "Reunión eliminada exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar reunión:", error);
        return res.status(500).json({
            message: "Error al eliminar la reunión"
        });
    }
};
