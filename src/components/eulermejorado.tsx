import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { parse } from "mathjs";
Chart.register(...registerables);

const EulerMejoradoComponent: React.FC = () => {
  const [results, setResults] = useState<{ x: number; y: number; yReal: number; error: number }[]>([]);
  const [func, setFunc] = useState<string>("x + y"); // Función por defecto
  const [x0, setX0] = useState<number>(0); // Valor inicial de x
  const [y0, setY0] = useState<number>(1); // Valor inicial de y
  const [h, setH] = useState<number>(0.1); // Tamaño del paso
  const [n, setN] = useState<number>(10); // Número de pasos

  // Función para calcular el valor real de y (solución exacta)
  const exactSolution = (x: number): number => {
    // Solución exacta de la ecuación diferencial dy/dx = x + y con y(0) = 1
    return 2 * Math.exp(x) - x - 1;
  };

  const calculate = () => {
    try {
      const f = parse(func); // Parsear la función ingresada
      const compiledFunc = f.compile(); // Compilar la función para evaluarla

      const eulerMejorado = (
        f: any,
        x0: number,
        y0: number,
        h: number,
        n: number
      ): { x: number; y: number; yReal: number; error: number }[] => {
        const results: { x: number; y: number; yReal: number; error: number }[] = [];
        let x = x0;
        let y = y0;

        for (let i = 0; i < n; i++) {
          const yPred = y + h * f.evaluate({ x, y }); // Predictor
          y = y + (h / 2) * (f.evaluate({ x, y }) + f.evaluate({ x: x + h, y: yPred })); // Corrector
          x += h;

          // Calcular el valor real de y y el error absoluto
          const yReal = exactSolution(x);
          const error = Math.abs(yReal - y);

          results.push({ x, y, yReal, error });
        }

        return results;
      };

      const data = eulerMejorado(compiledFunc, x0, y0, h, n);
      setResults(data);
    } catch (error) {
      alert("Error al evaluar la función. Asegúrate de que sea válida.");
    }
  };

  const chartData = {
    labels: results.map((r) => r.x.toFixed(2)),
    datasets: [
      {
        label: "Euler Mejorado",
        data: results.map((r) => r.y),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Valor Real",
        data: results.map((r) => r.yReal),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1>Método de Euler Mejorado</h1>
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

      {/* Gráfico */}
      <h2>Gráfico</h2>
      <Line data={chartData} />

      {/* Tabla de historial */}
      <h2>Historial de resultados</h2>
      <table>
        <thead>
          <tr>
            <th>Paso</th>
            <th>x</th>
            <th>y (Aproximado)</th>
            <th>y (Real)</th>
            <th>Error Absoluto</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{result.x.toFixed(6)}</td>
              <td>{result.y.toFixed(6)}</td>
              <td>{result.yReal.toFixed(6)}</td>
              <td>{result.error.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EulerMejoradoComponent;