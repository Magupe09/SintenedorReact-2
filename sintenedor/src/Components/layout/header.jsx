// src/Components/common/Header/Header.jsx
import React, { useState } from 'react';
import styles from './Header.module.css'; // Crearemos este archivo CSS Module
import logoPrincipal from '../../assets/logoSintenedor.webp';

const Header = ({ onOpenCartModal, totalItemsInCart }) => { // Recibimos props para el botón de carrito
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú móvil está abierto

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            {/* Sección del Logo */}
            <div className={styles.logo}>
                <a href="/"> {/* Enlace al inicio */}
                    <img src={logoPrincipal} alt="Logo de Tu Pizzería" /> {/* Asegúrate de tener una imagen de logo */}
                    <h1> Sintenedor </h1>
                </a>
            </div>

            {/* Botón de Hamburguesa (visible solo en móvil/tablet) */}
            <button
                className={styles['hamburger-menu-button']}
                onClick={toggleMenu}
                aria-expanded={isMenuOpen} // Para accesibilidad
                aria-controls="main-navigation" // Para accesibilidad
            >
                {/* Aquí puedes poner un SVG para el icono de hamburguesa o líneas */}
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </button>

            {/* Navegación Principal (se comporta diferente en desktop y móvil) */}
            <nav
                id="main-navigation"
                className={`${styles.nav} ${isMenuOpen ? styles['nav-open'] : ''}`}
            >
                <ul className={styles['nav-list']}>
                    <li><a href="#menu" onClick={toggleMenu}>Menú</a></li>
                    <li><a href="#about" onClick={toggleMenu}>Nosotros</a></li>
                    <li><a href="#contact" onClick={toggleMenu}>Contacto</a></li>
                    {/* Botón del Carrito (pasado como prop) */}
                    <li>
                        <button
                            onClick={() => {
                                onOpenCartModal(); // Abre el modal del carrito
                                if (isMenuOpen) toggleMenu(); // Cierra el menú móvil si está abierto
                            }}
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
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;