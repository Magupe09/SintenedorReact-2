// src/Components/common/Modal.jsx
import React from 'react';
import styles from './Modal.module.css';
import { useState } from 'react';


function Modal({ pizza, onClose, onAddToCart }) {
  const [controles, setControles] = useState({ personal: 0, mediana: 0, familiar: 0 });
  const [isAnimating, setIsAnimating] = useState(false)
  //console.log("Objeto pizza que llega al Modal:", pizza);

  function handleAddToCartClick(pizza, controles) {
    // Inicializamos las variables para la información del pedido
    const selectedQuantities = {};
    let totalItemPrice = 0;
    const itemsToAdd = [];

    for (const clave in controles) {
      if (controles[clave] > 0) {
        // 1. Buscamos el objeto de precio que coincida con el tamaño (clave)
        const precioItem = pizza.precios.find(p => p.tamano === clave);

        // 2. Si se encuentra, calculamos el precio y agregamos el item
        if (precioItem) {
          totalItemPrice += controles[clave] * precioItem.precio;
          // Creamos un objeto para cada item del pedido
          itemsToAdd.push({
            pizzaId: pizza.pizza_id,
            nombre: pizza.nombre,  // <-- AÑADE ESTA LÍNEA
            imagen: pizza.imagen,
            size: clave,
            quantity: controles[clave],
            price: precioItem.precio,
          });
        }
      }
    }

    // Si se seleccionó al menos un ítem
    if (itemsToAdd.length > 0) {
      // onAddToCart ahora recibirá el array de ítems en lugar de un solo objeto
      onAddToCart(itemsToAdd);
      setControles({ personal: 0, mediana: 0, familiar: 0 });
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } else {
      alert('Debes definir las cantidades.');
    }
  }



  /*

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
    //console.log("DEBUG - Modal.jsx: Item antes de añadir al carrito:", JSON.parse(JSON.stringify(item)));
    //console.log('Item siendo añadido al carrito', item)
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

  */




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
        {/* La imagen que ocupará el 100% */}
        {imagen && <img src={imagen} alt={`Pizza ${nombre}`} className={styles['modal-background-image']} />}
        {/* Contenedor para la capa de opacidad */}
        <div className={styles['modal-image-overlay']}></div>

        {/* NUEVO: Contenedor para todo el contenido que irá SOBRE la imagen */}
        <div className={styles['modal-content-wrapper']}>

          {/* El botón de cierre ahora está aquí, dentro del wrapper de contenido */}
          <button className={styles['close-button']} onClick={onClose}>&times;</button>

          <div className={styles['modal-header']}>
            <h3>{nombre}</h3> {/* Muestra el nombre de la pizza */}
            <p><strong>Ingredientes:</strong> {ingredientes.join(', ')}</p>
            <h4>Precios:</h4>

            <ul className={styles['price-list']}>
              {pizza.precios.map((precioItem) => ( // Cambiamos la forma de iterar
                <li key={precioItem.tamano} className={styles['price-item']}>
                  {precioItem.tamano.charAt(0).toUpperCase() + precioItem.tamano.slice(1)}: ${precioItem.precio.toFixed(2)}
                  <div className={styles['quantity-controls']}>
                    <button className={styles['buttonControls']} onClick={() => handleDecreaseQuantity(precioItem.tamano)}>-</button>
                    <span className={styles['span']} >{controles[precioItem.tamano]}</span>
                    <button className={styles['buttonControls']} onClick={() => handleIncreaseQuantity(precioItem.tamano)}>+</button>
                  </div>
                </li>
              ))}
            </ul>

          </div>

          {/* El botón de añadir al carrito se queda aquí */}
          <button className={`${styles['add-to-cart-button']} ${isAnimating ? styles['animate-pulse'] : ''}`}
            onClick={() => handleAddToCartClick(pizza, controles)}>Añadir al Carrito</button>

        </div> {/* Fin de modal-content-wrapper */}
      </div> {/* Fin de modal-box */}
    </div>
  );
}

export default Modal;