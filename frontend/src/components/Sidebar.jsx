import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import { FaHome, FaUsers, FaSignOutAlt,FaBookOpen, FaWineGlass} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "@styles/Sidebar.css";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { globalIsAdmin } from "../../algo/globalIsAdmin.js";

const Sidebar = () => {
  const navigate = useNavigate();
  var preUser = undefined;
  try {
    preUser = JSON.parse(sessionStorage.getItem("usuario"));
  } catch (error) {
    // console.log("Error en Sidebar:" + error); 
  }


  const user = preUser || "";
  const userRole = user?.rol;

  const logoutSubmit = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="sidebar">
      <h2>CEE</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">
              <FaHome className="icon"/> Inicio
            </NavLink>
          </li>
          {(globalIsAdmin(userRole)) && (
            <div>
            <li>
              <NavLink to="/users">
                <FaUsers className="icon"/> Usuarios
              </NavLink>
            </li>
            </div>
          )}
          {(globalIsAdmin(userRole)) && (
            <div>
              <li>
                <NavLink to="/meeting">
                  <FaUsers className="icon"/> Reuniones
                </NavLink>
              </li>
            </div>
          )}
            <li>
              <NavLink to="/Inquietudes">
              <FaBookOpen className="icon"/>   Reclamos
              </NavLink>
            </li>
          <li>
            <NavLink to="/asambleas">
              <FaWineGlass className="icon"/> Asambleas
            </NavLink>
          </li>
          {(
            <li>
              <NavLink to="/solicitudes">
                <span className="icon">📋</span> Solicitudes
              </NavLink>
            </li>
          )}
          <li>
          { ((globalIsAdmin(userRole))) && (
            <NavLink to="/Operaciones">
            <FaMoneyBillTransfer className="icon"/> Operacion          
            </NavLink>
            )
          }
          </li>
          <li>
            <NavLink to="/profile">
              <CgProfile className="icon"/> Perfil
            </NavLink>
          </li>
          <li style={{ height: "70%" }}/>
          <li className="logout">
            <NavLink to="/login" onClick={logoutSubmit}>
              <FaSignOutAlt className="icon"/> Cerrar Sesión
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;