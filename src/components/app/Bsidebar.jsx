import React, { useEffect } from 'react';
import './Bsidebarcss.css';
import casa from "../../images/casa.png"
import ruta from "../../images/ruta.png"
import cola from "../../images/cola.png"
import perfil from "../../images/perfil.png"
import ajustes from "../../images/ajustes.png"
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Bsidebar() {

    useEffect(() => {
        const list = document.querySelectorAll('.list');

        function activeLink() {
            list.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
        }

        list.forEach((item) => item.addEventListener('click', activeLink));

        return () => {
            // Limpiar los event listeners al desmontar el componente
            list.forEach((item) => item.removeEventListener('click', activeLink));
        };
    }, []);


    const location = useLocation();

    const routeToIndexMap = {
        '/': 0,
        '/listado/rutas': 1,
        '/conductor/cola/curso': 2,
        '/perfil/conductor': 3,
        '/ajustes': 4,
        '/contactos':3,
        '/vehiculos': 3,
    };

    const activeIndex = routeToIndexMap[location.pathname];
    
    const style = {
        "--clr": "#f44336",
    };

    return (
        <div className="navigation">
            <ul>
                <li className="list">
                    <a href="#">
                        <span className="icon">
                            <img src={casa} alt="Icono Conductor" className='custom-size' />
                        </span>
                        <span className="h5 text font-inter">Home</span>
                    </a>
                </li>
                <li className={activeIndex === 1 ? 'list active' : 'list'}>
                    <NavLink
                        to="/listado/rutas"
                    >
                        <a href="#" >
                            <span className="icon">
                                <img src={ruta} alt="Icono Conductor" className='custom-size' />
                            </span>
                            <span className="h5 text font-inter">Rutas</span>
                        </a>
                    </NavLink>

                </li>
                <li className={activeIndex === 2 ? 'list active' : 'list'}>
                    <NavLink
                        to="/conductor/cola/curso"
                    >
                        <a href="#" >
                            <span className="icon">
                                <img src={cola} alt="Icono Conductor" className='custom-size' />
                            </span>
                            <span className="h5 text font-inter">Pasajeros</span>
                        </a>
                    </NavLink>
                </li>
                <li className={activeIndex === 3 ? 'list active' : 'list'}>
                    <NavLink
                        to="/perfil/conductor"
                    >
                        <a href="#" >
                            <span className="icon">
                                <img src={perfil} alt="Icono Conductor" className='custom-size' />
                            </span>
                            <span className="h5 text font-inter">Perfil</span>
                        </a>
                    </NavLink>

                </li>
                <li className="list">
                    <a href="#" >
                        <span className="icon">
                            <img src={ajustes} alt="Icono Conductor" className='custom-size' />
                        </span>
                        <span className="h5 text font-inter">Ajustes</span>
                    </a>
                </li>
                <div className="indicator"></div>
            </ul>
        </div>
    );
}

export default Bsidebar;