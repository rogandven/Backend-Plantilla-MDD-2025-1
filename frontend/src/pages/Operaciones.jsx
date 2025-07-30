import '@styles/Operaciones.css';
import useGetOperaciones from '@hooks/Operaciones/useGetOperaciones.jsx';
import useDeleteOperacion from '@hooks/Operaciones/useDeleteOperaciones.jsx';
import useEditOperacion from '@hooks/Operaciones/useEditOperaciones.jsx';
import useCreateOperacion from '@hooks/Operaciones/useCreateOperacion';
import { useGetResumenFinanciero } from '@hooks/Operaciones/useGetResumenFinanciero.jsx';
import { useEffect } from 'react';

const Operaciones = () =>{
const {Operaciones ,fetchOperaciones} =useGetOperaciones();
const {handleDeleteOperacion} = useDeleteOperacion(fetchOperaciones);
const {handleEditOperacion} = useEditOperacion(fetchOperaciones); 
const {handleCreateOperacion} = useCreateOperacion(fetchOperaciones);
const {operaciones, handleResumenFinanciero} = useGetResumenFinanciero();
useEffect(() =>{
fetchOperaciones();

},[])
// console.log(Operaciones);
const balanceTotal = Operaciones.reduce((acc, op) => acc + (op.balance || 0), 0);
return (
<div className="Operaciones-page">
<div className="Operaciones-header">
<h2>Lista de Actividades</h2>
<button className="Operaciones-ddbtn" onClick={() => handleCreateOperacion()}>Añadir</button>
</div>
<table className="Operaciones-table">
<thead>
<tr>
<th>Nombre</th>
<th>Monto</th> 
<th>Acciones</th>
</tr>  
</thead>
<tbody>
{Array.isArray(Operaciones) && Operaciones.length > 0 ? (
            Operaciones.map((operaciones) => (
              <tr key={operaciones.id}>
                <td>{operaciones.nombre_actividad}</td>
                <td>{operaciones.monto}</td>
                <td>
                  <button className="edit" onClick={() => handleEditOperacion(operaciones.id, operaciones)}>Editar</button>
                  <button className="delete" onClick={() => handleDeleteOperacion(operaciones.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay Operaciones disponibles</td>
            </tr>
          )}
</tbody>
</table>
<button className="Operaciones-psummary" onClick={() => handleResumenFinanciero(balanceTotal)}>GenerarResumenFinanciero</button>
</div>
)
}
export default Operaciones;