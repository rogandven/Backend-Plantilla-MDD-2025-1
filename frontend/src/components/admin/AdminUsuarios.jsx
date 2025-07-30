/*
import "@styles/usuarios.css";
import { useEffect, useState } from "react";
import useGetUsers from "@hooks/useGetUsers.jsx";
import useDeleteUser from "@hooks/useDeleteUser.jsx";
import useCreateCeeUser from "@hooks/useCreateCeeUser.jsx";

const AdminUsuarios = () => {
  const { users, fetchUsers, loading } = useGetUsers();
  const { handleDeleteUser } = useDeleteUser(fetchUsers);
  const { handleCreateCeeUser } = useCreateCeeUser(fetchUsers);

  // Filtros del administrador
  const [filtro, setFiltro] = useState({
    username: "",
    email: "",
    rut: "",
    role: "",
  });

  useEffect(() => {
    // Arma la query string
    let q = "?";
    if (filtro.username) q += `username=${encodeURIComponent(filtro.username)}&`;
    if (filtro.email) q += `email=${encodeURIComponent(filtro.email)}&`;
    if (filtro.rut) q += `rut=${encodeURIComponent(filtro.rut)}&`;
    if (filtro.role) q += `role=${encodeURIComponent(filtro.role)}`;
    fetchUsers(q !== "?" ? q : "");
    // eslint-disable-next-line
  }, [filtro]);

  return (
    <div className="admin-users-page">
      <h2>Gestión de Usuarios</h2>
      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={filtro.username}
          onChange={e => setFiltro(f => ({ ...f, username: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Correo"
          value={filtro.email}
          onChange={e => setFiltro(f => ({ ...f, email: e.target.value }))}
        />
        <input
          type="text"
          placeholder="RUT"
          value={filtro.rut}
          onChange={e => setFiltro(f => ({ ...f, rut: e.target.value }))}
        />
        <select
          value={filtro.role}
          onChange={e => setFiltro(f => ({ ...f, role: e.target.value }))}
        >
          <option value="">Todos los roles</option>
          <option value="CEE">CEE</option>
          <option value="ESTUDIANTE">ESTUDIANTE</option>
          <option value="administrador">ADMINISTRADOR</option>
        </select>
        <button className="admin-add-cee-btn" onClick={handleCreateCeeUser}>
          Registrar Integrante CEE
        </button>
      </div>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>RUT</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!loading && users.length > 0 ? (
              users.map(u => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.rut}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="delete" onClick={() => handleDeleteUser(u.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>{loading ? "Cargando..." : "No hay usuarios"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsuarios;
*/

