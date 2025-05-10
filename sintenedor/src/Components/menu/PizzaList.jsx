// src/components/menu/PizzaList.jsx
import React from 'react';
// Importamos PizzaItem desde la misma carpeta 'menu'
import PizzaItem from './PizzaItem';
import listStyles from './PizzaList.module.css';

// Importamos la función para obtener el arreglo de pizzas desde donde la guardaste
// Asumiendo que guardaste tus datos en src/data/pizzas.js
import { getPizzasArray } from '../../data/pizzas'; // La ruta sube dos niveles (../..), entra a data, e importa getPizzasArray

function PizzaList({ onPizzaClick }) {
  // Obtenemos el arreglo de pizzas usando tu función
  const pizzas = getPizzasArray();

  // Verificación simple: si no hay pizzas, mostramos un mensaje (opcional pero útil)
  if (pizzas.length === 0) {
    return <h2>No hay pizzas disponibles en este momento.</h2>;
  }


  // Retornamos la estructura JSX para la lista de pizzas
  return (
    // Este div puede servir como contenedor para aplicar estilos de grid después
    <div className={listStyles['pizza-list-container']}>
      {/* Usamos el método map() para recorrer el arreglo 'pizzas' */}
      {pizzas.map(pizza => (
        // Para cada objeto 'pizza' en el arreglo, renderizamos un PizzaItem.
        // Es CRUCIAL pasar la prop 'key' única. Usamos el id de la pizza.
        // NOTA: Si tu 'id' es un número o string único (como 'marinera'), es perfecto.
        <PizzaItem
          key={pizza.id} // Usa el id único de cada pizza como key
          pizza={pizza} // Le pasamos el objeto pizza completo al componente PizzaItem
          onPizzaClick={onPizzaClick}
        />
      ))}
    </div>
  );
}

export default PizzaList; // Exportamos el componente