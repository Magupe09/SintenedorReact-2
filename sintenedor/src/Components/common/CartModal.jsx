import React from 'react'; // Solo necesitas React si no usas Hooks como useState aquí
import styles from './CartModal.module.css';
import CartItem from './CartItem';

const CartModal = ({ carrito, onClose, onRemoveFromCart, totalPrice }) => {
  let precio = totalPrice
  return (
    <div className={styles['cart-modal']}>
      {/* Aquí irá la lógica para mostrar los ítems del carrito */}
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (

        <div className={styles['cart-summary']}>
     
          <h2>Tu Carrito de Pizza</h2>
          
        
        <button className={styles['boton-close']} onClick={onClose}>Cerrar</button>
          <ul className={styles['cart-list']}>
            {carrito.map((item, index) => (
              // Por ahora, solo mostramos el nombre de la pizza.
              // Más adelante haremos el componente CartItem.jsx

              <li className={styles['cart-item']} key={item.pizzaInfo.id}>
                <CartItem
                  item={item}
                  onRemoveFromCart={onRemoveFromCart}
                />
              </li>

            ))}
          </ul>

          <p>Total del Carrito: ${precio}</p>
        </div>

      )
      }



    </div>
  );
};

export default CartModal;