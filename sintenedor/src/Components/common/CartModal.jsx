import React from 'react'; // Solo necesitas React si no usas Hooks como useState aquí
import styles from './CartModal.module.css';
import CartItem from './CartItem';

const CartModal = ({ carrito, setCarrito, onClose, onRemoveFromCart, totalPrice }) => {
  let precio = totalPrice
  
  
  
  const handleUpdateCartItemQuantity = (pizzaId, size, type) => {
    console.log("DEBUG - handleUpdateCartItemQuantity: Parámetros recibidos:");
    console.log("  pizzaId:", pizzaId); // Esperamos el ID único de la pizza (ej. 'pizza-id-marinera')
    console.log("  size:", size);       // Esperamos el tamaño (ej. 'personal', 'mediana')
    console.log("  type:", type);       // Esperamos el tipo de operación ('increase' o 'decrease')


    setCarrito(prevCarrito => {
      const updatedCarrito = prevCarrito.map(item => {
        if (item.pizzaInfo.id === pizzaId){
          const newSelectedQuantities = { ...item.selectedQuantities };
          let newTotalItemPrice = 0;

          if (type === 'increase') {
            newSelectedQuantities[size] = (newSelectedQuantities[size] || 0) + 1;
          } else if (type === 'decrease') {
            newSelectedQuantities[size] = Math.max(0, (newSelectedQuantities[size] || 0) - 1);
          }

          const finalQuantities = {}; 
          for (const clave in newSelectedQuantities) {
            const currentQuantity = newSelectedQuantities[clave];
            const pricePerUnit = item.pizzaInfo.precios[clave]; // Ahora 'clave' es un tamaño válido

            if (currentQuantity > 0) { // Solo si la cantidad es mayor a 0
              finalQuantities[clave] = currentQuantity; // Mantenemos esta cantidad
              newTotalItemPrice += currentQuantity * pricePerUnit; // Sumamos al precio total
            }
            // Si currentQuantity es 0, simplemente no lo añadimos a finalQuantities, así se "elimina"
          }
          return {
            ...item,
            selectedQuantities: finalQuantities, // Usamos las cantidades limpias
            totalItemPrice: newTotalItemPrice
          };
        }
      })
    })
    // Por ahora, solo loguearemos. La lógica de actualización la haremos después.
  };
  // --------------------------------------------------------






  




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
                {console.log("CartItem props (item):", item)}
                <CartItem
                  item={item}

                  onIncreaseItemQuantity={(size) => handleUpdateCartItemQuantity(item.pizzaInfo.id, size, 'increase')}
                  onDecreaseItemQuantity={(size) => handleUpdateCartItemQuantity(item.pizzaInfo.id, size, 'decrease')}
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