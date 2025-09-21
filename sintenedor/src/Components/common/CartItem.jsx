import React from 'react';
import styles from './CartItem.module.css';




function CartItem({ item, onRemoveFromCart, onUpdateItemQuantity }) {
    return (
        <div className={styles['cart-item']}>
            <img src={item.imagen} alt={item.nombre} />
            <div className={styles['cart-item-details']}>
                <h3>{item.nombre}</h3>
                <p>Tamaño: {item.size}</p>
                <div className={styles['item-quantity-buttons']}>
                    <button onClick={() => onUpdateItemQuantity(item.pizzaId, item.size, 'decrease')}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateItemQuantity(item.pizzaId, item.size, 'increase')}>+</button>
                </div>
                <p>Precio: ${item.price.toFixed(2)}</p>
                <button onClick={() => onRemoveFromCart(item.pizzaId, item.size)}>Eliminar</button>
            </div>
        </div>
    );
}

export default CartItem;


/*

import React from 'react';
import styles from './CartItem.module.css';

function CartItem({ item, onRemoveFromCart,onIncreaseItemQuantity,onDecreaseItemQuantity }) {
    return (
        <div className={styles['cart-item']}>
            <img src={item.pizzaInfo.imagen} alt={item.pizzaInfo.nombre} />
            <div className={styles['cart-item-details']}>
                <h3>{item.pizzaInfo.nombre}</h3>
                {Object.entries(item.selectedQuantities).map(([size, quantity]) => (
                    <div key={size} className={styles['quantity-control-display']}> 
                        <div className={styles['item-quantity-buttons']}> 
                            <button onClick={() => onDecreaseItemQuantity(size)}>-</button>
                            <span>{size.charAt(0).toUpperCase() + size.slice(1)}: {quantity}</span>

                            <button onClick={() => onIncreaseItemQuantity(size)}>+</button> 
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

*/