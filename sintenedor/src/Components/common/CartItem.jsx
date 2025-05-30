import React from 'react';
import styles from './CartItem.module.css';

function CartItem({ item, onRemoveFromCart }) {
    return (
        <div className={styles['cart-item']}>
            <img src={item.pizzaInfo.imagen} alt={item.pizzaInfo.nombre} />
            <div className={styles['cart-item-details']}>
                <h3>{item.pizzaInfo.nombre}</h3>
                
                {Object.entries(item.selectedQuantities).map(([clave,valor]) => (
                    <span key={clave}>{clave}: ${valor}</span>

            ))}
                <p>Total: ${item.totalItemPrice.toFixed(2)}</p>
                <button onClick={() => onRemoveFromCart(item.pizzaInfo.id)}>Eliminar</button>
            </div>
        </div>
    );
}

export default CartItem;