import React, { useEffect } from "react";
import axios from "../../../api/axios.js";
import { Table } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import {  faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";

function DetallesDarCola({ detalles, usuarios }) {
  const eliminar = <FontAwesomeIcon icon={faTrash} />;
  const { enqueueSnackbar } = useSnackbar();
  const [confirmUsers, setConfirmUsers] = useState([]);

  const sacar = (user) => {
    axios.post("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/cancelar_cola_usuario", {route_order_id:detalles._id,user_id:user._id}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }
  );
    enqueueSnackbar("usuario sacado de la cola exito", { variant: "success" });    
  };

  useEffect(() => {
    function obtener_usuarios_confirmados() {
      axios
        .post("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/obtener_usuarios_confirmados", { idUsers: usuarios}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })
        .then((response) => {
          setConfirmUsers(response.data);
        });
    }
    obtener_usuarios_confirmados();
  }, []);

  // useEffect(() => {
  //   console.log()
  // }, [confirmUsers]);

  return (
    <>
      <div className="w-full">
        <div className="mt-5 px-6 w-full flex flex-col items-center overflow-hidden">
          <div className="text-left vh-100 w-full pb-5">
            <h1 className=" font-medium text-gray-900 text-left">
              Informacion del Vehiculo
            </h1>
            <p>
              <small className="font-bold">Marca:</small>{" "}
              {detalles.vehicle_id.marca}
            </p>
            <p>
              <small className="font-bold">Color:</small>{" "}
              {detalles.vehicle_id.color}
            </p>
            <p>
              <small className="font-bold">Placa:</small>{" "}
              {!detalles.vehicle_id.placa
                ? "El conductor prefiere mantenerlo en privado"
                : detalles.vehicle_id.placa}
            </p>
            <p>
              <small className="font-bold">Asientos:</small> {detalles.seats}
            </p>
            <h1 className="pt-3 font-medium text-gray-900 text-left">
              Informacion de la Cola
            </h1>
            <p>
              <small className="font-bold">Nombre de la ruta:</small>{" "}
              {detalles.route_id.name ? detalles.route_id.name : "Sin hora programada"}
            </p>
            <p>
              <small className="font-bold">hora de salida:</small>{" "}
              {detalles.hour ? detalles.hour : "Sin hora programada"}
            </p>
            <div className="flex">
              <h1 className="pt-3 font-medium text-gray-900 text-left">
                Usuarios para dar cola:
              </h1>
              <p className="pt-3 ml-2 text-green-500 font-bold">
                {detalles.users.length}
              </p>
            </div>
            <div className="shadow rounded-lg mt-3 ">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="font-semibold">
                      <TableCell align="left">Nombre</TableCell>
                      <TableCell align="left">correo</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {confirmUsers.length > 0 ? (
                      confirmUsers.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="right">
                            <button
                              onClick={() => {
                                sacar(row);
                              }}
                              className="p-2 ml-1 bg-red-600 font-bold text-white rounded-lg shadow"
                            >
                              {eliminar}
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No hay usuarios confirmados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetallesDarCola;
