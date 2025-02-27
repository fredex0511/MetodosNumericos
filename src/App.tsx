import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import EulerMejorado from "./components/eulermejorado";
import RungeKutta from "./components/rangekutta";
import NewtonRaphson from "./components/newtonraphson";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "220px", padding: "20px" }}>
          <Routes>
            <Route path="/euler-mejorado" element={<EulerMejorado />} />
            <Route path="/runge-kutta" element={<RungeKutta />} />
            <Route path="/newton-raphson" element={<NewtonRaphson />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
