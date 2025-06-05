export const pizzasData = {
    marinera: {
      id: 'pizza-id-marinera',
      nombre: "Marinera",
      imagen: "img/marinera.webp",
      ingredientes: ["Tomate", "Mozzarella", "Albahaca fresca"],
      precios: {
        personal: 10,
        mediana: 15,
        familiar: 20
      }
    },
    pepperoni: {
      id: 'pizza-id-pepperoni',
      nombre: "Pepperoni",
      imagen: "img/peperoni.webp",
      ingredientes: ["Tomate", "Mozzarella", "Pepperoni"],
      precios: {
        personal: 10,
        mediana: 15,
        familiar: 20
      }
    },
    quesos: {
      id: 'pizza-id-quesos',
      nombre: "Quesos",
      imagen: "img/cuatro-quesos.webp",
      ingredientes: ["Mozzarella", "Gorgonzola", "Parmesano", "Ricotta"],
      precios: {
        personal: 10,
        mediana: 15,
        familiar: 20
      }
    },
    barbacoa: {
      id: 'pizza-id-barbacoa',
      nombre: "Barbacoa",
      imagen: "img/barbacoa.webp",
      ingredientes: ["Tomate", "Mozzarella", "Carne de res", "Cebolla", "Salsa barbacoa"],
      precios: {
        personal: 10,
        mediana: 15,
        familiar: 20
      }
    },
    hawaiana: {
      id: 'pizza-id-hawaiana',
      nombre: "Hawaiana",
      imagen: "img/hawaina.webp",
      ingredientes: ["Tomate", "Mozzarella", "Jamón", "Piña"],
      precios: {
        personal: 10,
        mediana: 15,
        familiar: 20
      }
    },
    vegetariana: {
      id: 'pizza-id-vegetariana',
      nombre: "Vegetariana",
      imagen: "img/vegetariana.webp",
      ingredientes: ["Pimientos", "Champiñones", "Cebolla", "Aceitunas"],
      precios: {
        personal: 10,
        mediana: 15,
        familiar: 20
      }
    }
  };
  
  // Función auxiliar para convertir el objeto en array
  export const getPizzasArray = () => {
    return Object.values(pizzasData);
  }; 