import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

function InformacionCola({ detalles_orden,setPiloto }) {
  const [conductor, setConductor] = useState(null);

  console.log(detalles_orden)

  useEffect(() => {
    function obtener_conductor() {
      axios
        .get(`https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/obtener_conductor/${detalles_orden.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })
        .then((response) => {
          setConductor(response.data);
          setPiloto(response.data)
        });
    }
    obtener_conductor();
  }, []);
  return (
    <div className="bg-slate-100 p-3 rounded-lg shadow">
      <div className="text-left vh-100 w-full">
        <h1 className=" text-ellipsis font-serif font-semibold">
          Informacion del Conductor
        </h1>
        <p>
          <small className="font-bold">Nombre:</small>{" "}
          {conductor === null ? "Cargando..." : conductor.name}
        </p>
        <p>
          <small className="font-bold">Correo:</small>{" "}
          {conductor === null ? "Cargando..." : conductor.email}
        </p>
        <p>
          <small className="font-bold">Teléfono:</small>{" "}
          {conductor === null ? "Cargando..." : conductor.phoneNumber}
        </p>
        <h1 className="pt-3 text-ellipsis font-serif font-semibold">
          Informacion del Vehiculo
        </h1>
        <p>
          <small className="font-bold">Marca:</small>{" "}
          {detalles_orden.vehicle === null
            ? "cargando"
            : detalles_orden.vehicle.marca}
        </p>
        <p>
          <small className="font-bold">Color:</small>{" "}
          {detalles_orden.vehicle === null ||
          detalles_orden.vehicle.color === null
            ? "cargando"
            : detalles_orden.vehicle.color}
        </p>
        <p>
          <small className="font-bold">Placa:</small>{" "}
          {!detalles_orden.vehicle.placa
            ? "El conductor prefiere mantenerlo en privado"
            : detalles_orden.vehicle.placa}
        </p>

        <h1 className="pt-3 text-ellipsis font-serif font-semibold">
          Informacion de la Cola
        </h1>
        <p>
          <small className="font-bold">Me dejaran a: </small>{" "}
          {detalles_orden.distancia} metros
        </p>
        <p>
          <small className="font-bold">hora de salida:</small>{" "}
          {detalles_orden.hour
            ? detalles_orden.hour
            : "Sin hora programada"}
        </p>
        <p className="text-center font-bold text-green-700">
          Puedes continuar la pagina para ver el lugar donde te dejara el
          conductor
        </p>
      </div>
    </div>
  );
}

export default InformacionCola;
