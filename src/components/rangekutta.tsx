import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { parse } from "mathjs"; 
Chart.register(...registerables);

const RungeKuttaComponent: React.FC = () => {
  const [results, setResults] = useState<{ x: number; y: number; k1: number; k2: number; k3: number; k4: number }[]>([]);
  const [func, setFunc] = useState<string>("x + y");
  const [x0, setX0] = useState<number>(0);
  const [y0, setY0] = useState<number>(1); 
  const [h, setH] = useState<number>(0.1);
  const [n, setN] = useState<number>(10);

  const calculate = () => {
    try {
      const f = parse(func);
      const compiledFunc = f.compile();

      const rungeKutta4 = (
        f: any,
        x0: number,
        y0: number,
        h: number,
        n: number
      ): { x: number; y: number; k1: number; k2: number; k3: number; k4: number }[] => {
        const results: { x: number; y: number; k1: number; k2: number; k3: number; k4: number }[] = [];
        let x = x0;
        let y = y0;

        for (let i = 0; i < n; i++) {
          const k1 = h * f.evaluate({ x, y });
          const k2 = h * f.evaluate({ x: x + h / 2, y: y + k1 / 2 });
          const k3 = h * f.evaluate({ x: x + h / 2, y: y + k2 / 2 });
          const k4 = h * f.evaluate({ x: x + h, y: y + k3 });
          y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
          x += h;

          results.push({ x, y, k1, k2, k3, k4 });
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

      <h2>Gráfico</h2>
      <Line data={chartData} />

      <h2>Historial de resultados</h2>
      <table>
        <thead>
          <tr>
            <th>Paso</th>
            <th>x</th>
            <th>y</th>
            <th>k1</th>
            <th>k2</th>
            <th>k3</th>
            <th>k4</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.x.toFixed(6)}</td>
              <td>{result.y.toFixed(6)}</td>
              <td>{result.k1.toFixed(6)}</td>
              <td>{result.k2.toFixed(6)}</td>
              <td>{result.k3.toFixed(6)}</td>
              <td>{result.k4.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RungeKuttaComponent;