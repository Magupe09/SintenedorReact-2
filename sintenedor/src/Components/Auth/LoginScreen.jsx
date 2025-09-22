// src/components/Auth/LoginScreen.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Context/AuthContext.jsx';
import styles from './LoginScreen.module.css';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Nuevo estado para alternar entre login y signup

    const { login } = useAuth();
    const googleButtonRef = useRef(null);

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: '912737213054-926628emttindeth5eadqp0lcumoukgq.apps.googleusercontent.com',
            callback: async (response) => {
                const idToken = response.credential;
                try {
                    const res = await fetch('http://localhost:4000/auth/google', { // <-- URL corregida
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: idToken }),
                    });
                    if (!res.ok) {
                        const errorData = await res.json();
                        throw new Error(errorData.error || 'Error al autenticar.');
                    }
                    const data = await res.json();
                    console.log('Login con Google exitoso:', data);
                    login(data.token, data.user_id);
                } catch (error) {
                    console.error('Error durante la autenticación de Google:', error);
                }
            },
        });

        window.google.accounts.id.renderButton(
            googleButtonRef.current,
            { theme: 'outline', size: 'large' }
        );
    }, [login]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const endpoint = isLogin ? 'login' : 'signup';
        const body = isLogin ? { email, password } : { name, email, password };
        
        try {
            const response = await fetch(`http://localhost:4000/${endpoint}`, { // <-- URL corregida
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en la autenticación');
            }

            console.log('Autenticación exitosa:', data);

            if (data.token) {
                login(data.token, data.user_id);
                console.log('Usuario autenticado y token guardado a través del contexto.');
            } else {
                // Para el registro, solo mostramos el mensaje de éxito
                if (!isLogin) {
                    setError(null);
                    alert(data.message || 'Registro exitoso. ¡Ahora puedes iniciar sesión!');
                    setIsLogin(true); // Cambia al modo de login después del registro exitoso
                } else {
                    throw new Error('No se recibió token de autenticación del servidor.');
                }
            }

        } catch (err) {
            console.error('Error durante la autenticación:', err.message);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {!isLogin && (
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                )}
                <div className={styles.formGroup}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                {error && <p className={styles.errorText}>{error}</p>}
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                </button>
                <div ref={googleButtonRef}></div>
            </form>
            <p className={styles.toggleAuth}>
                {isLogin
                    ? '¿No tienes una cuenta? '
                    : '¿Ya tienes una cuenta? '}
                <a onClick={() => setIsLogin(!isLogin)} className={styles.toggleLink}>
                    {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                </a>
            </p>
        </div>
    );
}

export default LoginScreen;




/*

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Context/AuthContext.jsx';
import styles from './LoginScreen.module.css'; // <--- IMPORTA LOS ESTILOS AQUÍ

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const googleButtonRef = useRef(null);
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '912737213054-926628emttindeth5eadqp0lcumoukgq.apps.googleusercontent.com',
       // <-- Pega tu Client ID aquí
      callback: async (response) => {
        const idToken = response.credential;
        try {
          const res = await fetch('http://localhost:3000/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: idToken }),
          });
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Error al autenticar.');
          }
          const data = await res.json();
          console.log('Login con Google exitoso:', data);
          login(data.token, data.user_id);
        } catch (error) {
          console.error('Error durante la autenticación de Google:', error);
        }
      },
    });

    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      { theme: 'outline', size: 'large' }
    );
  }, [login]);
  // --- Fin de la lógica de Google Login ---

  

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
    <div className={styles.loginContainer}> 
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className={styles.form}> 
        <div className={styles.formGroup}> 
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
        <div className={styles.formGroup}> 
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
        {error && <p className={styles.errorText}>{error}</p>} 
        <button type="submit" disabled={isLoading} className={styles.submitButton}> 
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        <p>O</p>

<div ref={googleButtonRef}></div>
      </form>
    </div>
  );
}

export default LoginScreen;
*/