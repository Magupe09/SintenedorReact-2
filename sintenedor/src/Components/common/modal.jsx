// src/Components/common/Modal.jsx
import React from 'react';
import styles from './Modal.module.css';
import { useState } from 'react';


function Modal({ pizza, onClose, onAddToCart }) {
  const [controles, setControles] = useState({ personal: 0, mediana: 0, familiar: 0 });
  const [isAnimating, setIsAnimating] = useState(false)
  console.log("Objeto pizza que llega al Modal:", pizza);

  function handleAddToCartClick(pizza, controles) {


    const pizzaInfo = pizza;
    const selectedQuantities = {};
    let totalItemPrice = 0;

    for (const clave in controles) {

      if (controles[clave] > 0) {
        selectedQuantities[clave] = controles[clave];
        totalItemPrice += controles[clave] * pizza.precios[clave]
      }
    }
    const item = { pizzaInfo, selectedQuantities, totalItemPrice }
    console.log("DEBUG - Modal.jsx: Item antes de añadir al carrito:", JSON.parse(JSON.stringify(item)));
    console.log('Item siendo añadido al carrito', item)
    if (item.totalItemPrice > 0) {
      onAddToCart(item);
      setControles({ personal: 0, mediana: 0, familiar: 0 });
      setIsAnimating(true); // Activa la animación
      setTimeout(() => {
        setIsAnimating(false); // Desactiva la animación después de un tiempo
      }, 300);
    } else {
      alert('Debes definir las cantidades. ')
    }




  }
  function handleIncreaseQuantity(size) {

    setControles(prevControles => {

      return {
        ...prevControles,
        [size]: prevControles[size] + 1
      };

    });

  }
  function handleDecreaseQuantity(size) {

    setControles(prevControles => {
      // console.log("Aumentamos el valor",prevControles[size])
      const currentQty = prevControles[size];

      if (currentQty > 0) {
        return {
          ...prevControles,
          [size]: prevControles[size] - 1

        };
      } else {
        return prevControles

      }



    })
  }

  if (!pizza) {
    return null;
  }

  // *** Desestructuramos los datos que necesitamos de la pizza ***
  const { id, nombre, imagen, ingredientes, precios } = pizza;
  // **********************************************************


  return (
    // El overlay oscuro (fondo) - cierra el modal al hacer clic fuera

    <div className={styles['modal-overlay']} onClick={onClose}>

      <div className={styles['modal-box']} onClick={(e) => e.stopPropagation()}>

        <div className={styles['modal-body']}>

          {/* Imagen de la pizza en el modal - usa la prop imagen */}
          {imagen && <img src={imagen} alt={`Pizza ${nombre}`} className={styles['modal-image']} />} {/* Usa una clase para estilizar la imagen en el modal */}


          {/* *** Placeholder para mostrar el precio total calculado por cantidad (¡futuro!) *** */}
          {/* <p>Precio Total Seleccionado: $XX.XX</p> */}


          {/* *** Placeholder para el botón de añadir al carrito (¡futuro!) *** */}
          {/* Puedes añadir un div.modal-footer para agrupar botones si quieres */}
          {/* <div className={styles['modal-footer']}> */}
          <button className={`${styles['add-to-cart-button']} ${isAnimating ? styles['animate-pulse'] : ''}`}
            onClick={() => handleAddToCartClick(pizza, controles)}>Añadir al Carrito</button>
          {/* </div> */}
        </div>

        <div className={styles['modal-header']}>
          <h3>{nombre}</h3> {/* Muestra el nombre de la pizza */}

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
              <li key={size} className={styles['price-item']}>

                {size.charAt(0).toUpperCase() + size.slice(1)}: ${price.toFixed(3)}
                <div className={styles['quantity-controls']}>
                  <button className={styles['buttonControls']} onClick={() => handleDecreaseQuantity(size)}>-</button>
                  <span className={styles['span']} >{controles[size]}</span>
                  <button className={styles['buttonControls']} onClick={() => handleIncreaseQuantity(size)}>+</button>
                </div>
              </li>

            ))}

          </ul>
        </div>




      </div>

    </div>
  );
}

export default Modal;