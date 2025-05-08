// src/App.jsx
// Puedes empezar a limpiar los imports que no uses (useState, logos, App.css si quieres)

// *** Importamos nuestro componente PizzaList desde su nueva ubicación ***
// Asumiendo que está en src/components/menu/PizzaList.jsx
import PizzaList from './Components/menu/PizzaList';


function App() {
  // ... limpia aquí cualquier estado o código de ejemplo que no necesites ...

  return (
    <>
      {/* Encabezado principal */}
      <h1>Nuestro Menú de Pizzas</h1>

      {/* *** Usamos nuestro componente PizzaList aquí *** */}
      {/* Este componente se encargará de obtener los datos y renderizar todos los PizzaItems */}
      <PizzaList />
      {/* ************************************************************************** */}


      {/* Puedes comentar o eliminar el código de ejemplo de Vite/React que estaba aquí */}
      {/* ... código comentado ... */}

      {/* Aquí puedes añadir el Footer o la sección de Contacto después */}
    </>
  );
}

export default App;