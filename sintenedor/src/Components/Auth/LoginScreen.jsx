// src/components/Auth/LoginScreen.jsx

import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext.jsx';
import styles from './LoginScreen.module.css'; // <--- IMPORTA LOS ESTILOS AQUÍ

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

      console.log('Inicio de sesión exitoso:', data);

      const token = data.token;

      if (token) {
        login(token); 
        console.log('Usuario logueado y token guardado a través del contexto.');
      } else {
        throw new Error('No se recibió token de autenticación del servidor.');
      }

    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError(err.message);
    } finally {
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
    <div className={styles.loginContainer}> {/* <--- APLICA LA CLASE DEL MÓDULO CSS */}
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className={styles.form}> {/* <--- APLICA LA CLASE DEL MÓDULO CSS */}
        <div className={styles.formGroup}> {/* <--- APLICA LA CLASE DEL MÓDULO CSS */}
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
        <div className={styles.formGroup}> {/* <--- APLICA LA CLASE DEL MÓDULO CSS */}
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
        {error && <p className={styles.errorText}>{error}</p>} {/* <--- APLICA LA CLASE DEL MÓDULO CSS */}
        <button type="submit" disabled={isLoading} className={styles.submitButton}> {/* <--- APLICA LA CLASE DEL MÓDULO CSS */}
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;