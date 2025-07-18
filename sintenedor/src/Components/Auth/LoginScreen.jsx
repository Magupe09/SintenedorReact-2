// src/components/Auth/LoginScreen.jsx

import React, { useState } from 'react'; // <--- IMPORTA useState aquí

function LoginScreen() {
  // *** DECLARA LOS ESTADOS PARA LOS VALORES DE LOS INPUTS ***
  const [email, setEmail] = useState(''); // Estado para el correo electrónico, inicializado como cadena vacía
  const [password, setPassword] = useState(''); // Estado para la contraseña, inicializado como cadena vacía
  const [error, setError] = useState(null); 
  // Opcional: un estado para manejar el estado de carga del botón
  const [isLoading, setIsLoading] = useState(false);




  const handleSubmit = async (event) => { // <--- AÑADE 'async' aquí porque haremos una operación asíncrona
    event.preventDefault();

    // Reinicia cualquier error previo y activa el estado de carga
    setError(null);
    setIsLoading(true);

    try {
      // *** 1. DEFINE LA URL DE TU ENDPOINT DE LOGIN ***
      // Asegúrate de que esta URL coincida con la ruta de tu backend de Node.js
      // Ejemplo: si tu backend corre en http://localhost:5000 y tu ruta de login es /api/login
      const response = await fetch('http://localhost:3000/login', { // <--- ¡CAMBIA ESTA URL!
        method: 'POST', // Las solicitudes de login suelen ser POST
        headers: {
          'Content-Type': 'application/json', // Le dice al servidor que estamos enviando JSON
        },
        body: JSON.stringify({ email, password }), // Convierte el objeto JS a una cadena JSON
      });

      // *** 2. MANEJA LA RESPUESTA DEL SERVIDOR ***
      if (!response.ok) { // Si la respuesta no es 2xx (ej. 400, 401, 500)
        const errorData = await response.json(); // Intenta leer el mensaje de error del servidor
        throw new Error(errorData.message || 'Error en el inicio de sesión'); // Lanza un error
      }

      const data = await response.json(); // Si la respuesta es exitosa, parsea el JSON
      
      // *** 3. LOGIN EXITOSO ***
      console.log('Inicio de sesión exitoso:', data);
      // Aquí es donde en el futuro:
      // - Guardarías el token JWT (data.token) en localStorage.
      // - Redirigirías al usuario a otra página.
      // - Actualizarías un estado global de autenticación.

    } catch (err) {
      // *** 4. MANEJO DE ERRORES ***
      console.error('Error al iniciar sesión:', err.message);
      setError(err.message); // Muestra el error en la UI
    } finally {
      // *** 5. FINALIZA EL ESTADO DE CARGA SIEMPRE ***
      setIsLoading(false);
    }
  };





  // Función para manejar el cambio en el input del email
  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Actualiza el estado 'email' con el valor actual del input
  };

  // Función para manejar el cambio en el input de la contraseña
  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Actualiza el estado 'password' con el valor actual del input
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email} // <--- EL VALOR DEL INPUT AHORA ES CONTROLADO POR EL ESTADO 'email'
            onChange={handleEmailChange} // <--- CADA VEZ QUE ESCRIBE, SE LLAMA A handleEmailChange
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} // <--- EL VALOR DEL INPUT AHORA ES CONTROLADO POR EL ESTADO 'password'
            onChange={handlePasswordChange} // <--- CADA VEZ QUE ESCRIBE, SE LLAMA A handlePasswordChange
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginScreen;