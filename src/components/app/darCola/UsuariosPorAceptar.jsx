import React from "react";
import axios from "../../../api/axios";
import { Table } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import  Axios  from "axios";

function UsuariosPorAceptar({ usuarios, orden_ruta_id,conductor }) {
  console.log(usuarios);
  const check = <FontAwesomeIcon icon={faCheck} />;
  const eliminar = <FontAwesomeIcon icon={faTrash} />;
  const { enqueueSnackbar } = useSnackbar();
  
  const aceptar = (user) => {
    // const enviar = { 
    //   "messaging_product": "whatsapp",
    //    "recipient_type": "individual",
    //    "to": user.telefono,
    //    "type": "template",
    //    "template": {
    //      "name": "alerta_ucab",
    //      "language": {
    //        "code": "es"
    //      },
    //      "components": [
    //          {
    //            "type": "body",
    //            "parameters": [
    //              {
    //                "type": "text",
    //                "text": user.name
    //              },
    //              {
    //                "type": "text",
    //                "text": conductor.name
    //              },
    //            ]
    //          },
    //        ]
    //    }
    // }
    // Axios.post(
    //   "https://graph.facebook.com/v15.0/113153664990755/messages",enviar,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.REACT_APP_WHATSAPP_CLOUD}`,
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );
    console.log(user,orden_ruta_id)
    axios
      .post(
        "https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/agregar_usuario_orden",
        { user: user, route_order_id: orden_ruta_id }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      )
      .then((response) => {
        if (response?.data.error)
          enqueueSnackbar(response?.data.error, { variant: "error" });
        else
          enqueueSnackbar("usuario agregado con exito", { variant: "success" });
      }).catch((error) => {
          console.log(error)
      });

  };

  const rechazar = (user) => {
    axios
      .post(
        "https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/rechazar_usuario_orden",
        { user: user,orden_ruta_id: orden_ruta_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.error)
          enqueueSnackbar(response.data.error, { variant: "error" });
        else
          enqueueSnackbar("usuario rechazado con exito", { variant: "success" });
      });
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-5 px-6 w-full flex flex-col items-center overflow-hidden">
          <div className="text-left vh-100 w-full pb-5">
            {usuarios && (
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
                    {usuarios.map((row) => (
                      <TableRow
                        key={row.user_recibe_id._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.user_recibe_id.name}
                        </TableCell>
                        <TableCell align="left">{row.user_recibe_id.email}</TableCell>
                        <TableCell align="right">
                          <div className="flex ">
                            <button
                              onClick={() => {
                                aceptar(row.user_recibe_id);
                              }}
                              className="p-2 bg-green-600 font-bold text-white rounded-lg shadow"
                            >
                              {check}
                            </button>
                            <button
                              onClick={() => {
                                rechazar(row.user_recibe_id);
                              }}
                              className="p-2 ml-1 bg-red-600 font-bold text-white rounded-lg shadow"
                            >
                              {eliminar}
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UsuariosPorAceptar;
