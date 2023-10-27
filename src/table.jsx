import "./styles/table.css";

export const Table = () => {

  const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const tableNumbers = datos.map((num) => (
    <tr key={num}>
        <td>Fila: {num}</td>
    </tr>
  ));

  return (
    <div className="tableContainer">
        <p>Fila impar = Verde</p>
        <p>Fila par = Amarillo</p>
        <table className="table">
            <tbody className="tbody">{tableNumbers}</tbody>
        </table>
    </div>
  );
};
