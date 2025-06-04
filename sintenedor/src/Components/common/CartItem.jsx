import React from 'react';
import styles from './CartItem.module.css';

function CartItem({ item, onRemoveFromCart }) {
    return (
        <div className={styles['cart-item']}>
            <img src={item.pizzaInfo.imagen} alt={item.pizzaInfo.nombre} />
            <div className={styles['cart-item-details']}>
                <h3>{item.pizzaInfo.nombre}</h3>
                {Object.entries(item.selectedQuantities).map(([size, quantity]) => (
                    <div key={size} className={styles['quantity-control-display']}> {/* Nuevo contenedor para agrupar */}
                        <span>{size.charAt(0).toUpperCase() + size.slice(1)}: ${quantity}</span>
                        <div className={styles['item-quantity-buttons']}> {/* Botones para este tamaño */}
                            <button onClick={() => onDecreaseItemQuantity(item.pizzaInfo.id, size)}>-</button> {/* Nueva prop */}
                            <button onClick={() => onIncreaseItemQuantity(item.pizzaInfo.id, size)}>+</button> {/* Nueva prop */}
                        </div>
                    </div>
                ))}

                <p>Total: ${item.totalItemPrice.toFixed(2)}</p>
                <button onClick={() => onRemoveFromCart(item.pizzaInfo.id)}>Eliminar</button>
            </div>
        </div>
    );
}

export default CartItem;