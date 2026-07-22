import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {

  const [adc, setAdc] = useState(0);
  const [caudal, setCaudal] = useState(0);
  const [litros, setLitros] = useState(0);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {

    const waterRef = ref(db, "WaterMonitor");

    onValue(waterRef, (snapshot) => {

      const datos = snapshot.val();

      if (datos) {

        setAdc(datos.adc);
        setCaudal(datos.caudal);
        setLitros(datos.litros);

        setHistorial((anterior) => {

          const nuevoDato = {
            tiempo: new Date().toLocaleTimeString(),
            caudal: datos.caudal
          };

          return [...anterior, nuevoDato].slice(-10);

        });

      }

    });

  }, []);

  return (

    <div style={estilos.contenedor}>

      <h1 style={estilos.titulo}>
        💧 WaterMonitor
      </h1>

      <p style={estilos.subtitulo}>
        Sistema de monitoreo inteligente de consumo de agua
      </p>

      <div style={estilos.tarjetas}>

        <div style={estilos.tarjeta}>

          <h2 style={estilos.tituloTarjeta}>
            💦 Caudal
          </h2>

          <p style={estilos.valor}>
            {Number(caudal).toFixed(2)}
          </p>

          <p style={estilos.unidad}>
            Litros / minuto
          </p>

        </div>


        <div style={estilos.tarjeta}>

          <h2 style={estilos.tituloTarjeta}>
            🚰 Consumo
          </h2>

          <p style={estilos.valor}>
            {Number(litros).toFixed(2)}
          </p>

          <p style={estilos.unidad}>
            Litros
          </p>

        </div>


        <div style={estilos.tarjeta}>

          <h2 style={estilos.tituloTarjeta}>
            📡 Sensor
          </h2>

          <p style={estilos.valor}>
            {adc}
          </p>

          <p style={estilos.unidad}>
            ADC
          </p>

        </div>

      </div>


      <div style={estilos.grafica}>

        <h2 style={estilos.tituloGrafica}>
          📈 Caudal en tiempo real
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={historial}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="tiempo" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="caudal"
              stroke="#2196F3"
              strokeWidth={4}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

const estilos = {

  contenedor: {
    minHeight: "100vh",
    background: "#f2f6f8",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center"
  },

  titulo: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#000",
    marginBottom: "5px"
  },

  subtitulo: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "40px"
  },

  tarjetas: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  tarjeta: {
    background: "#ffffff",
    width: "260px",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)"
  },

  tituloTarjeta: {
    fontSize: "26px",
    fontWeight: "900",
    color: "#000",
    marginBottom: "15px"
  },

  valor: {
    fontSize: "50px",
    fontWeight: "900",
    color: "#000",
    margin: "10px 0"
  },

  unidad: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#555"
  },

  grafica: {
    marginTop: "50px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)"
  },

  tituloGrafica: {
    fontSize: "28px",
    fontWeight: "900",
    color: "#000",
    marginBottom: "20px"
  }

};

export default App;