/*
import "@styles/usuarios.css";
import { useEffect, useState } from "react";
import useGetUsers from "@hooks/useGetUsers.jsx";
import useDeleteUser from "@hooks/useDeleteUser.jsx";
import useCreateCeeUser from "@hooks/useCreateCeeUser.jsx";
import useEditUser from "@hooks/useEditUser.jsx"; // <-- Agrega este hook

const AdminUsuarios = () => {
  const { users, fetchUsers, loading } = useGetUsers();
  const { handleDeleteUser } = useDeleteUser(fetchUsers);
  const { handleCreateCeeUser } = useCreateCeeUser(fetchUsers);
  const { handleEditUser } = useEditUser(fetchUsers); // <-- Agrega el hook

  // Filtros del administrador
  const [filtro, setFiltro] = useState({
    username: "",
    email: "",
    rut: "",
    role: "",
  });

  useEffect(() => {
    let q = "?";
    if (filtro.username) q += `username=${encodeURIComponent(filtro.username)}&`;
    if (filtro.email) q += `email=${encodeURIComponent(filtro.email)}&`;
    if (filtro.rut) q += `rut=${encodeURIComponent(filtro.rut)}&`;
    if (filtro.role) q += `role=${encodeURIComponent(filtro.role)}`;
    fetchUsers(q !== "?" ? q : "");
    // eslint-disable-next-line
  }, [filtro]);

  return (
    <div className="admin-users-page">
      <h2>Gestión de Usuarios</h2>
      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={filtro.username}
          onChange={e => setFiltro(f => ({ ...f, username: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Correo"
          value={filtro.email}
          onChange={e => setFiltro(f => ({ ...f, email: e.target.value }))}
        />
        <input
          type="text"
          placeholder="RUT"
          value={filtro.rut}
          onChange={e => setFiltro(f => ({ ...f, rut: e.target.value }))}
        />
        <select
          value={filtro.role}
          onChange={e => setFiltro(f => ({ ...f, role: e.target.value }))}
        >
          <option value="">Todos los roles</option>
          <option value="CEE">CEE</option>
          <option value="ESTUDIANTE">ESTUDIANTE</option>
          <option value="administrador">ADMINISTRADOR</option>
        </select>
        <button className="admin-add-cee-btn" onClick={handleCreateCeeUser}>
          Registrar Integrante CEE
        </button>
      </div>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>RUT</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!loading && users.length > 0 ? (
              users.map(u => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.rut}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="edit" onClick={() => handleEditUser(u)}>
                      Editar
                    </button>
                    <button className="delete" onClick={() => handleDeleteUser(u.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>{loading ? "Cargando..." : "No hay usuarios"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsuarios;
*/


import "@styles/usuarios.css";
import { useEffect, useState } from "react";
import useGetUsers from "@hooks/useGetUsers.jsx";
import useDeleteUser from "@hooks/useDeleteUser.jsx";
import useCreateCeeUser from "@hooks/useCreateCeeUser.jsx";

const AdminUsuarios = () => {
  const { users, fetchUsers, loading } = useGetUsers();
  const { handleDeleteUser } = useDeleteUser(fetchUsers);
  const { handleCreateCeeUser } = useCreateCeeUser(fetchUsers);

  // Filtros del administrador
  const [filtro, setFiltro] = useState({
    username: "",
    email: "",
    rut: "",
    role: "",
  });

  useEffect(() => {
    // Arma la query string
    let q = "?";
    if (filtro.username) q += `username=${encodeURIComponent(filtro.username)}&`;
    if (filtro.email) q += `email=${encodeURIComponent(filtro.email)}&`;
    if (filtro.rut) q += `rut=${encodeURIComponent(filtro.rut)}&`;
    if (filtro.role) q += `role=${encodeURIComponent(filtro.role)}`;
    fetchUsers(q !== "?" ? q : "");
    // eslint-disable-next-line
  }, [filtro]);

  return (
    <div className="admin-users-page">
      <h2>Gestión de Usuarios</h2>
      
      {/* Botón igual al de registrar solicitud */}
      <div className="solicitud-button-container">
        <button
          className="solicitud-addbtn"
          onClick={handleCreateCeeUser}
        >
          Registrar Integrante CEE
        </button>
      </div>
      
      {/* Filtros */}
      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={filtro.username}
          onChange={e => setFiltro(f => ({ ...f, username: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Correo"
          value={filtro.email}
          onChange={e => setFiltro(f => ({ ...f, email: e.target.value }))}
        />
        <input
          type="text"
          placeholder="RUT"
          value={filtro.rut}
          onChange={e => setFiltro(f => ({ ...f, rut: e.target.value }))}
        />
        <select
          value={filtro.role}
          onChange={e => setFiltro(f => ({ ...f, role: e.target.value }))}
        >
          <option value="">Todos los roles</option>
          <option value="CEE">CEE</option>
          <option value="ESTUDIANTE">ESTUDIANTE</option>
          <option value="administrador">ADMINISTRADOR</option>
        </select>
      </div>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>RUT</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!loading && users.length > 0 ? (
              users.map(u => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.rut}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="edit">
                      Editar
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>{loading ? "Cargando..." : "No hay usuarios"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsuarios;
