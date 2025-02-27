import React, { useState } from "react";
import { parse, derivative } from "mathjs";

const NewtonRaphsonComponent: React.FC = () => {
  const [results, setResults] = useState<{ iteration: number; x: number; error: number }[]>([]);
  const [func, setFunc] = useState<string>("x^2 - 2"); // Ecuación por defecto
  const [x0, setX0] = useState<number>(1); // Valor inicial de x
  const [tol, setTol] = useState<number>(1e-6); // Tolerancia

  const calculate = () => {
    try {
      // Parsear la función ingresada
      const f = parse(func);

      const df = derivative(f, "x");

      const compiledFunc = f.compile();
      const compiledDfunc = df.compile();

      const newtonRaphson = (
        f: any,
        df: any,
        x0: number,
        tol: number
      ): { iteration: number; x: number; error: number }[] => {
        const results: { iteration: number; x: number; error: number }[] = [];
        let x = x0;
        let error = Infinity;
        let iteration = 0;

        while (error > tol && iteration < 100) {
          const fx = f.evaluate({ x });
          const dfx = df.evaluate({ x });

          if (Math.abs(dfx) < 1e-10) {
            alert("La derivada es casi cero. No se puede continuar.");
            break;
          }

          const xNew = x - fx / dfx; 
          error = Math.abs(xNew - x); 
          x = xNew;
          iteration++;

          results.push({ iteration, x, error });
        }

        return results;
      };

      const data = newtonRaphson(compiledFunc, compiledDfunc, x0, tol);
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
      <button onClick={calculate}>Calcular</button>

      <table>
        <thead>
          <tr>
            <th>Iteración</th>
            <th>x</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.iteration}>
              <td>{r.iteration}</td>
              <td>{r.x.toFixed(6)}</td>
              <td>{r.error.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewtonRaphsonComponent;