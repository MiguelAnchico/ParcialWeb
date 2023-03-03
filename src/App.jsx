import { useState } from "react";
import "./App.css";

const loteriasJson = [
  {
    id: 1,
    nombre: "Barranquilla",
  },
  {
    id: 2,
    nombre: "Boyaca",
  },
  {
    id: 3,
    nombre: "Cali",
  },
  {
    id: 4,
    nombre: "Jamundi",
  },
  {
    id: 5,
    nombre: "Cartagena",
  },
  {
    id: 6,
    nombre: "Medellin",
  },
  {
    id: 7,
    nombre: "Lima",
  },
];

function App() {
  const [loterias, setLoterias] = useState([]);
  const [loteria, setLoteria] = useState("");
  const [numero, setNumero] = useState("");
  const [precio, setPrecio] = useState("");
  const [visible, setVisible] = useState(false);

  const [errorNumero, setErrorNumero] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorLoteria, setErrorLoteria] = useState("");

  const onSubmit = (e) => {
    console.log(loteria);
    let error = false;
    e.preventDefault();

    if (!loteria) {
      error = true;
      setErrorLoteria("La loteria es obligatoria");
    } else {
      setErrorLoteria("");
    }

    if (!numero) {
      error = true;
      setErrorNumero("El numero es obligatorio");
    } else {
      setErrorNumero("");
    }

    if (!precio) {
      error = true;
      setErrorPrecio("El precio es obligatorio");
    } else {
      setErrorPrecio("");
    }

    if (error) return;

    if (validateNumero(numero))
      return setErrorNumero(
        "El numero debe de tener minimo 3 caracteres, y maximo 4 caracteres"
      );

    let newLoteria = {
      loteria,
      numero,
      precio,
    };

    setLoterias([...loterias, newLoteria]);
    setNumero("");
    setPrecio("");
    setErrorNumero("");
    setErrorPrecio("");
  };

  const validateNumero = (numero) => {
    if (numero.length >= 3 && numero.length <= 4) return false;
    return true;
  };

  const calcularTotal = () => {
    let precioTotal = 0;

    loterias?.map((loteria) => {
      precioTotal += parseFloat(loteria.precio);
    });

    return precioTotal;
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit} className="form-control p-2">
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => setLoteria(e.target.value)}
            id=""
          >
            <option disabled hidden selected value="Seleccione una loteria">
              Seleccione una loteria
            </option>
            {loteriasJson?.map((loteria, index) => (
              <option>{loteria.nombre}</option>
            ))}
          </select>
          <span>{errorLoteria}</span>
        </div>
        <div className="mb-3">
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            type="text"
            placeholder="Numero"
            className="form-control"
          />
          <span>{errorNumero}</span>
        </div>
        <div className="mb-3">
          <input
            value={precio}
            className="form-control"
            onChange={(e) => setPrecio(e.target.value)}
            type="number"
            placeholder="Precio"
          />
          <span>{errorPrecio}</span>
        </div>

        <button className="btn btn-primary btn-lg">Agregar</button>
      </form>

      {visible ? (
        <div className="Factura">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Loteria</th>
                <th scope="col">Numero</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {loterias?.map((loteria) => (
                <tr>
                  <th scope="row">{loteria.loteria}</th>
                  <td>{loteria.numero}</td>
                  <td>{loteria.precio}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr>
                <td colSpan="2"></td>
                <td>{calcularTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}

      <button
        className="btn btn-info btn-lg"
        onClick={(e) => setVisible(!visible)}
      >
        Imprimir
      </button>
    </div>
  );
}

export default App;
