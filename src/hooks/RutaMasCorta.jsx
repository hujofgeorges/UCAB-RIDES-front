import axios from "../api/axios";

const gradosARadianes = (grados) => {
  return (grados * Math.PI) / 180;
};

const distancia = (lat1, lon1, lat2, lon2) => {
  lat1 = gradosARadianes(lat1);
  lon1 = gradosARadianes(lon1);
  lat2 = gradosARadianes(lat2);
  lon2 = gradosARadianes(lon2);
  
  // Aplicar fórmula
  const RADIO_TIERRA_EN_KILOMETROS = 6371;
  let diferenciaEntreLongitudes = lon2 - lon1;
  let diferenciaEntreLatitudes = lat2 - lat1;
  let a =
    Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIO_TIERRA_EN_KILOMETROS * c * 1000;
};

export const obtener_direccion_usuario = async () => {
    const localizacion=await axios.get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/perfil_direccion", {headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }});
    return localizacion.data;
}

export const DistanciaMasCorta = (direccion,localizacion_usuario) => {
  var latitud = 0; var longitud = 0;
  var minimo = distancia(
    direccion[0].lat(),direccion[0].lng(),
    localizacion_usuario.lat,localizacion_usuario.lng
  );
  var menor = 0;
  //DADA UNA DIRECCION, RECORRE LA DIRECCION Y CALCULA LA DISTANCIA 
  //DE CADA PUNTO CON RESPECTO A LA CASA DEL USUARIO
  direccion.forEach(function (direccion) {
    menor = distancia(
      direccion.lat(),
      direccion.lng(),
      localizacion_usuario.lat,
      localizacion_usuario.lng
    );
    console.log(`(${direccion.lat()},${direccion.lng()}) to (${localizacion_usuario.lat},${localizacion_usuario.lng}) = ${menor.toFixed(0)}`)
    if (menor <= minimo) {
      minimo = menor;
      latitud = direccion.lat();
      longitud = direccion.lng();
    }
  });
  console.log(`La distancia mas corta es ${minimo.toFixed(0)} metros`)
  return [minimo.toFixed(0), latitud, longitud];
};

export const listado_rutas_disponibles = async ()=>{
  const res = await axios.get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/listado_rutas_disponibles");
  return res.data.rutas;
}

export const distancia_a_caminar = async ()=>{
  
  const res = await axios.get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/distancia_dispuesto_caminar", {headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }});
  return res.data;  
}

export const me = async ()=>{
  const res = await axios.get("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/me", {headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }});
  return res;
}
