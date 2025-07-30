/*import "@styles/users.css"; // Reutilizamos estilos de tabla de usuarios
import { useEffect } from "react";
import useGetSolicitudes from "@hooks/solicitudes/useGetSolicitudes.jsx";
import useCreateSolicitud from "@hooks/solicitudes/useCreateSolicitud.jsx";
import useEditSolicitud from "@hooks/solicitudes/useEditSolicitud.jsx";
import useDeleteSolicitud from "@hooks/solicitudes/useDeleteSolicitud.jsx";
import useChangeSolicitudEstado from "@hooks/solicitudes/useChangeSolicitudEstado.jsx";


const getUser = () => JSON.parse(sessionStorage.getItem("usuario")) || {};
const isEstudiante = () =>
  getUser()?.rol === "ESTUDIANTE" || getUser()?.role === "ESTUDIANTE";
const isCee = () =>
  getUser()?.rol === "CEE" || getUser()?.role === "CEE";
const isAdmin = () =>
  getUser()?.rol === "administrador" || getUser()?.role === "administrador";



const Solicitudes = () => {
  const { solicitudes, fetchSolicitudes } = useGetSolicitudes();
  const { handleCreateSolicitud } = useCreateSolicitud(fetchSolicitudes);
  const { handleEditSolicitud } = useEditSolicitud(fetchSolicitudes);
  const { handleDeleteSolicitud } = useDeleteSolicitud(fetchSolicitudes);
  const { handleChangeEstado } = useChangeSolicitudEstado(fetchSolicitudes);

  useEffect(() => {
    fetchSolicitudes();
    // eslint-disable-next-line
  }, []);

  const user = getUser();

  // El estudiante solo ve y puede editar/eliminar sus propias solicitudes (si están "pendiente")
  // El CEE ve todas y puede gestionar/resolver

  return (
    <div className="users-page">
      <h2>Solicitudes</h2>
      {isEstudiante() && (
        <button
          className="books-addbtn"
          onClick={handleCreateSolicitud}
          style={{ marginBottom: "15px" }}
        >
          Registrar nueva solicitud
        </button>
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Detalle Resolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => {
              // Permisos para botones según rol y estado
              const puedeEditar =
                isEstudiante() &&
                solicitud.correo_estudiante === user.email &&
                solicitud.estado?.nombre === "pendiente";
              const puedeEliminar =
                isEstudiante()
                  ? solicitud.correo_estudiante === user.email &&
                    solicitud.estado?.nombre === "pendiente"
                  : isCee() || isAdmin();
              const puedeResolver =
                isCee() && solicitud.estado?.nombre === "pendiente";

              return (
                <tr key={solicitud.id}>
                  <td>{solicitud.nombre_estudiante}</td>
                  <td>{solicitud.correo_estudiante}</td>
                  <td>{solicitud.carrera}</td>
                  <td>{solicitud.descripcion}</td>
                  <td>{solicitud.estado?.nombre}</td>
                  <td>{solicitud.detalleResolucion || "-"}</td>
                  <td>
                    {puedeEditar && (
                      <button
                        className="edit"
                        onClick={() => handleEditSolicitud(solicitud)}
                      >
                        Editar
                      </button>
                    )}
                    {puedeEliminar && (
                      <button
                        className="delete"
                        onClick={() => handleDeleteSolicitud(solicitud.id)}
                      >
                        Eliminar
                      </button>
                    )}
                    {puedeResolver && (
                      <button
                        className="edit"
                        style={{ background: "#333" }}
                        onClick={() => handleChangeEstado(solicitud)}
                      >
                        Resolver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">No hay solicitudes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitudes;
*/

