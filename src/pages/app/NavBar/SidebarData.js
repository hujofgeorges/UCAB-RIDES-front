import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import Clave from '../../../components/app/perfil/Clave';
import DistanciaCaminar from '../../../components/app/RecibirCola/DistanciaCaminar';
import Telefono from '../../../components/app/perfil/Telefono';
import ubicacion from '../../../images/ubicacao.png';
import chat from '../../../images/conversation.png';
import emergencia from '../../../images/siren.png';
import cambio from '../../../images/change.png';
import salir from '../../../images/exit.png';
import CerrarSesion from '../../../components/app/perfil/CerrarSesion';
export const SidebarData = [

  {
    title: 'Configurar Ubicación',
    path: '/configurar/ubicacion',
    icon: <img src={ubicacion} className=" h-8 mr-3"/>,
    cName: 'nav-text'
  },
  {
    render: <Clave />,
    gap: true
  },
  {
    render: <DistanciaCaminar />,
    gap: true
  },
  {
    render: <Telefono />
  },
  {
    title: 'ChatRides',
    path: '/chat',
    icon: <img src={chat} className=" h-8 mr-2"/>,
    cName: 'nav-text',
  },
  {
    title: 'Contactos de Emergencia',
    path: '/contactos',
    icon: <img src={emergencia} className="h-8 mr-2"/>,
    cName: 'nav-text',
  },
  {
    gap: true
  },
  {
    gap: true
  },
  {
    gap: true
  },
  {
    gap: true
  },
  {
    gap: true
  },
  {
    gap: true
  },
  {
    gap: true
  },
  {
    gap: true
  },
  {
    title: 'Cambio de Rol',
    path: '/rol',
    icon: <img src={cambio} className=" h-8 mr-2"/>,
    cName: 'nav-text',
  },
  {
   render: <CerrarSesion />
  }

  // {
  //   title: 'Politicas de privacidad',
  //   path: '/chat',
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: 'nav-text',
  // },
  // {
  //   title: 'Preguntas Frecuentes',
  //   path: '/chat',
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: 'nav-text',
  // },
  // {
  //   title: 'Terminos y Condiciones',
  //   path: '/chat',
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: 'nav-text',
  // }
];
