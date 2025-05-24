import React from 'react'; // Solo necesitas React si no usas Hooks como useState aquí
import styles from './CartModal.module.css';

const CartModal = ({ carrito, onClose }) => { // <-- ¡CORREGIDO! Recibes las props desestructuradas
  return (
    <div className={styles['cart-modal']}>
      <h2>Tu Carrito de Pizza</h2>
      <button onClick={onClose}>Cerrar</button>
      {/* Aquí irá la lógica para mostrar los ítems del carrito */}
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className={styles['cart-list']}>
          {carrito.map((item, index) => (
            // Por ahora, solo mostramos el nombre de la pizza.
            // Más adelante haremos el componente CartItem.jsx
            <li className={styles['cart-item']} key={index}>
              {item.pizzaInfo.nombre} - {JSON.stringify(item.selectedQuantities)} Aqui - Total: ${item.totalItemPrice.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartModal;