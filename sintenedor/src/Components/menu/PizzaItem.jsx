// src/components/menu/PizzaItem.jsx
import React from 'react';
import styles from './PizzaItem.module.css';

// Componente funcional que recibe los datos de UNA pizza.
// Usamos desestructuración para recibir un objeto 'pizza' completo.
function PizzaItem({ pizza ,onPizzaClick}) {
  // Desestructuramos las propiedades que necesitamos directamente del objeto 'pizza'
  const { id, nombre, imagen, ingredientes, precios } = pizza;

  // Retornamos la estructura JSX para mostrar la información de la pizza
  return (
    // Añadimos una clase para poder darle estilos más adelante (grid item)
    <div className={styles['pizza-item']}  onClick={() => onPizzaClick(pizza)}>
      {/* Mostramos la imagen si la propiedad 'imagen' existe */}
      {/* La ruta '/src/assets/...' funciona con Vite en desarrollo */}
      {imagen && <img src={imagen} alt={`Pizza ${nombre}`} className={styles['pizza-item-image']} />}

      <h3>{nombre}</h3> {/* Usamos 'nombre' en lugar de 'name' */}
      
    </div>
  );
}

// Exportamos el componente
export default PizzaItem;