import '@styles/inquietudes.css'
import useGetReclamos from '@hooks/inquietudes/useGetReclamos.jsx'
import useDeleteReclamo from '@hooks/inquietudes/useDeleteReclamo.jsx';
import useEditReclamo from '@hooks/inquietudes/useEditReclamo.jsx';
import useCreateReclamo from '@hooks/inquietudes/useCreateReclamo.jsx';
import { useEffect } from 'react';

function Reclamos(){

    const {reclamos, fetchReclamos}=useGetReclamos();
    const {handleDeleteReclamo} =useDeleteReclamo(fetchReclamos);
    const {handleEditReclamo} = useEditReclamo(fetchReclamos);
    const {handleCreateReclamo} = useCreateReclamo(fetchReclamos);

    /*eslint-dissable react hooks/exhautive-deps */
    useEffect(() => {
        fetchReclamos();
    }, []);

    return(
        <div className="Reclamos-page">
            <div className="reclamos-header">
                <h2>Lista de Reclamos</h2>
                <button className="reclamos-addbtn" onClick={() => handleCreateReclamo()}>Añadir</button>
            </div>
            <table className="reclamos-table">
                <thead>
                    <tr>
                        <th> Nombre del profesor</th>
                        <th> Descripción</th>
                        <th> Ramo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {reclamos=== undefined ||reclamos ===null?(
                    <tr>
                        <td colSpan="4">Cargando..</td>
                    </tr>
                ): Array.isArray(reclamos) && reclamos.length >0 ? (
                    reclamos.map((reclamo) => (
                            <tr key={reclamo.id}> 
                            <td>{reclamo.nombre_del_profesor}</td>
                            <td>{reclamo.descripcion}</td>
                            <td>{reclamo.ramo}</td>
                            <td>
                               <button className="edit" onClick={() => handleEditReclamo(reclamo.id,reclamo)}>Editar</button>
                               <button className="delete" onClick={()=>handleDeleteReclamo(reclamo.id)}>Eliminar</button>  
                            </td>
                            </tr>
                        ))
                   ) : (

                        <tr>
                            <td coLSpan="4">No hay reclamos disponibles </td>
                        </tr>
                   )}
                </tbody>
            </table>
           
        </div>
    )
    
}

export default Reclamos;