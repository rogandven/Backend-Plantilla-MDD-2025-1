import { FaHome } from "react-icons/fa";
import "@styles/home.css";

const Home = () => {
  return (
    <div className="home-banner">
      <h1>Home</h1>
      <FaHome className="icon" />
      <div>
        <h2>Bienvenido a la pagina del CEE</h2>
      </div>
      <div>
        <h3>Aqui podras ver las asambleas y crear reclamos por algun problema que hayas tenido en la universidad</h3>
      </div>
    </div>
  );
};

export default Home;
