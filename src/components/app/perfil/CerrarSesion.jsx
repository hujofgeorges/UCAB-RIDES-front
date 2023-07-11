import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import salir from '../../../images/exit.png';

function CerrarSesion() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function cerrar_sesion() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    enqueueSnackbar("Ha cerrado sesion con exito", { variant: "success" });

    navigate("/login");
  }
  return (
    <>
      <div
       className="cursor-pointer w-full border-gray-100 text-gray-50 hover:text-gray-600 pl-8 pr-3  block hover:bg-gray-100 transition duration-150 font-inter"
       onClick={cerrar_sesion}
      >
        <img
          src={salir}
          alt=""
          className="h-8 inline-block mr-2"
        />
         Cerrar Sesión
      </div>
    </>
  );
}

export default CerrarSesion;
