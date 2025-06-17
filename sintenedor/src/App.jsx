// src/App.jsx
// Importamos useState desde React
import { useState } from 'react';
//import './index.css';

// *** Asegúrate de que las rutas y capitalización sean CORRECTAS según tu explorador de archivos ***
import PizzaList from './Components/menu/PizzaList'; // O tu ruta correcta
import appStyles from './App.module.css'; // o App.css
import Modal from './Components/common/Modal';
import CartModal from './Components/common/CartModal';
import Header from './Components/layout/header';

function App() {
  // Estado para controlar el modal y la pizza seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Booleano: true si modal abierto
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Booleano: true si CartModal abierto
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [carrito, setCarrito] = useState([]);


const totalPrice = (carrito) => {
    const suma = carrito.reduce((acumulador, valorActual) => {
      return acumulador + valorActual.totalItemPrice;
    }, 0);
    // Falta devolver la suma
    return suma
  }



  const handleRemoveFromCart = (pizzaIdToRemove) => {
    
    setCarrito(prevCarrito => {
      // Esto crea un nuevo array de carrito sin la pizza que tiene el id que queremos eliminar
      const updatedCarrito =prevCarrito.filter(item => item.pizzaInfo.id !== pizzaIdToRemove);
      if(updatedCarrito.length === 0){
        console.log("DEBUG - CartModal: Carrito vacío detectado. Llamando a onClose().");
        handleCloseCartModal()
      }
      return updatedCarrito
    });
    

  }

  const handleAddToCart = (newItem) => {
    console.log("DEBUG - App.jsx: newItem recibido de Modal:", JSON.parse(JSON.stringify(newItem)));
    setCarrito(prevCarrito => {
      const existingItem = prevCarrito.findIndex(item => item.pizzaInfo.id === newItem.pizzaInfo.id);

      if (existingItem !== -1) {
        const updatedCarrito = [...prevCarrito];
        let updatedItem = { ...updatedCarrito[existingItem], selectedQuantities: { ...updatedCarrito[existingItem].selectedQuantities } };


        console.log("DEBUG - App.jsx: Ítem EXISTENTE antes de fusionar cantidades:", JSON.parse(JSON.stringify(updatedItem)));
        for (const [clave, valor] of Object.entries(newItem.selectedQuantities)) {
          updatedItem.selectedQuantities[clave] = (updatedItem.selectedQuantities[clave] || 0) + valor;

          updatedItem.totalItemPrice += valor * updatedItem.pizzaInfo.precios[clave];

        }


        updatedCarrito[existingItem] = updatedItem;
        console.log("DEBUG - App.jsx: Carrito COMPLETO después de FUSIÓN (antes de setCarrito):", JSON.parse(JSON.stringify(updatedCarrito)));
        return updatedCarrito;
      }
      const newCarritoState =[...prevCarrito, newItem];
      console.log("DEBUG - App.jsx: Carrito COMPLETO con ítem NUEVO (antes de setCarrito):", JSON.parse(JSON.stringify(newCarritoState)));
      return newCarritoState
    });
  };
  

  const handlePizzaClick = (pizzaData) => {
    // *** ¡CORRECCIÓN CLAVE! Usa la función SET del estado ***
    setSelectedPizza(pizzaData); // Guarda los datos de LA pizza clicada en el estado
    // ***************************************************
    setIsModalOpen(true); // Abre el modal
    
  };

  // Función para cerrar el modal (actualiza estado para cerrar)
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedPizza(null); // Limpia la pizza seleccionada (opcional)
  };
  const handleCloseCartModal = () => {
    setIsCartModalOpen(false); // Cierra el modal
  };

  const totalItemsInCart = carrito.reduce((totalCount, item) => {
    // 'item' es cada objeto de pizza en tu carrito
    // 'item.selectedQuantities' es un objeto como { 'pequena': 1, 'grande': 2 }

    // Suma las cantidades de todos los tamaños para la pizza actual
    const quantitiesOfCurrentPizza = Object.values(item.selectedQuantities); // Obtiene un array de las cantidades [1, 2]
    const sumQuantities = quantitiesOfCurrentPizza.reduce((sum, qty) => sum + qty, 0); // Suma esas cantidades (1 + 2 = 3)

    return totalCount + sumQuantities; // Agrega la suma de esta pizza al total general
  }, 0); // Empieza el conteo desde 0

  return (
    <> 
        <Header
        onOpenCartModal={() => setIsCartModalOpen(true)} // Pasa la función para abrir el modal
        totalItemsInCart={totalItemsInCart} // Pasa el total de ítems para el contador
      />
      <div className={appStyles.container}>
      <button className={appStyles["cart-icon-button"]}  onClick={() => setIsCartModalOpen(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
      </button>
        <h1>Nuestro Menú de Pizzas</h1>
        {/* Renderiza PizzaList una sola vez y pásale la función de click */}
        <PizzaList onPizzaClick={handlePizzaClick} />
        {/* *** Elimina la segunda instancia de <PizzaList /> si la tienes *** */}
        {/* <PizzaList />  <-- Elimina esta línea */}
        {/* ************************************************************* */}
      </div>

      {isCartModalOpen && (
        <CartModal
          carrito={carrito} 
          setCarrito={setCarrito}// Estado del carrito
          onClose={handleCloseCartModal}
         onRemoveFromCart={handleRemoveFromCart}
         totalPrice={totalPrice(carrito)}
        />
      )}
      {isModalOpen && (
        <Modal
          pizza={selectedPizza} // Pasamos los datos de la pizza seleccionada al Modal
          onClose={handleCloseModal} // Pasamos la función para que el Modal pueda cerrarse
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )}

    </>
  );
}

export default App;