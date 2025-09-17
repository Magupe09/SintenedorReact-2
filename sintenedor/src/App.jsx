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
//import { getPizzasArray } from './data/pizzas'; 

// Este componente AppContent contendrá la lógica de renderizado condicional.
// Necesita estar DENTRO del <AuthProvider> para poder usar useAuth().
function AppContent() { 
  const [carrito, setCarrito] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [pizzas, setPizzas] = useState([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = useState(true);
  const { isAuthenticated, isLoading: isLoadingAuth, user } = useAuth(); 

  const totalPrice = carrito.reduce((sum, item) => sum + item.totalItemPrice, 0);
  const totalItemsInCart = carrito.length;
  //console.log(pizzas)
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de las pizzas.');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error al obtener las pizzas:", error);
      } finally {
        setIsLoadingPizzas(false);
      }
    };
    fetchPizzas();
  }, []);



  const handlePizzaClick = (pizzaId) => {
    console.log("El ID recibido es:", pizzaId); 
    if (!Array.isArray(pizzas)) {
      console.error("Error: 'pizzas' no es un array. No se puede buscar la pizza.");
      return;
    }
    console.log("El array de pizzas es:", pizzas); 




    // El id del producto en la base de datos es 'pizza_id'
    const pizza = pizzas.find(p => p.pizza_id === pizzaId);
    console.log("La pizza encontrada es:", pizza);
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

 // 4. Cambiamos la lógica del isLoading para que combine ambos estados
 if (isLoadingAuth || isLoadingPizzas) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
      Cargando...
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