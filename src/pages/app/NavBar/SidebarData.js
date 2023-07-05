import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import Clave from '../../../components/app/perfil/Clave';
import DistanciaCaminar from '../../../components/app/RecibirCola/DistanciaCaminar';
import Telefono from '../../../components/app/perfil/Telefono';
export const SidebarData = [

  {
    title: 'Configurar Ubicacion',
    path: '/configurar/ubicacion',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    render: <Clave />
  },
  {
    render: <DistanciaCaminar />
  },
  {
    render: <Telefono />
  },
  {
    title: '  ChatRides',
    path: '/chat',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    gap: 'true'
  },
  {
    title: 'Contactos de Emergencia',
    path: '/contactos',
    icon: '',
    cName: 'nav-text',
    gap: 'true'
  }
];
