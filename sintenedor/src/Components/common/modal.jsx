// src/Components/common/Modal.jsx
import React from 'react';
import styles from './Modal.module.css'; // Importamos los estilos para el modal

// El componente Modal recibe las props 'pizza' y 'onClose'
function Modal({ pizza, onClose }) {
  // Si no hay datos de pizza, no renderizamos nada (medida de seguridad)
  if (!pizza) {
    return null;
  }

  // *** Desestructuramos los datos que necesitamos de la pizza ***
  const { id, nombre, imagen, ingredientes, precios } = pizza;
  // **********************************************************


  return (
    // El overlay oscuro (fondo) - cierra el modal al hacer clic fuera
    <div className={styles['modal-overlay']} onClick={onClose}>

      {/* La caja principal del modal - evita que el clic dentro lo cierre */}
      <div className={styles['modal-box']} onClick={(e) => e.stopPropagation()}>

        {/* *** Contenido Detallado de la Pizza (REEMPLAZA el contenido temporal) *** */}

        {/* Encabezado del modal con título y botón de cerrar */}
        {/* Usamos una clase para estilizar esta sección después */}
        <div className={styles['modal-header']}>
          <h3>{nombre}</h3> {/* Muestra el nombre de la pizza */}
          {/* Botón de cerrar - usa una 'x' (&times;) */}
          <button onClick={onClose} className={styles['close-button']}>&times;</button>
        </div>

        {/* Cuerpo principal del modal con imagen e info */}
        {/* Usamos una clase para estilizar esta sección después */}
        <div className={styles['modal-body']}>
          {/* Imagen de la pizza en el modal - usa la prop imagen */}
          {imagen && <img src={imagen} alt={`Pizza ${nombre}`} className={styles['modal-image']} />} {/* Usa una clase para estilizar la imagen en el modal */}

          {/* Ingredientes - usa la propiedad ingredientes del objeto pizza */}
          {/* .join(', ') convierte el arreglo de ingredientes en una cadena de texto separada por comas */}
          <p><strong>Ingredientes:</strong> {ingredientes.join(', ')}</p>

          {/* Precios por tamaño */}
          <h4>Precios:</h4>
          {/* Usamos una clase para estilizar esta lista después */}
          <ul className={styles['price-list']}>
            {/* Object.entries(precios) convierte el objeto { personal: 10, ... } en un arreglo como [ ['personal', 10], ['mediana', 15], ... ] */}
            {/* map itera sobre cada par [tamaño, precio] */}
            {Object.entries(precios).map(([size, price]) => (
              // key es importante para las listas en React; el 'size' (ej. 'personal') es único
              <li key={size} className={styles['price-item']}> {/* Usa una clase para estilizar cada item de precio */}
                {/* Capitalizamos la primera letra del tamaño y mostramos el precio formateado */}
                {size.charAt(0).toUpperCase() + size.slice(1)}: ${price.toFixed(2)}
                {/* *** Placeholder para los botones de cantidad +/- para ESTE TAMAÑO (¡futuro!) *** */}
                {/* Por ahora, solo mostramos el precio fijo */}
              </li>
            ))}
          </ul>

          {/* *** Placeholder para mostrar el precio total calculado por cantidad (¡futuro!) *** */}
          {/* <p>Precio Total Seleccionado: $XX.XX</p> */}


          {/* *** Placeholder para el botón de añadir al carrito (¡futuro!) *** */}
          {/* Puedes añadir un div.modal-footer para agrupar botones si quieres */}
          {/* <div className={styles['modal-footer']}> */}
            {/* <button className={styles['add-to-cart-button']}>Añadir al Carrito</button> */}
          {/* </div> */}
        </div>

        {/* Fin del contenido detallado */}

      </div> {/* Fin modal-box */}

    </div> 
  );
}

export default Modal;