import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import logo from "../../../images/fondo_logos.png";
import Dsidebar from "../../../components/app/Dsidebar";
import { Flex } from "@chakra-ui/react";
import axios from "../../../api/axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete from "../../../utils/PlacesAutocomplete";
import { NavLink, useNavigate } from "react-router-dom";
import { SeleccionarRuta } from "./PersonalizarRuta";
import { useParams } from "react-router-dom";
const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;

export default function PersonalizarRuta({ props }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD7v8N1XTXpHinGn0ka8CO0l61UWh1fesA',
    libraries: ["places"],
  });

  const { origenLat, origenLng, destinoLat, destinoLng } = useParams();

  return isLoaded ? (
    <Map origenLat={origenLat} origenLng={origenLng} destinoLat={destinoLat} destinoLng={destinoLng}/>
  ) : (
    <div className="flex h-screen justify-center items-center  rounded-lg">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

function Map({ origenLat, origenLng, destinoLat, destinoLng }) {
  const [origeno, setOrigen] = useState(null);
  const [destinop, setDestino] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [map, setMap] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const google = window.google;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [waypoints, setWaypoints] = useState([]);
  const [guardar, setGuardar] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const origen = {
    lat: parseFloat(origenLat),
    lng: parseFloat(origenLng),
  };

  const destino = {
    lat: parseFloat(destinoLat),
    lng: parseFloat(destinoLng),
  };

  const handleClose = () => {
    setOpen(false);
  };

  let markers = [];
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const handlecrear = async () => {
    if(nombre){
      axios.post("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/crear_ruta", {
        name: nombre,
        origen: {lat: origen.lat, lng: origen.lng},
        destino: {lat: destino.lat, lng: destino.lng},
        waypoints: waypoints,
      },{headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }});
      enqueueSnackbar("Ruta creada exitosamente 😊 ", {
        variant: "success",
      });
      setOpen(false);
      navigate('../../listado/rutas');
    }else{
      enqueueSnackbar("No puede dejar el campo vacio ", {
        variant: "error",
      });
    }
  };

  function obtener_mi_ubicacion() {
    navigator.geolocation.getCurrentPosition(function (position) {
      map.panTo(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
      );
    });
  }

  const calcular_ruta = async () => {

  // Obtener las coordenadas de los marcadores
      const waypoints = markers.map((marker) => ({
        location: marker.getPosition(),
        stopover: true,
      }));

      // Solicitar las direcciones
      directionsService.route(
        {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: waypoints.slice(1, waypoints.length - 1),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Error al calcular la ruta.");
          }
        }
      );

      setWaypoints(waypoints);
  };

  const createMarker = (latLng) => {
    const marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
    });

    //remove marker and marker description when double click
    marker.addListener("dblclick", () => {
        marker.setMap(null);
        markers = markers.filter((m) => m !== marker);
        calcular_ruta();
    });
      
    return marker;
  }

  const createMarkerDestiny = (latLng) => {
    const marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
    });

    //add marker and calculate route when click
    marker.addListener("click", () => {
        addMarker(latLng);
        calcular_ruta();
        setGuardar(true);
    });

    return marker;
  }

  const addMarker = (latLng) => {
    if (markers.length === 0) {
      markers.push(createMarker(
        new google.maps.LatLng(origen.lat, origen.lng)
      ));
    }
    markers.push(createMarker(latLng));
  }

  const handleGuardar = () => {
    if (!guardar) {
      enqueueSnackbar("Debe terminar de marcar la ruta hasta el destino para guardarla", {
        variant: "error",
        autoHideDuration: 3000
      });
    }
    else{
      setOpen(true);
    }
  };

  useEffect(() => {
    if (map && destino) {
      directionsRenderer.setMap(map);
      map.addListener("click", (event) => {
          addMarker(event.latLng);
          calcular_ruta();
      });
      createMarkerDestiny(new google.maps.LatLng(destino.lat, destino.lng));
    }
  }, [map]);

  useEffect(() => {
    function panto() {
      if (ubicacion !== null) {
        map.panTo(new google.maps.LatLng(ubicacion.lat(), ubicacion.lng()));
      }
    }
    panto();
  }, [ubicacion]);

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <GoogleMap
          onLoad={(map) => setMap(map)}
          mapContainerStyle={containerStyle}
          center={origen}
          zoom={17}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {origen && (
            <Marker
              position={origen}
            />
          )}

          {/* {direccion && <DirectionsRenderer directions={direccion} />} */}
        </GoogleMap>
      </Flex>
      {destino && (
        <div className="fixed bottom-20 z-30 rounded-lg mx-auto">
          <div className="content-center   justify-between">
            <div className="m-3 rounded-lg bg-gradient-to-l  vh-100 flex flex-col md:flex-col sm:flex-col pt-3 md:py-3  px-2 text-center ">
              <button
                  className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
                  onClick={handleGuardar}
                >
                  Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={obtener_mi_ubicacion}
        className="z-20  xl:w-96 mx-auto absolute right-2 bottom-20 mr-9  sm:justify-center flex"
        style={{ transform: "traslateX(-50%)", margin: "auto" }}
      >
        <div className="justify-center text-center mt-20">
          <div
            style={{ cursor: "pointer" }}
            className="  bg-white rounded-lg p-2"
          >
            {location}
          </div>
        </div>
      </div>
      {open && (
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-2xl text-teal-900 font-bold text-center">
              Crear Ruta
            </div>
          </DialogTitle>
          <DialogContent>
            <label>¿Con que nombre quiere guardar la ruta? *</label>
            <input
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              className="pt-2 mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Ingresar nombre de la ruta"
            />

            <div className="flex justify-center">
              <div
                className="mr-2 bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                onClick={handlecrear}
              >
                Crear
              </div>
              <div
                className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                onClick={handleClose}
              >
                Cerrar
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* <Dsidebar /> */}
    </>
  );
}
