import React from "react";
import { NavLink } from "react-router-dom";
import Psidebar from "../../components/app/Psidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

function Rol() {

  const { enqueueSnackbar } = useSnackbar();

  const rol = localStorage.getItem("ucabrides_rol");
  const orden = localStorage.getItem("ucabrides_orden_ruta_id");

  console.log(rol);
  console.log(orden);

  const setConductor = (event) => {
    if (rol === "pasajero" && orden !== null) {
      event.preventDefault();
      console.log("entro conductor");
      enqueueSnackbar("No puedes cambiar de rol mientras estés dentro de un viaje", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    else {
      localStorage.setItem("ucabrides_rol", "conductor");  
    }
  }

  const setPasajero = (event) => {
    if (rol === "conductor" && orden !== null) {
      event.preventDefault();
      console.log("entro pasajero");
      enqueueSnackbar("No puedes cambiar de rol mientras tengas una ruta activa", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    else {
      localStorage.setItem("ucabrides_rol", "pasajero"); 
    }
  }

  const loadActiveRouteAsPassenger = async () => {
    try {
      const ordenPasajero = await axios.get(
        `https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/obtener_orden_activa`, {headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }}
      );
      if (ordenPasajero.data !== null) {
        localStorage.setItem("ucabrides_orden_ruta_id", ordenPasajero.data._id);
        localStorage.setItem("ucabrides_rol", "pasajero");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadActiveRouteAsDriver = async () => {
    try {
      const ordenConductor = await axios.get(
        `https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/ordenes_rutas`, {headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }}
      );
      if (ordenConductor.data !== null) {
        localStorage.setItem("ucabrides_rol", "conductor");
        localStorage.setItem("ucabrides_orden_ruta_id", ordenConductor.data._id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadActiveRouteAsDriver();
    loadActiveRouteAsPassenger();
  }, []);

  return (
    <>
      <div className="flex h-screen justify-center items-center  rounded-lg">
        <div className="w-96 px-3">
          <NavLink to="/listado/rutas" onClick={setConductor}>
            <div className="content-center items-center bg-sky-500 hover:bg-sky-600 border-collapse border-gray-400   lg:border-gray-400 rounded-lg  p-4 leading-normal">
              <div className="">
                <div className="text-white font-bold  text-3xl mb-2 text-center ">
                  DAR COLA
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/listado/colas" onClick={setPasajero}>
            <div className="content-center mt-4 bg-slate-500 border-collapse hover:bg-slate-600 border-gray-400   lg:border-gray-400 rounded-lg  p-4 leading-normal">
              <div className="justify-center">
                <div className="text-white font-bold  text-3xl mb-2 text-center ">
                  RECIBIR COLA
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <Psidebar/>
    </>
  );
}

export default Rol;
