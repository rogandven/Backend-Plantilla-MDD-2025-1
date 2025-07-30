import "@styles/Meeting.css";
import GetMeeting from "@hooks/meeting/meetingGet.jsx";
import Createmeeting from "@hooks/meeting/meetingCreate.jsx"
import DeleteMeeting from "@hooks/meeting/meetingDelete.jsx";
import EditMeeting from "@hooks/meeting/meetingUpdate.jsx";
import { useEffect } from "react";

const Meetings = () => {

  const { meeting, fetchMeeting } = GetMeeting();
  const {handleCreateMeeting} = Createmeeting (fetchMeeting);
  const { handleDeleteMeeting } = DeleteMeeting(fetchMeeting);
  const { handleEditMeeting } = EditMeeting(fetchMeeting);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchMeeting();
  }, []);

  return (
    <div className="meeting-page">
      <h2>Lista de Reuniones</h2>
      <button className="create" onClick={() => handleCreateMeeting(Meetings.date, Meetings.time, Meetings.description, Meetings)}>Crear</button>
      <table className="meeting-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Creada a las</th>
            <th>Creada por</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(meeting) && meeting.length > 0 ? (
            meeting.map((Meetings) => (
              <tr key={"Meetings" + Meetings.id}>
                <td>{Meetings.id}</td>
                <td>{Meetings.date}</td>
                <td>{Meetings.time}</td>
                <td>{Meetings.createdAt}</td>
                <td>{Meetings.createdBy}</td>
                <td>{Meetings.description}</td>
                <td>{Meetings.status}</td>
                <td>
                  <button className="edit" onClick={() => handleEditMeeting(Meetings.id, Meetings)}>Editar</button>
                  <button className="delete" onClick={() => handleDeleteMeeting(Meetings.id)}>Eliminar</button>
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