/*

import "@styles/users.css"; // Reutilizamos estilos de tabla de usuarios 
import { useEffect } from "react";
import useGetSolicitudes from "@hooks/solicitudes/useGetSolicitudes.jsx";
import useCreateSolicitud from "@hooks/solicitudes/useCreateSolicitud.jsx";
import useEditSolicitud from "@hooks/solicitudes/useEditSolicitud.jsx";
import useDeleteSolicitud from "@hooks/solicitudes/useDeleteSolicitud.jsx";
import useChangeSolicitudEstado from "@hooks/solicitudes/useChangeSolicitudEstado.jsx";

// Funciones para identificar el rol del usuario
const getUser = () => JSON.parse(sessionStorage.getItem("usuario")) || {};
const isEstudiante = () =>
  getUser()?.rol === "ESTUDIANTE" || getUser()?.role === "ESTUDIANTE";
const isCee = () =>
  getUser()?.rol === "CEE" || getUser()?.role === "CEE";
const isAdmin = () =>
  getUser()?.rol === "administrador" || getUser()?.role === "administrador";

const Solicitudes = () => {
  const { solicitudes, fetchSolicitudes } = useGetSolicitudes();
  const { handleCreateSolicitud } = useCreateSolicitud(fetchSolicitudes); // <-- Solo esta función
  const { handleEditSolicitud } = useEditSolicitud(fetchSolicitudes);
  const { handleDeleteSolicitud } = useDeleteSolicitud(fetchSolicitudes);
  const { handleChangeEstado } = useChangeSolicitudEstado(fetchSolicitudes);

  const user = getUser();

  useEffect(() => {
    fetchSolicitudes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="users-page">
      <h2>Solicitudes</h2>
      {isEstudiante() && (
        <button
          className="books-addbtn"
          onClick={handleCreateSolicitud}
          style={{ marginBottom: "15px" }}
        >
          Registrar nueva solicitud
        </button>
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Detalle Resolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => {
              // Permisos para botones según rol y estado
              const puedeEditar =
                isEstudiante() &&
                solicitud.correo_estudiante === user.email &&
                solicitud.estado?.nombre === "pendiente";
              const puedeEliminar =
                isEstudiante()
                  ? solicitud.correo_estudiante === user.email &&
                    solicitud.estado?.nombre === "pendiente"
                  : isCee() || isAdmin();
              const puedeResolver =
                isCee() && solicitud.estado?.nombre === "pendiente";

              return (
                <tr key={solicitud.id}>
                  <td>{solicitud.nombre_estudiante}</td>
                  <td>{solicitud.correo_estudiante}</td>
                  <td>{solicitud.carrera}</td>
                  <td>{solicitud.descripcion}</td>
                  <td>{solicitud.estado?.nombre}</td>
                  <td>{solicitud.detalleResolucion || "-"}</td>
                  <td>
                    {puedeEditar && (
                      <button
                        className="edit"
                        onClick={() => handleEditSolicitud(solicitud)}
                      >
                        Editar
                      </button>
                    )}
                    {puedeEliminar && (
                      <button
                        className="delete"
                        onClick={() => handleDeleteSolicitud(solicitud.id)}
                      >
                        Eliminar
                      </button>
                    )}
                    {puedeResolver && (
                      <button
                        className="edit"
                        style={{ background: "#333" }}
                        onClick={() => handleChangeEstado(solicitud)}
                      >
                        Resolver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">No hay solicitudes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitudes;


*/

/*
import "@styles/solicitudes.css"; // Asegúrate que este archivo exista
import { useEffect } from "react";
import useGetSolicitudes from "@hooks/solicitudes/useGetSolicitudes.jsx";
import useCreateSolicitud from "@hooks/solicitudes/useCreateSolicitud.jsx";
import useEditSolicitud from "@hooks/solicitudes/useEditSolicitud.jsx";
import useDeleteSolicitud from "@hooks/solicitudes/useDeleteSolicitud.jsx";
import useChangeSolicitudEstado from "@hooks/solicitudes/useChangeSolicitudEstado.jsx";

// Funciones para identificar el rol del usuario
const getUser = () => JSON.parse(sessionStorage.getItem("usuario")) || {};
const isEstudiante = () =>
  getUser()?.rol === "ESTUDIANTE" || getUser()?.role === "ESTUDIANTE";
const isCee = () => getUser()?.rol === "CEE" || getUser()?.role === "CEE";
const isAdmin = () =>
  getUser()?.rol === "administrador" || getUser()?.role === "administrador";

const Solicitudes = () => {
  const { solicitudes, fetchSolicitudes } = useGetSolicitudes();
  const { handleCreateSolicitud } = useCreateSolicitud(fetchSolicitudes);
  const { handleEditSolicitud } = useEditSolicitud(fetchSolicitudes);
  const { handleDeleteSolicitud } = useDeleteSolicitud(fetchSolicitudes);
  const { handleChangeEstado } = useChangeSolicitudEstado(fetchSolicitudes);

  const user = getUser();

  useEffect(() => {
    fetchSolicitudes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="users-page">
      <h2>Solicitudes</h2>
      {isEstudiante() && (
        <button className="solicitud-addbtn" onClick={handleCreateSolicitud}>
          Registrar nueva solicitud
        </button>
      )}

      <table className="solicitud-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Detalle Resolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => {
              const puedeEditar =
                isEstudiante() &&
                solicitud.correo_estudiante === user.email &&
                solicitud.estado?.nombre === "pendiente";
              const puedeEliminar = isEstudiante()
                ? solicitud.correo_estudiante === user.email &&
                  solicitud.estado?.nombre === "pendiente"
                : isCee() || isAdmin();
              const puedeResolver =
                isCee() && solicitud.estado?.nombre === "pendiente";

              return (
                <tr key={solicitud.id}>
                  <td>{solicitud.nombre_estudiante}</td>
                  <td>{solicitud.correo_estudiante}</td>
                  <td>{solicitud.carrera}</td>
                  <td>{solicitud.descripcion}</td>
                  <td>{solicitud.estado?.nombre}</td>
                  <td>{solicitud.detalleResolucion || "-"}</td>
                  <td>
                    {puedeEditar && (
                      <button
                        className="edit"
                        onClick={() => handleEditSolicitud(solicitud)}
                      >
                        Editar
                      </button>
                    )}
                    {puedeEliminar && (
                      <button
                        className="delete"
                        onClick={() => handleDeleteSolicitud(solicitud.id)}
                      >
                        Eliminar
                      </button>
                    )}
                    {puedeResolver && (
                      <button
                        className="edit"
                        style={{ background: "#333" }}
                        onClick={() => handleChangeEstado(solicitud)}
                      >
                        Resolver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">No hay solicitudes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitudes;
*/

