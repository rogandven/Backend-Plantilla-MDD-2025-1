import Swal from 'sweetalert2';
import { getResumenFinanciero } from '@services/Operaciones.service.js';
import { useState } from 'react';


export const useGetResumenFinanciero = () => {
    const [operaciones  , setResumen] = useState(null);
    const handleResumenFinanciero = async () => {
        try {
            const data = await getResumenFinanciero();
            setResumen(data);
            if (data && data.balance !== undefined) {
                await Swal.fire({
                  title: 'Resumen Financiero',
                  html: `
                    <div>
                      <p><strong>Balance Total:</strong> $${data.balance}</p>
                    </div>
                  `,
                  icon: 'info',
                  confirmButtonText: 'Aceptar',
                });
              }
        } catch (error) {
            console.error("Error obteniendo el Resumen Financiero:", error);
        } 
    };
    return { operaciones, handleResumenFinanciero };
}
export default useGetResumenFinanciero;