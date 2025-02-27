import React, { useState } from "react";
import { parse } from "mathjs"; // Importamos math.js

const NewtonRaphsonComponent: React.FC = () => {
  const [results, setResults] = useState<{ iteration: number; x: number }[]>([]);
  const [func, setFunc] = useState<string>("x^2 - 2"); // Función por defecto
  const [dfunc, setDfunc] = useState<string>("2x"); // Derivada por defecto
  const [x0, setX0] = useState<number>(1); // Valor inicial
  const [tol, setTol] = useState<number>(1e-6); // Tolerancia
  const [maxIter, setMaxIter] = useState<number>(10); // Máximo de iteraciones

  const calculate = () => {
    try {
      const f = parse(func); // Parsear la función ingresada
      const df = parse(dfunc); // Parsear la derivada ingresada
      const compiledFunc = f.compile(); // Compilar la función
      const compiledDfunc = df.compile(); // Compilar la derivada

      const newtonRaphson = (
        f: any,
        df: any,
        x0: number,
        tol: number,
        maxIter: number
      ): { iteration: number; x: number }[] => {
        const results: { iteration: number; x: number }[] = [];
        let x = x0;

        for (let i = 0; i < maxIter; i++) {
          const fx = f.evaluate({ x });
          const dfx = df.evaluate({ x });

          if (Math.abs(fx) < tol) break; // Convergencia

          x = x - fx / dfx;
          results.push({ iteration: i + 1, x });
        }

        return results;
      };

      const data = newtonRaphson(compiledFunc, compiledDfunc, x0, tol, maxIter);
      setResults(data);
    } catch (error) {
      alert("Error al evaluar la función. Asegúrate de que sea válida.");
    }
  };

  return (
    <div>
      <h1>Método de Newton-Raphson</h1>
      <div>
        <label>Función f(x): </label>
        <input
          type="text"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          placeholder="x^2 - 2"
        />
      </div>
      <div>
        <label>Derivada f'(x): </label>
        <input
          type="text"
          value={dfunc}
          onChange={(e) => setDfunc(e.target.value)}
          placeholder="2x"
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
        <label>Tolerancia: </label>
        <input
          type="number"
          value={tol}
          onChange={(e) => setTol(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Máximo de iteraciones: </label>
        <input
          type="number"
          value={maxIter}
          onChange={(e) => setMaxIter(parseInt(e.target.value))}
        />
      </div>
      <button onClick={calculate}>Calcular</button>
      <table>
        <thead>
          <tr>
            <th>Iteración</th>
            <th>x</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.iteration}>
              <td>{r.iteration}</td>
              <td>{r.x.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewtonRaphsonComponent;