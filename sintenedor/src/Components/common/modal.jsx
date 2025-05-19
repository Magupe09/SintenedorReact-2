// src/Components/common/Modal.jsx
import React from 'react';
import styles from './Modal.module.css';
import { useState } from 'react';

function Modal({ pizza, onClose,onAddToCart}) {
  const [controles, setControles] = useState({ personal: 0, mediana: 0, familiar: 0 });

  function handleAddToCartClick(pizza,controles){
    console.log(pizza,controles)
    
    
    const pizzaInfo=pizza;
    const selectedQuantities={};
    let totalItemPrice=0;

    for(const clave in controles){
      
      if(controles[clave]>0){
        selectedQuantities[clave]= controles[clave];
        totalItemPrice +=controles[clave] * pizza.precios[clave]
      }
    }
    const item={pizzaInfo,selectedQuantities,totalItemPrice}
    onAddToCart(item)



  }
  function handleIncreaseQuantity(size) {

    setControles(prevControles => {

      return {
        ...prevControles,
        [size]: prevControles[size] + 1
      };

    });

    console.log("FUnciona mao", controles[size], setControles[size]);
  }
  function handleDecreaseQuantity(size) {

    setControles(prevControles => {
      // console.log("Aumentamos el valor",prevControles[size])
      const currentQty = prevControles[size];
      console.log(currentQty)
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

      {/* La caja principal del modal - evita que el clic dentro lo cierre */}
      <div className={styles['modal-box']} onClick={(e) => e.stopPropagation()}>


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
                {/* Usa una clase para estilizar cada item de precio */}
                {/* Capitalizamos la primera letra del tamaño y mostramos el precio formateado */}
                {size.charAt(0).toUpperCase() + size.slice(1)}: ${price.toFixed(3)}
                {/* *** Placeholder para los botones de cantidad +/- para ESTE TAMAÑO (¡futuro!) *** */}
                {/* Por ahora, solo mostramos el precio fijo */}
                <div className={styles['quantity-controls']}>
                  <button className={styles['buttonControls']} onClick={() => handleDecreaseQuantity(size)}>-</button>
                  <span className={styles['span']} >{controles[size]}</span>
                  <button className={styles['buttonControls']} onClick={() => handleIncreaseQuantity(size)}>+</button>
                </div>
              </li>

            ))}

          </ul>
        </div>

        <div className={styles['modal-body']}>

          {/* Botón de cerrar - usa una 'x' (&times;) */}
          <button onClick={onClose} className={styles['close-button']}>&times;</button>
          {/* Imagen de la pizza en el modal - usa la prop imagen */}
          {imagen && <img src={imagen} alt={`Pizza ${nombre}`} className={styles['modal-image']} />} {/* Usa una clase para estilizar la imagen en el modal */}


          {/* *** Placeholder para mostrar el precio total calculado por cantidad (¡futuro!) *** */}
          {/* <p>Precio Total Seleccionado: $XX.XX</p> */}


          {/* *** Placeholder para el botón de añadir al carrito (¡futuro!) *** */}
          {/* Puedes añadir un div.modal-footer para agrupar botones si quieres */}
          {/* <div className={styles['modal-footer']}> */}
          <button className={styles['add-to-cart-button']} onClick={() => handleAddToCartClick(pizza,controles)}>Añadir al Carrito</button>
          {/* </div> */}
        </div>


      </div> {/* Fin modal-box */}

    </div>
  );
}

export default Modal;