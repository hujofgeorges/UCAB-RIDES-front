import Navbar from '../NavBar/Navbar'
import './BackG.css';
import './StylesPerfil.css';
import fady from '../../../images/team/fady.jpg'
import setting from '../../../images/control.png'
import menu from '../../../images/Calendar.png'
import chart2 from '../../../images/Chart_fill.png'
import chart from '../../../images/Chart.png'
import chat from '../../../images/Chat.png'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';




export const PerfilN = () => {
  const initialTime = 90 * 60; // Duración inicial del contador en segundos (90 minutos)
  const [countdown, setCountdown] = useState(initialTime);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado del botón
  const [showMessage, setShowMessage] = useState(false); // Estado del mensaje

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          setIsButtonDisabled(false); // Desbloquea el botón cuando el tiempo llegue a cero
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClick = () => {
    if (countdown === 0) {
      setIsButtonDisabled(true); // Bloquea el botón cuando se hace clic (si el tiempo es cero)
      setCountdown(initialTime); // Reinicia el contador
    } else {
      setShowMessage(true); // Muestra el mensaje si se intenta presionar el botón mientras el tiempo está en marcha
      setTimeout(() => {
        setShowMessage(false); // Oculta el mensaje después de 3 segundos
      }, 3000);
    }
  };
  
  return (
    <>

        <Navbar/>
        <div className="container body-backperfil mx-auto letra">

          <div className='profile-box'>
                <img src={menu} className='menu-icon' />
                <img src={setting} className='setting-icon'/>
                <img src={fady} className='profile-pic mx-auto' />
                <h3 className='text-white'> Fady Georges </h3>
                <p className='text-white'> fadydaniel13.com </p>
                <div className="grid grid-cols-3 gap-4">
                    <img src={chart} alt="Imagen 1" className="w-1/3 " />
                    <img src={chart2} alt="Imagen 2" className="w-1/3" />
                    <img src={chat} alt="Imagen 3" className="w-1/3" />
                </div>
                
                
                <NavLink className='profile-box-boton' to='/listado/colas' type='button' onClick={handleClick} disabled={countdown > 0}>
                     Buscar cola
                </NavLink>
                {showMessage && (
                  <p>Ya una cola fue recientemente completada. ¡Espere el tiempo estipulado para la siguiente cola!</p>
               )}
                <div className='profile-bottom'>
                    <h3 className=' text-stone-900'> Tiempo para el próximo viaje:   </h3>
                    <p> {countdown > 0 ? formatTime(countdown) : '¡Tiempo terminado!'} </p>
                </div>
          </div>

        </div>


    </>
  )
}
{/* <button onClick={() => setCountdown(0)}>Poner tiempo en 0</button> */}
