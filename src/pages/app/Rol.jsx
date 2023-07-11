import React from "react";
import { NavLink } from "react-router-dom";
import Psidebar from "../../components/app/Psidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import conductor from "../../images/conductor.png"
import pasajero from "../../images/pasajero0.png"

function Rol() {

  const { enqueueSnackbar } = useSnackbar();

  const rol = localStorage.getItem("ucabrides_rol");
  const orden = localStorage.getItem("ucabrides_orden_ruta_id");

  console.log(rol);
  console.log(orden);

  const setConductor = (event) => {
    // if (rol === "pasajero" && orden !== null) {
    //   event.preventDefault();
    //   console.log("entro conductor");
    //   enqueueSnackbar("No puedes cambiar de rol mientras estés dentro de un viaje", {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
    // else {
    localStorage.setItem("ucabrides_rol", "conductor");
    // }
  }

  const setPasajero = (event) => {
    // if (rol === "conductor" && orden !== null) {
    //   event.preventDefault();
    //   console.log("entro pasajero");
    //   enqueueSnackbar("No puedes cambiar de rol mientras tengas una ruta activa", {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
    // else {
    localStorage.setItem("ucabrides_rol", "pasajero");
    // }
  }

  const loadActiveRouteAsPassenger = async () => {
    try {
      const ordenPasajero = await axios.get(
        `https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/obtener_orden_activa`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
      }
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
        `https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/ordenes_rutas`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
      }
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
    // loadActiveRouteAsDriver();
    // loadActiveRouteAsPassenger();
  }, []);

  return (
    <>
      <div className="flex h-screen bg-fondo justify-center items-center">
        <div className="flex flex-col gap-4">
          <NavLink to="/listado/rutas" onClick={setConductor}>
            <div className="text-black font-inter  text-3xl mb-2 text-center">
              <span className="block mt-2 mb-3">Conductor</span>
              <img src={conductor} alt="Icono Conductor" className="border-2 border-customGreen mx-auto w-20 rounded-md mb-2" /> {/* Reemplaza "/ruta-conductor.png" con la ruta de tu imagen para conductor */}
            </div>
          </NavLink>
          <NavLink to="/perfilN" onClick={setPasajero}>
            <div className="text-black font-inter text-3xl mb-2 text-center">
              <span className="block mt-2 mb-3">Pasajero</span>
              <img src={pasajero} alt="Icono Pasajero" className="mx-auto border-2 border-azul w-20 rounded-md mb-2" /> {/* Reemplaza "/ruta-pasajero.png" con la ruta de tu imagen para pasajero */}
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Rol;
