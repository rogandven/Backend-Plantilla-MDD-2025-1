import "@styles/Meeting.css";
import GetMeeting from "@hooks/meeting/meetingGet.jsx";
import DeleteMeeting from "@hooks/meeting/meetingDelete.jsx";
import EditMeeting from "@hooks/meeting/meetingUpdate.jsx";
import { useEffect } from "react";

const Meetings = () => {
  const { meeting, fetchMeeting } = GetMeeting();
  const { handleDeleteMeeting } = DeleteMeeting(fetchMeeting);
  const { handleEditMeeting } = EditMeeting(fetchMeeting);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchMeeting();
  }, []);

  return (
    <div className="meeting-page">
      <h2>Lista de Reuniones</h2>
      <table className="meeting-table">
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(meeting) && meeting.length > 0 ? (
            meeting.map((Meetings) => (
              <tr key={meeting.id}>
                <td>{meeting.id}</td>
                <td>{meeting.date}</td>
                <td>{meeting.time}</td>
                <td>
                  <button className="edit" onClick={() => handleEditMeeting(meeting.id, Meetings)}>Editar</button>
                  <button className="delete" onClick={() => handleDeleteMeeting(meeting.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay reuniones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Meetings;
