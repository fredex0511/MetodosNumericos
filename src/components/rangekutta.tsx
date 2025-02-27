import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { parse } from "mathjs"; // Importamos math.js
Chart.register(...registerables);

const RungeKuttaComponent: React.FC = () => {
  const [results, setResults] = useState<{ x: number; y: number }[]>([]);
  const [func, setFunc] = useState<string>("x + y"); // Función por defecto
  const [x0, setX0] = useState<number>(0); // Valor inicial de x
  const [y0, setY0] = useState<number>(1); // Valor inicial de y
  const [h, setH] = useState<number>(0.1); // Tamaño del paso
  const [n, setN] = useState<number>(10); // Número de pasos

  const calculate = () => {
    try {
      const f = parse(func); // Parsear la función ingresada
      const compiledFunc = f.compile(); // Compilar la función para evaluarla

      const rungeKutta4 = (
        f: any,
        x0: number,
        y0: number,
        h: number,
        n: number
      ): { x: number; y: number }[] => {
        const results: { x: number; y: number }[] = [{ x: x0, y: y0 }];
        let x = x0;
        let y = y0;

        for (let i = 0; i < n; i++) {
          const k1 = h * f.evaluate({ x, y });
          const k2 = h * f.evaluate({ x: x + h / 2, y: y + k1 / 2 });
          const k3 = h * f.evaluate({ x: x + h / 2, y: y + k2 / 2 });
          const k4 = h * f.evaluate({ x: x + h, y: y + k3 });
          y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
          x += h;
          results.push({ x, y });
        }

        return results;
      };

      const data = rungeKutta4(compiledFunc, x0, y0, h, n);
      setResults(data);
    } catch (error) {
      alert("Error al evaluar la función. Asegúrate de que sea válida.");
    }
  };

  const chartData = {
    labels: results.map((r) => r.x.toFixed(2)),
    datasets: [
      {
        label: "Runge-Kutta 4",
        data: results.map((r) => r.y),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1>Método de Runge-Kutta 4</h1>
      <div>
        <label>Función f(x, y): </label>
        <input
          type="text"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          placeholder="x + y"
        />
      </div>
      <div>
        <label>Valor inicial x0: </label>
        <input
          type="number"
          value={x0}
          onChange={(e) => setX0(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Valor inicial y0: </label>
        <input
          type="number"
          value={y0}
          onChange={(e) => setY0(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Tamaño del paso h: </label>
        <input
          type="number"
          value={h}
          onChange={(e) => setH(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Número de pasos n: </label>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
        />
      </div>
      <button onClick={calculate}>Calcular</button>
      <Line data={chartData} />
    </div>
  );
};

export default RungeKuttaComponent;