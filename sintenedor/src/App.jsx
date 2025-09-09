// src/App.jsx
// src/App.jsx
// Importamos useState desde React
import React, { useEffect, useState } from 'react';
//import './index.css';
// *** Asegúrate de que las rutas y capitalización sean CORRECTAS según tu explorador de archivos ***
import PizzaList from './Components/menu/PizzaList'; // O tu ruta correcta
import appStyles from './App.module.css'; // o App.css
import Modal from './Components/common/Modal';
import CartModal from './Components/common/CartModal';
import Header from './Components/layout/Header';
import ContactForm from './Components/layout/ContactForm';
import Footer from './Components/layout/footer';
import Nosotros from './Components/layout/Nosotros';
import LoginScreen from './Components/Auth/LoginScreen';
import { AuthProvider, useAuth  } from './Context/AuthContext';
import { getPizzasArray } from './data/pizzas'; 

// Este componente AppContent contendrá la lógica de renderizado condicional.
// Necesita estar DENTRO del <AuthProvider> para poder usar useAuth().
function AppContent() { 
  const [carrito, setCarrito] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [pizzas, setPizzas] = useState(getPizzasArray())

  const { isAuthenticated, isLoading, user } = useAuth(); 

  const totalPrice = carrito.reduce((sum, item) => sum + item.totalItemPrice, 0);
  const totalItemsInCart = carrito.length;
  //console.log(pizzas)
  const handlePizzaClick = (pizzaId) => {
    if (!Array.isArray(pizzas)) {
      console.error("Error: 'pizzas' no es un array. No se puede buscar la pizza.");
      //console.log(pizza)
      return; // Detener la ejecución de la función
    }
    const pizza = pizzas.find(p => p.id === pizzaId);
    setSelectedPizza(pizza);
    setIsModalOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPizza(null);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleAddToCart = (itemToAdd) => {
    setCarrito(prevCarrito => {
     
      const newCarrito = [...prevCarrito, itemToAdd];
    
      return newCarrito;
    });
  };

  const handleRemoveFromCart = (itemIdToRemove) => {
    setCarrito(prevCarrito => {
      const newCarrito = prevCarrito.filter(item => item.id !== itemIdToRemove);
      return newCarrito;
    });
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
        Cargando autenticación...
      </div>
    );
  }

  return (
    <>
      <Header
        onOpenCartModal={() => setIsCartModalOpen(true)}
        totalItemsInCart={totalItemsInCart}
        isAuthenticated={isAuthenticated} 
      />
      
      <main>
        {/* --- ESTA SECCIÓN SIEMPRE VISIBLE: EL MENÚ DE PIZZAS --- */}
        <section id="menu" className={appStyles.container}>
          <h1>Menú de Pizzas Las mejores</h1>
          <PizzaList pizzas={pizzas} onPizzaClick={handlePizzaClick} />
        </section>

        {/* --- LA PANTALLA DE LOGIN SOLO SI NO ESTÁ AUTENTICADO --- */}
        {!isAuthenticated && (
          <section id="login-section" className={appStyles.container}>
            <LoginScreen />
          </section>
        )}

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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;