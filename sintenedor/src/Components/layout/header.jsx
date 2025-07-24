// src/Components/common/Header/Header.jsx
import React, { useState } from 'react';
import styles from './Header.module.css'; // Crearemos este archivo CSS Module
import logoPrincipal from '../../assets/logoSintenedor.webp';
import appStyles from '../../App.module.css';

import { useAuth } from '../../Context/AuthContext.jsx';

const Header = ({ onOpenCartModal, totalItemsInCart }) => { // Recibimos props para el botón de carrito
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú móvil está abierto

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const { isAuthenticated, logout } = useAuth(); // Obtenemos isAuthenticated y logout

    const handleLogout = () => {
      logout(); // Llama a la función logout del contexto
    };
  

    return (
        <> {/* Usamos un Fragmento porque ahora hay dos elementos hermanos: header y el div del botón */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/">
            <img src={logoPrincipal} alt="Logo de Tu Pizzería" />
            <h1> Sintenedor </h1>
          </a>
        </div>

        {/* Botón de Hamburguesa */}
        <button
          className={`${styles['hamburger-menu-button']} ${isMenuOpen ? styles['menu-active'] : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </button>

        {/* Navegación Principal */}
        <nav
          id="main-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles['nav-open'] : ''}`}
        >
          <ul className={styles['nav-list']}>
            <li><a href="#menu" onClick={toggleMenu}>Menú</a></li>
            <li><a href="#about" onClick={toggleMenu}>Nosotros</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contacto</a></li>
            {/* *** RENDERIZADO CONDICIONAL PARA EL BOTÓN DE CARRITO Y LOGOUT *** */}
            {isAuthenticated && ( // Solo muestra estos elementos si el usuario está autenticado
              <>
                <li>
                  <button className={appStyles.cartButton} onClick={onOpenCartModal}>
                    Carrito ({totalItemsInCart})
                  </button>
                </li>
                <li>
                  {/* Botón para cerrar sesión */}
                  <button className={appStyles.logoutButton} onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
            {/* NOTA: El botón del carrito YA NO ESTÁ AQUÍ. Se ha movido fuera del Header. */}
          </ul>
        </nav>
      </header>

      {/* El botón del carrito, posicionado fuera del header para un control más fácil */}
      <div className={styles['fixed-cart-button-wrapper']}>
        <button
          onClick={onOpenCartModal}
          className={styles['cart-button']}
          aria-label="Abrir carrito de compras"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          {totalItemsInCart > 0 && <span className={styles['cart-count']}>{totalItemsInCart}</span>}
        </button>
      </div>
    </>
    );
};

export default Header;