import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "200px", height: "100vh", background: "#282c34", color: "white", padding: "20px" }}>
      <h2>Métodos Numéricos</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/euler-mejorado" style={{ color: "white", textDecoration: "none" }}>Euler Mejorado</Link></li>
        <li><Link to="/runge-kutta" style={{ color: "white", textDecoration: "none" }}>Runge-Kutta</Link></li>
        <li><Link to="/newton-raphson" style={{ color: "white", textDecoration: "none" }}>Newton-Raphson</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
