import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/web/Header";
import axios from "../../api/axios";
import { useSnackbar } from "notistack";
import ButtomGmail from "../../components/web/ButtomGmail";
import flecha from "../../images/flechaizqnegra.png"
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const enviarFormularioLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/login", {
        email: email,
        password: password,
      });

      if (res.data.error) enqueueSnackbar(res.data.error, { variant: "error" });
      else {
        enqueueSnackbar("Gracias por volver :D ", { variant: "success" });
        localStorage.setItem(
          "access_token", res.data.access_token
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("../rol");
      }
      // console.log(res?.data);
    } catch (error) {
      enqueueSnackbar("Error de conexion", { variant: "error" });
    }
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden ">
      <Link to="/" className="block" aria-label="Cruip">
      <button className="fixed top-0 left-0 m-4 p-2 w-9 h-9 rounded-md bg-fondo_flecha text-white flex justify-center items-center shadow-lg opacity-75 hover:opacity-100">
        <img
          src={flecha}
          alt=""
          className="h-4 inline-block"
        />
      </button>
      </Link>



      {/*  Site header */}

      {/*  Page content */}
      <main className="flex-grow bg-fondo">
        <section className="bg-fondo from-gray-100 to-white">
          <div className="max-w-6xl bg-fondo mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 bg-fondo md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 text-black">Bienvenido a</h1>

                <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r text-customGreen to-teal-400">
                  UCAB RIDES
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={enviarFormularioLogin}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3 ">
                      <label
                        className="block text-black text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Usuario o Correo Ucab
                      </label>
                      <input
                        id="email"
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        autoComplete="off"
                        type="text"
                        className="form-input focus:outline-none focus:border-hoverGreen w-full rounded-md bg-fondo border-customGreen text-gray-800"
                        placeholder="nombre de usuario"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-black text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Clave
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-input w-full rounded-md bg-fondo border-customGreen focus:outline-none focus:border-hoverGreen text-gray-800"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="off"
                        placeholder="***********"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="iniciar btn rounded-md text-black bg-customGreen hover:bg-hoverGreen w-full">
                        Iniciar Sesion
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-10">
                    <label
                      className="block text-customGreen hover:text-hoverGreen text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Olvidaste tu contraseña?
                    </label>
                    
                  </div>
                  <div className="px-4 mt-10">
                    <div className="flex flex-col w-full rounded-full items-center justify-center">
                    <label
                      className="block text-letra_clara text-sm mt-20 mb-5 font-medium"
                    >
                      ¿Eres un nuevo usuario? Regístrate o inicia sesión aquí:
                    </label>
                      <ButtomGmail />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
