import React from 'react';
import styles from './CartItem.module.css';

function CartItem({ item, onRemoveFromCart, onIncreaseItemQuantity, onDecreaseItemQuantity }) {
    // La nueva estructura de datos es plana. Usamos directamente las propiedades del 'item'.
    return (
        <div className={styles['cart-item']}>
            <div className={styles['cart-item-details']}>
                <h3>{item.nombre}</h3> {/* Usamos el nombre de la pizza */}
                <img src={item.imagen} alt={item.nombre} /> {/* Usamos la imagen */}
                
                {/* Iteramos sobre el item, ya que ahora es un objeto plano y cada uno representa un ítem en el carrito */}
                <div key={item.size} className={styles['quantity-control-display']}>
                    <div className={styles['item-quantity-buttons']}>
                        {/* Pasamos directamente el ID y el tamaño del ítem actual */}
                        <button onClick={() => onDecreaseItemQuantity(item.pizzaId, item.size)}>-</button>
                        <span>
                            {item.size.charAt(0).toUpperCase() + item.size.slice(1)}: {item.quantity}
                        </span>
                        <button onClick={() => onIncreaseItemQuantity(item.pizzaId, item.size)}>+</button>
                    </div>
                </div>

                <p>Total: ${item.price.toFixed(2)}</p>
                {/* Pasamos el ID del ítem para eliminarlo */}
                <button onClick={() => onRemoveFromCart(item.pizzaId)}>Eliminar</button>
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