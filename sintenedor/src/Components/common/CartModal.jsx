import React from 'react';
import styles from './CartModal.module.css';
import CartItem from './CartItem';
import { useAuth } from '../../Context/AuthContext'; // Importar useAuth

const CartModal = ({ carrito, onClose, onRemoveFromCart, totalPrice, setCarrito }) => {
    const { user } = useAuth(); // Obtener el usuario del contexto

    // Función para enviar el pedido al backend
    const handleCheckout = async () => {
        // items está listo con el formato que el backend espera
        const items = carrito.map(item => ({
            pizzaId: item.pizzaId,
            quantity: item.quantity,
            size: item.size
        }));

        // El userId lo obtenemos del contexto de autenticación
        const userId = user.id;

        try {
            const response = await fetch('http://localhost:4000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, items }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el pedido.');
            }

            const data = await response.json();
            console.log('Pedido enviado con éxito:', data);
            alert('¡Pedido enviado con éxito! ID del pedido: ' + data.orderId);
            
            // Vaciar el carrito después de un pedido exitoso
            setCarrito([]);
            onClose();

        } catch (error) {
            console.error('Hubo un problema con el envío del pedido:', error);
            alert('No se pudo completar el pedido. Intente nuevamente.');
        }
    };

    return (
        <div className={styles['cart-modal']}>
            <button className={styles['boton-close']} onClick={onClose}>Cerrar</button>
            {carrito.length === 0 ? (
                <p className={styles['empty-cart-message']}>Tu carrito está vacío.</p>
            ) : (
                <div className={styles['cart-summary']}>
                    <h2>Tu Carrito de Pizza</h2>
                    <ul className={styles['cart-list']}>
                        {carrito.map((item, index) => (
                            <li className={styles['cart-item']} key={`${item.pizzaId}-${item.size}-${index}`}>
                                <CartItem
                                    item={item}
                                    onRemoveFromCart={onRemoveFromCart}
                                />
                            </li>
                        ))}
                    </ul>
                    <p>Total del Carrito: ${totalPrice.toFixed(2)}</p>
                    <button 
                        className={styles['checkout-button']}
                        onClick={handleCheckout}
                    >
                        Pagar
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartModal;















/*


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
        if (item.pizzaInfo.id === pizzaId) {
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
              newTotalItemPrice += currentQuantity * (pricePerUnit || 0); // Sumamos al precio total
            }
            // Si currentQuantity es 0, simplemente no lo añadimos a finalQuantities, así se "elimina"
          }
          return {
            ...item,
            selectedQuantities: finalQuantities, // Usamos las cantidades limpias
            totalItemPrice: newTotalItemPrice
          };
        }
        return item; // Si no es el ítem que buscamos, lo retornamos sin cambios
      });
      const finalCarrito = updatedCarrito.filter(item =>
        Object.keys(item.selectedQuantities).length > 0);
      if (finalCarrito.length === 0) {
        console.log("DEBUG - CartModal: Carrito vacío detectado. Llamando a onClose().");
        onClose()
      }

      return finalCarrito
    });

    // Por ahora, solo loguearemos. La lógica de actualización la haremos después.
  };
  // --------------------------------------------------------


  const phoneNumber = '573015347481'; // Ejemplo: para Colombia, 3001234567

  // Función para generar el enlace de WhatsApp con el mensaje del carrito
  const generateWhatsAppLink = () => {
    let message = "¡Hola! Me gustaría hacer un pedido desde tu web:\n\n";

    if (carrito && Object.keys(carrito).length > 0) {
      Object.values(carrito).forEach(item => {
        const pizzaName = item.pizzaInfo.nombre;
        message += `*${pizzaName}*:\n`; // Usamos * para negrita en WhatsApp
        for (const size in item.selectedQuantities) {
          // Capitaliza la primera letra del tamaño
          const formattedSize = size.charAt(0).toUpperCase() + size.slice(1);
          message += `- ${formattedSize}: ${item.selectedQuantities[size]} unidad(es)\n`;
        }
        message += `  Subtotal: *$${item.totalItemPrice.toFixed(3)}*\n\n`;
      });

      message += `*Total del pedido: $${totalPrice.toFixed(3)}*\n\n`;
      message += "¡Espero tu confirmación!";
    } else {
      message = "Hola, estoy interesado en tus pizzas. Actualmente mi carrito está vacío, pero me gustaría más información.";
    }

    // Codificar el mensaje para que sea seguro en una URL
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div className={styles['cart-modal']}>
     

      <button className={styles['boton-close']} onClick={onClose}>Cerrar</button>
      {carrito.length === 0 ? (
        <p className={styles['empty-cart-message']}>Tu carrito está vacío.</p>
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
          <a
            href={generateWhatsAppLink()}
            target="_blank" // Abre en una nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad al abrir nuevas pestañas
            className={styles['whatsapp-button']}
          >
            Pedir por WhatsApp
          </a>

          
          <button className={styles['checkout-button']} disabled>
            Ir a Pagar (No funcional aún)
          </button>
        </div>

      )
      }



    </div>
  );
};

export default CartModal;
*/