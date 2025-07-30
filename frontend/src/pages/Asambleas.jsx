import "@styles/asambleas.css";
import useGetAsambleas from "@hooks/asambleas/useGetAsamblea.jsx";
import useDeleteAsamblea from "@hooks/asambleas/useDeleteAsamblea.jsx";
import useEditAsamblea from "@hooks/asambleas/useEditAsamblea.jsx";
import useCreateAsamblea from "@hooks/asambleas/useCreateAsamblea.jsx";
import { useEffect } from "react";
import { useAuth } from '@context/AuthContext';

const reAddProtocool = (link) => {
  if (typeof link !== 'string') {
    return "";
  }
  if (link.search(/https?:\/\//) === -1) {
    return "https://" + link;
  }
  return link;
};

/*
const googleMapsIntegration = (address) => {
  if (typeof address !== 'string') {
    return "";
  }
  const finalValue = <a href={"https://www.google.com/maps/search/" + encodeURIComponent(address)}>{address}</a>
  return finalValue;
}
*/

const Asambleas = () => {
  const { user } = useAuth();

  const { asambleas, fetchAsambleas } = useGetAsambleas();
  const { handleDeleteAsamblea } = useDeleteAsamblea(fetchAsambleas);
  const { handleEditAsamblea } = useEditAsamblea(fetchAsambleas);
  const { handleCreateAsamblea } = useCreateAsamblea(fetchAsambleas);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchAsambleas();
  }, []);

  const isReallyAuthenticated = () => {
    // console.log(user.rol == "presidente");
    return user.rol === "presidente";
  }

  const returnCreateButtonIfAuthenticated = () => {
    if (isReallyAuthenticated()) {
      return <button className="create" onClick={() => handleCreateAsamblea()}>Crear</button>
    } else return "";
  }

  const returnEditButtonsIfAuthenticaded = (asamblea) => {
    if (isReallyAuthenticated()) {
      const buttons = (
        <><td><button className="edit" onClick={() => handleEditAsamblea(asamblea.id, asamblea)}>Editar</button><button className="delete" onClick={() => handleDeleteAsamblea(asamblea.id)}>Eliminar</button></td></>
      );
      return buttons;
    } else return "";
  }

  const returnTableHeaderIfAuthenticated = () => {
    if (isReallyAuthenticated()) {
      return <th>Acciones</th>;
    } else return "";
  }

  return (
    <div className="asambleas-page">
      <h2>Lista de Asambleas</h2>
      {returnCreateButtonIfAuthenticated()}
      <table className="asambleas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Creador</th>
            <th>URL</th>
            <th>Lugar</th>
            {returnTableHeaderIfAuthenticated()}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(asambleas) && asambleas.length > 0 ? (
            asambleas.map((asamblea) => (
              <tr key={asamblea.id}>
                <td>{asamblea.id}</td>
                <td>{asamblea.description}</td>
                <td>{asamblea.date}</td>
                <td>{asamblea.creator.username + " (" + asamblea.creator.rut + ")"}</td>
                <td><a href={reAddProtocool(asamblea.url)}>{reAddProtocool(asamblea.url)}</a></td>
                <td>{asamblea.place}</td>
                {returnEditButtonsIfAuthenticaded(asamblea)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay asambleas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Asambleas;
