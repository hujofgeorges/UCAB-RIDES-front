import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import DetallesDarCola from "../../../components/app/darCola/DetallesDarCola";
import Dsidebar from "../../../components/app/Dsidebar";
import UsuariosPorAceptar from "../../../components/app/darCola/UsuariosPorAceptar";
import logo from "../../../images/fondo_logo432x460.png";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { refresh } from "aos";

function ColaAbierta({user}) {
  console.log('ColaAbierta')
  const [isMensaje, setIsMensaje] = useState(true);
  const [detalles, setDetalles] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  user=JSON.parse(user)
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const cancelar_cola=()=>{
    if(usuarios?.length>0)
      enqueueSnackbar("No se puede cancelar, primero elimina los usuario por aceptar 😞", { variant: "error" });

    else if(detalles.users?.length===0){ 
      console.log(detalles._id, detalles.route_id._id)
      axios.post(
        `https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/desactivar`,
        { orden_ruta_id: detalles._id, ruta_id: detalles.route_id._id },
        {headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }}
      );
      localStorage.removeItem("ucabrides_orden_ruta_id");
      navigate("/listado/rutas");
      enqueueSnackbar("cola cancelada con exito", { variant: "success" });
    }else{
      axios.post('https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/modificar_cola_conductor',{orden_ruta_id:detalles._id,flag:'cancelado'},
     )
      localStorage.removeItem("ucabrides_orden_ruta_id");
      navigate("/listado/rutas");
      enqueueSnackbar("ruta desactivada con exito", { variant: "success" });
    }
  }

  const completar_cola=()=>{
    if(detalles.users?.length === 0){ 
      enqueueSnackbar("No puedes completar la cola sin usuarios", { variant: "error" });
    }else{
      axios.post('https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/modificar_cola_conductor',{orden_ruta_id:detalles._id,flag:'completado'},
      ).then((response)=>{
      })
      localStorage.removeItem("ucabrides_orden_ruta_id");
      navigate("/listado/rutas");
      enqueueSnackbar("Cola completada con exito", { variant: "success" });

    }
    
  }

  useEffect(() => {
    function detalles_orden() {
      axios
        .get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/detalles_orden_activa", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })
        .then((response) => {
          setDetalles(response.data.routeOrder);
          axios
            .get(`https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/obtener_usuarios_por_aceptar`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
              }
            })
            .then((respuesta) => {
              setUsuarios(respuesta.data.users);
            });
        });
    }
    detalles_orden();
  }, []);

  return (
    <>
      {detalles && usuarios ? (
        <div className="mx-auto my-12 vh-100 pb-16">
          <div className="bg-gray-50 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
            <div>
              <h1 className="border-blue-800 border-b-2 block pt-5 pb-2 font-bold text-center text-3xl text-gray-900">
                Cola En Curso
              </h1>
              <div className="flex justify-between items-center my-5 px-6">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsMensaje(true)}
                  className={` border-b-2 text-gray-500  hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                    isMensaje ? "border-blue-800 border-b-2" : ""
                  }`}
                >
                  Detalles de Cola
                </div>
                  {console.log(usuarios.length, usuarios, detalles)}
                  {usuarios && usuarios.length > 0 && (
                <div
                  onClick={() => setIsMensaje(false)}
                  style={{ cursor: "pointer" }}
                  className={`flex border-b-2 justify-center text-gray-500  hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                    !isMensaje ? "border-blue-800 border-b-2" : ""
                  }`}
                >
                  Usuarios por aceptar{" "}
                    <div className="text-lg -mt-2 ml-3 font-bold text-red-600">
                      {" "}
                      {usuarios.length}
                    </div>
                </div>
                  )}
                  {console.log(detalles._id)}
              </div>
              {isMensaje ? (
                <DetallesDarCola
                  detalles={detalles}
                  usuarios={detalles.users}
                />
              ) : (
                <UsuariosPorAceptar
                  usuarios={usuarios}
                  orden_ruta_id={detalles._id}
                  conductor={user}
                />
              )}
              <center className="pb-5">
                <button 
                     onClick={(()=>{
                  completar_cola()
                })}
                className="p-2  bg-blue-600 rounded-lg shadow text-white font-semibold flex-1">
                  Completar Cola
                </button>
                <button 
                onClick={(()=>{
                  cancelar_cola()
                })}
                className="p-2 ml-2 bg-red-600 rounded-lg shadow text-white font-semibold flex-1">
                  Cancelar Cola
                </button>
              </center>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-screen justify-center items-center  rounded-lg">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </>
      )}
      <Dsidebar />
    </>
  );
}

export default ColaAbierta;
