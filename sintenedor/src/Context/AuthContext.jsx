// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Crea el Contexto de Autenticación
// Le damos un valor por defecto que nos ayudará a autocompletar en el futuro.
const AuthContext = createContext({
  isAuthenticated: false, // Indica si hay un usuario logueado
  user: null,             // Información del usuario (ej. nombre, email)
  token: null,            // El JWT
  login: () => {},        // Función para iniciar sesión
  logout: () => {},       // Función para cerrar sesión
  isLoading: true         // Para saber si el contexto está cargando el estado inicial
});

// 2. Crea el Proveedor del Contexto de Autenticación
// Este componente envolverá tu aplicación y manejará el estado de autenticación.
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Para el estado de carga inicial

  // useEffect para cargar el estado de autenticación desde localStorage al inicio
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    // Aquí podrías decodificar el token para obtener información del usuario
    // O simplemente verificar si existe un token para marcar como autenticado
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Opcional: Si guardaste 'userData', cárgalo también
      // const storedUserData = localStorage.getItem('userData');
      // if (storedUserData) {
      //   setUser(JSON.parse(storedUserData));
      // }
    }
    setIsLoading(false); // Ya se verificó el localStorage, no estamos cargando
  }, []); // El array vacío significa que se ejecuta solo una vez al montar el componente

  // Función de login que será provista a los componentes
  const login = (jwtToken, userData = null) => {
    localStorage.setItem('userToken', jwtToken);
    setToken(jwtToken);
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
      // localStorage.setItem('userData', JSON.stringify(userData));
    }
    // console.log("AuthContext: Usuario logueado", { token: jwtToken, user: userData });
  };

  // Función de logout que será provista a los componentes
  const logout = () => {
    localStorage.removeItem('userToken');
    // localStorage.removeItem('userData');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    // console.log("AuthContext: Usuario deslogueado");
  };

  // El valor que será provisto a todos los componentes hijos
  const authContextValue = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    isLoading
  };

  // Renderiza los componentes hijos, dándoles acceso al valor del contexto
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook para facilitar el consumo del contexto
// En lugar de usar useContext(AuthContext) directamente en cada componente,
// podemos usar este hook para hacer el código más limpio y agregar validaciones.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};