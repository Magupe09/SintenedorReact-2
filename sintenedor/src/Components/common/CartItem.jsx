import React from 'react';

function CartItem({ item, onRemoveFromCart }) {

    return (
        <div className="cart-item">
            <img src={item.pizzaInfo.imagen} alt={item.pizzaInfo.nombre} />
            <div className="cart-item-details">
                <h3>{item.pizzaInfo.nombre}</h3>
                <p>Cantidad: {item.selectedQuantities.cantidad}</p>
                <p>Precio: ${Object.entries(item.pizzaInfo.precios).map(([clave,valor]) => (
                    <p key={clave}>{clave}: ${valor}</p>

            ))}</p>
                <p>Total: ${item.totalItemPrice.toFixed(2)}</p>
                <button onClick={() => onRemoveFromCart(item.pizzaInfo.id)}>Eliminar</button>
            </div>
        </div>
    );
}

export default CartItem;