// src/Components/common/Nosotros.jsx
import React from 'react';
import styles from './Nosotros.module.css';

const Nosotros = () => {
  return (
    <div className={styles['nosotros-container']}>
      <div className={styles['content-block']}>
        <h2>Somos Sintenedor: Auténtico Sabor Urbano</h2>
        <p>
          En el corazón de la ciudad, nació un sueño: ofrecer la pizza que siempre quisimos comer. En Sintenedor, no solo horneamos pizzas; creamos experiencias. Cada rebanada es una fusión de tradición y el pulso vibrante de Bogotá.
        </p>
        <p>
          Nuestra masa, fermentada con paciencia y amor, se encuentra con ingredientes frescos de productores locales. Creemos en la calidad sin rodeos, en el sabor que te transporta y en compartir momentos genuinos alrededor de una buena pizza.
        </p>
        <p className={styles['quote']}>
          "Aquí, cada pizza tiene su propia historia. ¡Y tú eres parte de ella!"
        </p>
      </div>

      {//<div className={styles['image-gallery']}>
        //<img src={teamPhoto} alt="Equipo de Sintenedor preparando pizzas" className={styles['nosotros-image']} />
       // <img src={ovenPhoto} alt="Horno de pizzas de Sintenedor en acción" className={styles['nosotros-image']} />
      //</div>
      }
    </div>
  );
};

export default Nosotros;