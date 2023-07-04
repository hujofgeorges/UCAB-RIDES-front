import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import  Axios  from "axios";
import { Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DistanciaMasCorta } from "../../../hooks/RutaMasCorta";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DetallesCola from "./DetallesCola";
import AlertaSinColas from "./AlertaSinColas";
import { useLoadScript } from "@react-google-maps/api";
import logo from "../../../images/fondo_logos.png";
import { placesTypes } from "../../../placesTypes";

export default function ListaRecibirCola({ rutas, localizacion_usuario, distancia,user, direccion_usuario}) {
  const { isLoaded } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyD7v8N1XTXpHinGn0ka8CO0l61UWh1fesA',
    libraries: ["places", "geometry"],
  });

  console.log(rutas)

  return isLoaded ? (
    <Component rutas={rutas} localizacion_usuario={localizacion_usuario} distancia={distancia} user={user} direccion_usuario={direccion_usuario}/>
  ) : (
    <div className="flex h-screen justify-center items-center  rounded-lg">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

function Component({ rutas, localizacion_usuario, distancia,user,direccion_usuario}) {
  const usuario=(JSON.parse(user))
  const [rutas_disponibles, setRutas_disponibles] = useState([]);
  const [detalles_orden, setDetalles_orden] = useState({});
  const [bandera, setBandera] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [desactivar, setDesactivar] = React.useState(true);
  const [piloto, setPiloto] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar()
  const [mensaje, setMensaje] = useState("");
  const [tipoViaje, setTipoViaje] = useState("");

  console.log(rutas);
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const ucabCoords = [
    { lat: 8.298917, lng: -62.713184 },
    { lat: 8.299107, lng: -62.709317 },
    { lat: 8.296511, lng: -62.709897 },
    { lat: 8.295599, lng: -62.710575 },
    { lat: 8.294478, lng: -62.71326 },
  ];

  const ucabArea = new window.google.maps.Polygon({
    paths: ucabCoords,
    strokeOpacity: 0,
    fillColor: '#FF0000',
    strokeColor: '#FF0000',
    fillOpacity: 0,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinuar = () => {
    setDesactivar(false)
    // const enviar = { 
    //   "messaging_product": "whatsapp",
    //    "recipient_type": "individual",
    //    "to": piloto.telefono,
    //    "type": "template",
    //    "template": {
    //      "name": "alerta_conductor",
    //      "language": {
    //        "code": "es"
    //      },
    //      "components": [
    //          {
    //            "type": "body",
    //            "parameters": [
    //              {
    //                "type": "text",
    //                "text": piloto.name
    //              },
    //              {
    //                "type": "text",
    //                "text": usuario.name
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
    
    axios
      .put(`https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/cambiar_estatus_usuario_activo/${detalles_orden.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("ucabrides_orden_ruta_id", detalles_orden.id);
        var puntocercano = {
          distancia: detalles_orden.puntomascerca[0],
          lat: detalles_orden.puntomascerca[1],
          lng: detalles_orden.puntomascerca[2],
        };
        axios.post("http://127.0.0.1:8000/api/puntomascerca", {
          puntocercano: puntocercano,
          user_id: user._id,
        });

        localStorage.setItem(
          "ucabrides_puntomascerca",
          JSON.stringify(puntocercano)
        );


        setOpen(false);
        setBandera(true);
        enqueueSnackbar("Peticion de cola enviada al conductor 😊", {
          variant: "success",
        });
      });

  };

  const verificar_distancia = async (ruta) => {
    if (window.google && window.google.maps) {  
      const google = window.google;
  
      const directionsService = new google.maps.DirectionsService();
  
      const results = await directionsService.route({
        origin: ruta.origin,
        destination: ruta.destiny,
        waypoints: ruta.waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      const direccion = results.routes[0].overview_path;

      console.log(direccion)
  
      var punto = DistanciaMasCorta(direccion, ruta.point);

      // console.log(ruta.seats, ruta.users, ruta.vehicle, ruta.hour)
      console.log(ruta)
  
      // if (distancia >= punto[0]) {
        const obj = {
          id: ruta.id,
          origin: ruta.origin,
          destiny: ruta.destiny,
          distancia: punto[0],
          puntomascerca: punto,
          seats: ruta.seats,
          users: ruta.users,
          vehicle: ruta.vehicle,
          hour: ruta.hour,
        };
  
        setRutas_disponibles((rutas_disponibles) => {
          return [...rutas_disponibles, obj];
        }); //SE AÑADE EL OBJETO FILTRADO A UN NUEVO ARRAY
      // }
    }
  };

  useEffect(() => {
    console.log(rutas)
    function calcularRutas() {
      let rutas_filtradas = []

      if (window.google.maps.geometry.poly.containsLocation(localizacion_usuario, ucabArea)){
        setTipoViaje("UCAB - Casa")
        setMensaje("Podrás ser llevado aproximadamente a X metros de tu destino")
        rutas_filtradas = rutas.filter((ruta) => {
          return window.google.maps.geometry.poly.containsLocation(ruta.route_id.destiny, ucabArea) === false
        })
      }
      else {
        setTipoViaje("Casa - UCAB")
        setMensaje("Estás aproximadamente a X metros de la ruta del Conductor")
        rutas_filtradas = rutas.filter((ruta) => {
          return window.google.maps.geometry.poly.containsLocation(ruta.route_id.destiny, ucabArea) === true
        })
      } 

      rutas_filtradas.map((ruta) => {
        // Mapeo de las rutas filtradas
        return verificar_distancia({
          origin: ruta.route_id.origin,
          destiny: ruta.route_id.destiny,
          waypoints: ruta.route_id.waypoints,
          id: ruta._id,
          seats: ruta.seats,
          users: ruta.users,
          vehicle: ruta.vehicle_id,
          hour: ruta.hour,
          point: tipoViaje === "UCAB - Casa" ? direccion_usuario : localizacion_usuario
        });
      });
    }
    if (window.google && window.google.maps){
      calcularRutas();
    }
  }, [rutas]);

  return (
    <>
      {console.log(rutas_disponibles)}
      {bandera && <Navigate to="/cola/curso" />}
      {rutas_disponibles !== [] && 
      <>
      {rutas_disponibles.length > 0 ?
        <div>
          <h1 className="font-bold text-slate-600 text-xl">
            Bienvenido al listado de Colas Disponibles
          </h1>
          <ul className="mb-6">
            {rutas_disponibles.map((row) => (
              <li
                key={row.id}
                className="rounded-lg bg-slate-200 p-3 font-semibold my-3 cursor-pointer"
                onClick={() => {
                  setDetalles_orden(row);
                  setOpen(true);
                }}
              >
                {mensaje.replace("X", row.distancia)}
                {row.seats} asientos disponibles
                {/* <ul>
                  {row.places.map((place) => (
                    <li key={place.id}>{place.name}</li>
                  ))}
                </ul> */}
              </li>
            ))}

           {open &&
             <Dialog
              fullWidth={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            > 
              <DialogTitle id="alert-dialog-title">
                <div className="text-2xl text-teal-900 font-bold text-center">
                  Detalles de la Cola
                </div>
              </DialogTitle>
              <DialogContent>
                {/* LLAMAMOS AL MODAL CON EL MAPA */}
                <DetallesCola
                  detalles_orden={detalles_orden}
                  localizacion_usuario={localizacion_usuario}
                  setPiloto={setPiloto}
                />
              </DialogContent>
              <DialogActions>
                <div 
                  className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={(()=>{
                    if(piloto && desactivar)
                      handleContinuar()
                  })}
                >
                  Continuar
                </div>
                <div
                  className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={handleClose}
                >
                  Cerrar
                </div>
              </DialogActions>
            </Dialog>}
          </ul>
        </div>
       : <AlertaSinColas user={user} />
      }
      </>
      }
    </>
  );
}
