// src/App.jsx
// Importamos useState desde React
import { useState } from 'react';

// *** Asegúrate de que las rutas y capitalización sean CORRECTAS según tu explorador de archivos ***
import PizzaList from './Components/menu/PizzaList'; // O tu ruta correcta
import appStyles from './App.module.css'; // o App.css
import Modal from './Components/common/Modal'; 

function App() {
  // Estado para controlar el modal y la pizza seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Booleano: true si modal abierto
  const [selectedPizza, setSelectedPizza] = useState(null); // Objeto: datos de la pizza seleccionada


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


  return (
    <> {/* Fragment */}
      {/* Contenedor principal centrado para el contenido del menú */}
      <div className={appStyles.container}>
        <h1>Nuestro Menú de Pizzas</h1>
        {/* Renderiza PizzaList una sola vez y pásale la función de click */}
        <PizzaList onPizzaClick={handlePizzaClick} />
        {/* *** Elimina la segunda instancia de <PizzaList /> si la tienes *** */}
        {/* <PizzaList />  <-- Elimina esta línea */}
        {/* ************************************************************* */}
      </div>

     
      {isModalOpen && (
        <Modal
          pizza={selectedPizza} // Pasamos los datos de la pizza seleccionada al Modal
          onClose={handleCloseModal} // Pasamos la función para que el Modal pueda cerrarse
        />
      )}

    </>
  );
}

export default App;