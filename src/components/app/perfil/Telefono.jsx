import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import axios from "../../../api/axios";
import icono from "../../../images/icono_perfil.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import phone from '../../../images/phone-call.png'

function Telefono() {
  const [open, setOpen] = useState(false);
  const [numero, setNumero] = useState(null);
  const [telefono, setTelefono] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const modificar_telefono = (e) => {
    e.preventDefault();
    if (!telefono)
      enqueueSnackbar("No puede dejar el campo vacio", { variant: "error" });
    else {
      setOpen(false);
      setTelefono(telefono.trim());
      setTelefono(telefono.replace("+", ""));
      try {
        axios.post(`https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/telefono`, { phoneNumber: telefono }, {headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }});
        enqueueSnackbar("Telefono modificado con exito", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Error de conexion", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    axios.get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/telefono", {headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}).then((response) => {
      setNumero(response.data);
      console.log(response.data)
    });
  }, [telefono]);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="w-full text-gray-50 hover:text-gray-600 pl-7 pr-3 hover:bg-gray-100 transition duration-150"
      >
        <img
          src={phone}
          alt=""
          className="h-8 inline-block mr-2"
        />
        Mi teléfono
      </div>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-2xl text-teal-900 font-bold text-center">
              Su numero actual es: {numero ? numero : "SIN NUMERO"}
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={modificar_telefono}>
              <label>Escriba tu numero telefono *</label>
              <PhoneInput
                placeholder="INGRESA EL NUMERO DE TELEFONO"
                onChange={setTelefono}
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <div className="flex justify-center mt-4">
                <button
                  className="mx-2 bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  type="submit"
                >
                  Agregar
                </button>
                <div
                  className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={handleClose}
                >
                  Cerrar
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Telefono;
