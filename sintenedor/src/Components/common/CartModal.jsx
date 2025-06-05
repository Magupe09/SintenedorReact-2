import React from 'react'; // Solo necesitas React si no usas Hooks como useState aquí
import styles from './CartModal.module.css';
import CartItem from './CartItem';

const CartModal = ({ carrito, setCarrito, onClose, onRemoveFromCart, totalPrice }) => {
  let precio = totalPrice
  const handleUpdateCartItemQuantity = (pizzaId, size, type) => {
    console.log("handleUpdateCartItemQuantity llamado con:", { pizzaId, size, type });

    console.log("--- handleUpdateCartItemQuantity INICIO ---");
    console.log("Parámetros recibidos: pizzaId =", pizzaId, ", size =", size, ", type =", type);
    console.log("Estado actual del carrito (prevCarrito):", JSON.parse(JSON.stringify(carrito)));



    setCarrito(prevCarrito => {
      // 1. Encuentra el ítem de pizza específico en el carrito
      const updatedCarrito = prevCarrito.map(item => {
        if (item.pizzaInfo.id === pizzaId) {

          // Hemos encontrado el ítem de pizza que queremos actualizar
          console.log("  > Ítem encontrado para actualizar (antes de modificar):", JSON.parse(JSON.stringify(item)));
          console.log("  > selectedQuantities del ítem (antes de modificar):", JSON.parse(JSON.stringify(item.selectedQuantities)));
          console.log("  > Precios de la pizza (para referencia):", JSON.parse(JSON.stringify(item.pizzaInfo.precios)));





          const newSelectedQuantities = { ...item.selectedQuantities };
          let newTotalItemPrice = 0;
          console.log("Actualizando item con id:", item.pizzaInfo.id, "y tamaño:", size); 
          // 2. Aumenta o disminuye la cantidad para el tamaño específico
          if (type === 'increase') {
            newSelectedQuantities[size] = (newSelectedQuantities[size] || 0) + 1;
            console.log("  > Cantidad aumentada. newSelectedQuantities después de aumentar:", JSON.parse(JSON.stringify(newSelectedQuantities)));
          } else if (type === 'decrease') {
            newSelectedQuantities[size] = Math.max(0, (newSelectedQuantities[size] || 0) - 1); // Asegura que no baje de 0
            console.log("  > Cantidad disminuida. newSelectedQuantities después de disminuir:", JSON.parse(JSON.stringify(newSelectedQuantities)));
          }

          // 3. Recalcula el totalItemPrice para este ítem
          for (const clave in newSelectedQuantities) {
            console.log("Calculando precio para clave:", clave, "cantidad:", newSelectedQuantities[clave], "precio por unidad:", item.pizzaInfo.precios[clave]);
            if (typeof item.pizzaInfo.precios[clave] === 'undefined') {
              console.error("¡ERROR! Precio por unidad es undefined para el tamaño/clave:", clave, "en pizza:", item.pizzaInfo.nombre);
          }



            newTotalItemPrice += newSelectedQuantities[clave] * item.pizzaInfo.precios[clave];
            // Si la cantidad de un tamaño llega a 0, elimínalo de selectedQuantities
            if (newSelectedQuantities[clave] === 0) {
              delete newSelectedQuantities[clave];
              console.log("    >> Clave eliminada (cantidad 0):", clave);
            }
          }
          console.log("  > selectedQuantities FINAL para el ítem actualizado:", JSON.parse(JSON.stringify(newSelectedQuantities)));
          console.log("  > newTotalItemPrice para el ítem actualizado:", newTotalItemPrice.toFixed(2));

          // 4. Retorna el ítem actualizado con las nuevas cantidades y precio
          return {
            ...item,
            selectedQuantities: newSelectedQuantities,
            totalItemPrice: newTotalItemPrice
          };
        }
        return item; // Retorna el ítem sin cambios si no es el que buscamos
      });

      // 5. Filtra para eliminar ítems completamente vacíos
      // Un ítem está "vacío" si no tiene ninguna cantidad seleccionada
      const finalCarrito = updatedCarrito.filter(item =>
        Object.keys(item.selectedQuantities).length > 0
      );
      console.log("--- handleUpdateCartItemQuantity FIN - Nuevo estado final del carrito ---", JSON.parse(JSON.stringify(finalCarrito)));

      return finalCarrito;
    });
  };







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