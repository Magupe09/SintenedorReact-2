// src/App.jsx
// Importamos useState desde React
import React, { useEffect, useState } from 'react';
//import './index.css';

// *** Asegúrate de que las rutas y capitalización sean CORRECTAS según tu explorador de archivos ***
import PizzaList from './Components/menu/PizzaList'; // O tu ruta correcta
import appStyles from './App.module.css'; // o App.css
import Modal from './Components/common/Modal';
import CartModal from './Components/common/CartModal';
import Header from './Components/layout/header';
import ContactForm from './Components/layout/ContactForm';
import Footer from './Components/layout/footer';
import Nosotros from './Components/layout/Nosotros';
import LoginScreen from './Components/Auth/LoginScreen';
import { AuthProvider, useAuth  } from './Context/AuthContext';


function AppContent() {
  // Estado para controlar el modal y la pizza seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Booleano: true si modal abierto
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Booleano: true si CartModal abierto
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const { isAuthenticated, isLoading } = useAuth(); 


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
      const updatedCarrito = prevCarrito.filter(item => item.pizzaInfo.id !== pizzaIdToRemove);
      if (updatedCarrito.length === 0) {
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
      const newCarritoState = [...prevCarrito, newItem];
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

  // --- INICIO de la lógica para obtener productos (integrar esto) ---
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = 'http://localhost:3000/products';

    setLoading(true);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Productos obtenidos del backend:', data); // ¡Esta es la línea que buscamos en la consola!
        setProducts(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // --- FIN de la lógica para obtener productos ---

// *** LÓGICA DE RENDERIZADO CONDICIONAL ***
  // 1. Mostrar pantalla de carga mientras se verifica el token en localStorage.
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
        Cargando autenticación...
      </div>
    );
  }

  // 2. Si el usuario NO está autenticado, muestra solo la pantalla de login.
  if (!isAuthenticated) {
    return (
      <main>
        <section id="login-section" className={appStyles.container}>
          <LoginScreen />
        </section>
      </main>
    );
  }

  // 3. Si el usuario SÍ está autenticado, muestra todo el contenido de la aplicación.
  return (
    <>
      <Header
        onOpenCartModal={() => setIsCartModalOpen(true)}
        totalItemsInCart={totalItemsInCart}
      />
      <main>
        {/* Descomenta o añade de nuevo la sección del menú de pizzas */}
        <section id="menu" className={appStyles.container}>
          <h1>Menú de Pizzas</h1>
          <PizzaList onPizzaClick={handlePizzaClick} />
        </section>

        <section id="about" className={appStyles.aboutSection}>
          <Nosotros />
        </section>
        <section id="contact" className={appStyles.contactSection}>
          <ContactForm />
        </section>
      </main>

      {isCartModalOpen && (
        <CartModal
          carrito={carrito}
          setCarrito={setCarrito}
          onClose={handleCloseCartModal}
          onRemoveFromCart={handleRemoveFromCart}
          totalPrice={totalPrice}
        />
      )}
      {isModalOpen && (
        <Modal
          pizza={selectedPizza}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
      <Footer />
    </>
  );
}

// *** IMPORTANTE: EL NUEVO COMPONENTE 'App' SOLO ENVUELVE A 'AppContent' CON 'AuthProvider' ***
// Este es el componente que se exporta como 'App'.
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


export default App;