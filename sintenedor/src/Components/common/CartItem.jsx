import React from 'react';
import styles from './CartItem.module.css';

function CartItem({ item, onRemoveFromCart,onIncreaseItemQuantity,onDecreaseItemQuantity }) {
    return (
        <div className={styles['cart-item']}>
            <img src={item.pizzaInfo.imagen} alt={item.pizzaInfo.nombre} />
            <div className={styles['cart-item-details']}>
                <h3>{item.pizzaInfo.nombre}</h3>
                {Object.entries(item.selectedQuantities).map(([size, quantity]) => (
                    <div key={size} className={styles['quantity-control-display']}> {/* Nuevo contenedor para agrupar */}
                        <div className={styles['item-quantity-buttons']}> {/* Botones para este tamaño */}
                            <button onClick={() => onDecreaseItemQuantity(size)}>-</button> {/* Nueva prop */}
                            <span>{size.charAt(0).toUpperCase() + size.slice(1)}: ${quantity}</span>

                            <button onClick={() => onIncreaseItemQuantity(size)}>+</button> {/* Nueva prop */}
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