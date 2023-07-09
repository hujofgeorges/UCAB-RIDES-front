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
const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;

const routeColors = ["#FFC107", "#03A9F4", "#4CAF50", "#FF9800", "#9C27B0"];

export default function CrearRuta() {
  const { isLoaded } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyD7v8N1XTXpHinGn0ka8CO0l61UWh1fesA',
    libraries: ["places", "geometry"],
  });

  return isLoaded ? (
    <Map />
  ) : (
    <div className="flex h-screen justify-center items-center  rounded-lg">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

function Map() {
  const [selected, setSelected] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [map, setMap] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const google = window.google;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [dirRenderers, setDirRenderers] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [validRoute, setValidRoute] = useState(true);
  const [waypoints, setWaypoints] = useState([]);
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };
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
  // Construct the polygon.
  const ucabArea = new window.google.maps.Polygon({
    paths: ucabCoords,
    strokeOpacity: 0,
    fillColor: '#FF0000',
    strokeColor: '#FF0000',
    fillOpacity: 0,
  });

  const addDirectionsRenderer = (directionsRenderer) => {
    setDirRenderers((current) => [...current, directionsRenderer]);
  };

  const removeAllDirectionsRenderer = () => {
    dirRenderers.forEach((directionsRenderer) => {
      directionsRenderer.setMap(null);
    });
    setDirRenderers([]);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSaveOption = () => {
    console.log('Opción seleccionada:', selectedOption);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const getWaypoints = () => {
    const overviewPath = dirRenderers[selectedOption].directions.routes[0].overview_path;
    const waypoints = [];

    for (let i = 0; i < overviewPath.length; i += 10) {
      const point = overviewPath[i];
      waypoints.push({
        location: new google.maps.LatLng(point.lat(), point.lng()),
      });
    }

    return waypoints;
  }

  const handlecrear = async () => {
    if(nombre){
      axios.post("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/crear_ruta", {
        name: nombre,
        origen: {lat: origin.lat, lng: origin.lng},
        destino: {lat: selected.lat, lng: selected.lng},
        waypoints: getWaypoints()
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
      setSelected({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      map.panTo(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
      );
    });
  }

  const calcular_ruta = async () => {

    if (!window.google.maps.geometry.poly.containsLocation(origin, ucabArea) &&
        !window.google.maps.geometry.poly.containsLocation(selected, ucabArea)) {
          enqueueSnackbar("La ruta no puede ser calculada, ya que no se encuentra dentro de la UCAB", {
            variant: "error",
          });
          setValidRoute(false);
      return;
    }


    removeAllDirectionsRenderer();
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin,
      destination: ubicacion ? ubicacion : selected,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    },(response, status) => {
      if (status === "OK") {
        for (let index = 0; index < response.routes.length; index++) {

          const directionsRenderer = new window.google.maps.DirectionsRenderer({
            map: map,
            polylineOptions: {
              strokeColor: routeColors[index],
              strokeWeight: 8,
            }
          });

          directionsRenderer.setDirections(new Object({
            geocoded_waypoints: [response.geocoded_waypoints],
            request: response.request,
            routes: [response.routes[index]],
            status: response.status
          }));

          addDirectionsRenderer(directionsRenderer);
        }
        setSelectedOption(0);
      } else {
        window.alert("Error al calcular la ruta.");
      }
    });
  };

  useEffect(() => {
    function panto() {
      if (selected !== null)
        map.panTo(new google.maps.LatLng(selected.lat, selected.lng));
    }
    setValidRoute(true);
    panto();
  }, [selected]);

  useEffect(() => {
    function panto() {
      if (origin !== null)
        map.panTo(new google.maps.LatLng(origin.lat, origin.lng));
    }
    setValidRoute(true);
    panto();
  }, [origin]);

  useEffect(() => {
    function panto() {
      if (ubicacion !== null) {
        map.panTo(new google.maps.LatLng(ubicacion.lat(), ubicacion.lng()));
      }
    }
    panto();
  }, [ubicacion]);

  useEffect(() => {
    if (map) {
      ucabArea.setMap(map);
    }
  }, [map]);

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
          center={ucab}
          zoom={17}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {origin && (
            <Marker
              position={origin}
              draggable={true}
              onDragEnd={({latLng}) => setOrigin({lat: latLng.lat(), lng: latLng.lng()})}
            />
          )}

          {selected && (
            <Marker
              position={selected}
              draggable={true}
              onDragEnd={({latLng}) => setSelected({lat: latLng.lat(), lng: latLng.lng()})}
            />
          )}
          <div className="pt-5 flex flex-col absolute inset-x-0 shadow-xl w-3/4 md:w-2/5 mx-auto -mt-1 rounded-lg rounded-t-none">
            <PlacesAutocomplete setSelected={setOrigin} placeholderString={"Ingrese su origen"} />
            <div className="my-1" />
            <PlacesAutocomplete setSelected={setSelected} placeholderString={"Ingrese su destino"} />
            {selected && origin && validRoute && (
              <Button
                onClick={() => {
                  calcular_ruta();
                }}
                className=""
                variant="contained"
              >
                Calcular
              </Button>
            )}
          </div>

          {/* {direccion && <DirectionsRenderer directions={direccion} />} */}
        </GoogleMap>
      </Flex>
      {selected && (
        <div className="fixed bottom-20 z-30 rounded-lg mx-auto">
          <div className="content-center   justify-between">
          <div className="option-selector p-4 rounded border bg-slate-300 ml-3">
            <h3 className="mb-4">Selecciona tu ruta:</h3>
            <ul className="option-list list-none">
              {dirRenderers.map((option, index) => (
                <li className="option-item mb-2" key={index}>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value={index}
                      checked={selectedOption == index}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    {`Ruta ${index + 1}`}
                    <span class="w-3 h-3 rounded-full ml-3"
                    style={{ backgroundColor: routeColors[index] }}
                    ></span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="m-3 rounded-lg bg-gradient-to-l  vh-100 flex flex-col md:flex-col sm:flex-col pt-3 md:py-3  px-2 text-center ">
              <button
                  className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
                  onClick={() => {
                    setOpen(true)
                    console.log(dirRenderers[selectedOption].directions.routes[0].overview_path.map((point) => {
                      return {lat: point.lat(), lng: point.lng()}
                    }))
                  }}
                >
                  Guardar
              </button>
              { origin && selected && (
              <NavLink to={`/personalizar/ruta/${origin.lat}/${origin.lng}/${selected.lat}/${selected.lng}`}
                      className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"  
                      style={{ display: "block"}}
                      onClick={() => {
                        setOpen(true)
                      }}
              >
                  Personalizar Ruta
              </NavLink>
              )}
            </div>
        </div>
            {/* <div className="m-3 rounded-lg bg-gradient-to-l  vh-100 flex flex-row md:flex-col pt-3 md:py-3  px-2 text-center ">
              <SeleccionarRuta />
            </div> */}
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
