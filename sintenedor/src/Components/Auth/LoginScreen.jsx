// src/components/Auth/LoginScreen.jsx

import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // *** OBTIENE LA FUNCIÓN 'login' DEL CONTEXTO ***
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      // Asegúrate de que esta URL sea la correcta de tu backend
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el inicio de sesión');
      }

      const data = await response.json();

      // *** 3. LOGIN EXITOSO - ¡CAMBIOS AQUÍ! ***
      console.log('Inicio de sesión exitoso:', data);

      // PASO 5.1: Extraer el token del objeto 'data'
      // Asume que tu backend envía el token en una propiedad llamada 'token' (ej. { token: "..." })
      // Si tu backend lo llama diferente (ej. 'accessToken', 'jwt'), ¡ajusta 'data.token' aquí!
      const token = data.token; 

      if (token) {
     // *** LLAMA A LA FUNCIÓN 'login' DEL CONTEXTO ***
        // Esto guarda el token en localStorage y actualiza el estado global de autenticación
        login(token); 

        // Ya no necesitamos window.location.reload() ni el alert aquí,
        // porque el AuthProvider y App.jsx se encargarán de la redirección/renderizado condicional
        console.log('Usuario logueado y token guardado a través del contexto.');

      } else {
        throw new Error('No se recibió token de autenticación del servidor.');
      }

    } catch (err) {
      // *** 4. MANEJO DE ERRORES ***
      console.error('Error al iniciar sesión:', err.message);
      setError(err.message);
    } finally {
      // *** 5. FINALIZA EL ESTADO DE CARGA SIEMPRE ***
      setIsLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
            value={email}
            onChange={handleEmailChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            disabled={isLoading}
          />
        </div>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;