import "./styles/table.css";
import { Link } from "react-router-dom";

export const Table = () => {

  const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const tableGrid = datos.map((num) => (
    <div className="row" key={num}>
      <div className="column">Fila: {num}</div>
    </div>
  ));

  return (
    <div className="tableContainer">
      <span className="reLoginPage">
        <Link className="linkReLoginPage" to="/">
          Regresar
        </Link>
      </span>

      <div className="textContainer">
        <label>
          La siguiente tabla muestra las filas pares en color amarillo y las
          impares en color verde
        </label>
      </div>

      <div className="gridContainer">
        <div className="text">Tabla Bicolor</div>
        {tableGrid.map((item, index) => (
          <div className="number" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
