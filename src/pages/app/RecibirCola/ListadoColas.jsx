import React, { useEffect, useState } from "react";
import Rsidebar from "../../../components/app/Rsidebar";
import logo from "../../../images/fondo_logo432x460.png";
import axios from "../../../api/axios";
import ListaRecibirCola from "../../../components/app/RecibirCola/ListaRecibirCola";
import RedirigirPerfilUbicacion from "../../../components/app/RecibirCola/RedirigirPerfilUbicacion";
import AlertaSinColas from "../../../components/app/RecibirCola/AlertaSinColas";
// import { Navigate } from "react-router-dom";
import {
  listado_rutas_disponibles,
} from "../../../hooks/RutaMasCorta";

function ListadoColas({user}) {
  const [rutas, setRutas] = useState(null);
  const [distancia, setDistancia] = useState(null);
  const [direccion_usuario, setDireccion_usuario] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [ ubicacion, setUbicacion ] = useState(null);
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUbicacion({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.log('La geolocalización no es compatible con este navegador.');
    }
  };

  useEffect(() => {
    
    function inicializar() {
      listado_rutas_disponibles().then((result) => {
        //LISTADO DE RUTAS DISPONIBLES
        setRutas(result);
      });
      axios
        .get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/distancia_dispuesto_caminar", {headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }})
        .then((response) => {
          setDistancia(response.data);
        });

      axios
        .get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/perfil_direccion", {headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }})
        .then((response) => {
          //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
          setDireccion_usuario(response.data);
        });

      axios
        .get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/telefono", {headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }})
        .then((response) => {
          //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
          setTelefono(response.data);
        });

        getLocation();
      
    }
    inicializar();
  }, []);

  useEffect(() => {
    if (rutas) {
      console.log(rutas);
    }
  }, [rutas]);

  return telefono!=null && direccion_usuario !== null && distancia !== null && rutas!==null ? (   //ESPERA A QUE SE HAGAN LAS PETICIONES A LA API
    (JSON.stringify(direccion_usuario)==='{}' || distancia===0  || JSON.stringify(direccion_usuario)==='{}') ?               //EN CASO DE QUE LAS PETICIONES TENGAN VALORES VACIOS  
    <RedirigirPerfilUbicacion />
    :
    rutas.length > 0 && ubicacion? ( 
      <>
        <div className=" w-5/5 md:w-5/6  lg:w-4/6 mx-auto">
          <div className="p-5 pt-12 mb-10">
            <ListaRecibirCola
              rutas={rutas}
              localizacion_usuario={ubicacion}
              direccion_usuario={direccion_usuario}
              distancia={distancia}
              user={user}
            />
          </div>
        </div>
        <Rsidebar />
      </>
    ) : (
      <>
      <AlertaSinColas user={user}/>
      <Rsidebar />
      </>
    )
  ) : (
    <>
      {/* {estatus && <Navigate to='../../cola/curso' />} */}

      {/* <div className="flex h-screen justify-center items-center  rounded-lg">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <Rsidebar />   */}
      <RedirigirPerfilUbicacion />
    </>
  );
}

export default ListadoColas;
