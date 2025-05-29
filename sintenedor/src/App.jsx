// src/App.jsx
// Importamos useState desde React
import { useState } from 'react';
//import './index.css';

// *** Asegúrate de que las rutas y capitalización sean CORRECTAS según tu explorador de archivos ***
import PizzaList from './Components/menu/PizzaList'; // O tu ruta correcta
import appStyles from './App.module.css'; // o App.css
import Modal from './Components/common/Modal';
import CartModal from './Components/common/CartModal';

function App() {
  // Estado para controlar el modal y la pizza seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Booleano: true si modal abierto
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Booleano: true si CartModal abierto
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [carrito, setCarrito] = useState([]);

  console.log('App.jsx: isCartModalOpen vale:', isCartModalOpen);





  const handleRemoveFromCart = (pizzaIdToRemove) => {
    console.log("Eliminamos la ultima pizza")
    setCarrito(prevCarrito => {
      // Esto crea un nuevo array de carrito sin la pizza que tiene el id que queremos eliminar
      return prevCarrito.filter(item => item.pizzaInfo.id !== pizzaIdToRemove);
    });
  }

  const handleAddToCart = (newItem) => {
    console.log('handleAddToCart: Nuevo item recibido:', newItem);
    setCarrito(prevCarrito => {
      const existingItem = prevCarrito.findIndex(item => item.pizzaInfo.id === newItem.pizzaInfo.id);

      if (existingItem !== -1) {
        const updatedCarrito = [...prevCarrito];
        let updatedItem = { ...updatedCarrito[existingItem], selectedQuantities: { ...updatedCarrito[existingItem].selectedQuantities } };
        for (const [clave, valor] of Object.entries(newItem.selectedQuantities)) {
          updatedItem.selectedQuantities[clave] = (updatedItem.selectedQuantities[clave] || 0) + valor;

          updatedItem.totalItemPrice += valor * updatedItem.pizzaInfo.precios[clave];

        }


        updatedCarrito[existingItem] = updatedItem;
        return updatedCarrito;
      }
      return [...prevCarrito, newItem];
    });
  };

  // Función que se ejecuta al hacer clic en una pizza (actualiza estado para abrir modal)
  // Cambié el nombre del parámetro de 'pizzasData' a 'pizzaData' para mayor claridad
  const handlePizzaClick = (pizzaData) => {
    // *** ¡CORRECCIÓN CLAVE! Usa la función SET del estado ***
    setSelectedPizza(pizzaData); // Guarda los datos de LA pizza clicada en el estado
    // ***************************************************
    setIsModalOpen(true); // Abre el modal
    console.log("¡Pizza clicada!", pizzaData); // Puedes dejarlo temporalmente para depurar o quitarlo
  };

  // Función para cerrar el modal (actualiza estado para cerrar)
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedPizza(null); // Limpia la pizza seleccionada (opcional)
  };
  const handleCloseCartModal = () => {
    setIsCartModalOpen(false); // Cierra el modal
  };

  return (
    <> {/* Fragment */}
      {/* Contenedor principal centrado para el contenido del menú */
      }
      <button onClick={() => setIsCartModalOpen(true)}></button>
      <div className={appStyles.container}>
        <h1>Nuestro Menú de Pizzas</h1>
        {/* Renderiza PizzaList una sola vez y pásale la función de click */}
        <PizzaList onPizzaClick={handlePizzaClick} />
        {/* *** Elimina la segunda instancia de <PizzaList /> si la tienes *** */}
        {/* <PizzaList />  <-- Elimina esta línea */}
        {/* ************************************************************* */}
      </div>

      {isCartModalOpen && (
        <CartModal
          carrito={carrito} // Estado del carrito
          onClose={handleCloseCartModal}
         onRemoveFromCart={handleRemoveFromCart}
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