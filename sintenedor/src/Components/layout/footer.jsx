// src/Components/layout/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // Importamos los estilos para este componente

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Contenedor principal del footer */}
      <div className={styles['footer-content']}>
        {/* Sección de Información de Contacto */}
        <div className={styles['footer-section']}>
          <h3>Contacto</h3>
          <p>Dirección: Calle Falsa 123, Ciudad Inventada</p>
          <p>Teléfono: (123) 456-7890</p>
          <p>Email: info@tupizzeria.com</p>
        </div>

        {/* Sección de Horarios de Atención */}
        <div className={styles['footer-section']}>
          <h3>Horarios</h3>
          <p>Lunes a Viernes: 11:00 AM - 10:00 PM</p>
          <p>Sábados y Domingos: 12:00 PM - 11:00 PM</p>
        </div>

        {/* Sección de Enlaces Rápidos */}
        <div className={styles['footer-section']}>
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="#menu">Menú</a></li>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#contact">Contáctanos</a></li>
            <li><a href="#privacy">Política de Privacidad</a></li>
          </ul>
        </div>

        {/* Sección de Redes Sociales (puedes añadir iconos SVG aquí) */}
        <div className={styles['footer-section']}>
          <h3>Síguenos</h3>
          <div className={styles['social-links']}>
            {/* Placeholder para iconos de redes sociales */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className={styles['footer-bottom']}>
        <p>&copy; {new Date().getFullYear()} Tu Pizzería. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;