import "@styles/solicitudes.css"; // Usa el CSS que definiste
import { useEffect } from "react";
import useGetSolicitudes from "@hooks/solicitudes/useGetSolicitudes.jsx";
import useCreateSolicitud from "@hooks/solicitudes/useCreateSolicitud.jsx";
import useEditSolicitud from "@hooks/solicitudes/useEditSolicitud.jsx";
import useDeleteSolicitud from "@hooks/solicitudes/useDeleteSolicitud.jsx";
import useChangeSolicitudEstado from "@hooks/solicitudes/useChangeSolicitudEstado.jsx";

// Funciones para identificar el rol del usuario
const getUser = () => JSON.parse(sessionStorage.getItem("usuario")) || {};
const isEstudiante = () =>
  getUser()?.rol === "ESTUDIANTE" || getUser()?.role === "ESTUDIANTE";
const isCee = () =>
  getUser()?.rol === "CEE" || getUser()?.role === "CEE";
const isAdmin = () =>
  getUser()?.rol === "administrador" || getUser()?.role === "administrador";

const Solicitudes = () => {
  const { solicitudes, fetchSolicitudes } = useGetSolicitudes();
  const { handleCreateSolicitud } = useCreateSolicitud(fetchSolicitudes);
  const { handleEditSolicitud } = useEditSolicitud(fetchSolicitudes);
  const { handleDeleteSolicitud } = useDeleteSolicitud(fetchSolicitudes);
  const { handleChangeEstado } = useChangeSolicitudEstado(fetchSolicitudes);

  const user = getUser();

  useEffect(() => {
    fetchSolicitudes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="users-page">
      <h2>Solicitudes</h2>

      {/* Contenedor botón con margen y control de posición */}
      {isEstudiante() && (
        <div className="solicitud-button-container">
          <button
            className="solicitud-addbtn"
            onClick={handleCreateSolicitud}
          >
            Registrar nueva solicitud
          </button>
        </div>
      )}

      <table className="solicitud-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Detalle Resolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => {
              const puedeEditar =
                isEstudiante() &&
                solicitud.correo_estudiante === user.email &&
                solicitud.estado?.nombre === "pendiente";
              const puedeEliminar =
                isEstudiante()
                  ? solicitud.correo_estudiante === user.email &&
                    solicitud.estado?.nombre === "pendiente"
                  : isCee() || isAdmin();
              const puedeResolver =
                isCee() && solicitud.estado?.nombre === "pendiente";

              return (
                <tr key={solicitud.id}>
                  <td>{solicitud.nombre_estudiante}</td>
                  <td>{solicitud.correo_estudiante}</td>
                  <td>{solicitud.carrera}</td>
                  <td>{solicitud.descripcion}</td>
                  <td>{solicitud.estado?.nombre}</td>
                  <td>{solicitud.detalleResolucion || "-"}</td>
                  <td>
                    {puedeEditar && (
                      <button
                        className="edit"
                        onClick={() => handleEditSolicitud(solicitud)}
                      >
                        Editar
                      </button>
                    )}
                    {puedeEliminar && (
                      <button
                        className="delete"
                        onClick={() => handleDeleteSolicitud(solicitud.id)}
                      >
                        Eliminar
                      </button>
                    )}
                    {puedeResolver && (
                      <button
                        className="edit"
                        style={{ background: "#333" }}
                        onClick={() => handleChangeEstado(solicitud)}
                      >
                        Resolver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">No hay solicitudes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitudes;
