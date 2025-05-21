import React from 'react'; // Solo necesitas React si no usas Hooks como useState aquí

const CartModal = ({ carrito, onClose }) => { // <-- ¡CORREGIDO! Recibes las props desestructuradas
  return (
    <div>
      <h2>Tu Carrito de Pizza</h2>
      <button onClick={onClose}>Cerrar</button>
      {/* Aquí irá la lógica para mostrar los ítems del carrito */}
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((item, index) => (
            // Por ahora, solo mostramos el nombre de la pizza.
            // Más adelante haremos el componente CartItem.jsx
            <li key={index}>
              {item.pizzaInfo.nombre} - Cantidades: {JSON.stringify(item.selectedQuantities)} - Total: ${item.totalItemPrice.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartModal;