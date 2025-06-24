// src/Components/common/ContactForm.jsx
import React, { useState } from 'react';
import styles from './ContactForm.module.css'; // Asegúrate de crear este archivo CSS
import { db } from '../../firebase/config'; // ¡Importa la instancia de Firestore!
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Importa las funciones necesarias


const ContactForm = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Estado para los mensajes de retroalimentación
  const [statusMessage, setStatusMessage] = useState('');
  const [isSending, setIsSending] = useState(false); // Para el estado de carga

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validaciones básicas
  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatusMessage('Por favor, ingresa tu nombre.');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatusMessage('Por favor, ingresa un correo electrónico válido.');
      return false;
    }
    if (!formData.message.trim()) {
      setStatusMessage('Por favor, ingresa tu mensaje.');
      return false;
    }
    return true;
  };

  // Maneja el envío del formulario (la lógica de Firebase irá aquí)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSending(true);

    try {
      // 1. Obtén una referencia a la colección 'contactMessages'
      const docRef = await addDoc(collection(db, "contactMessages"), {
        // 2. Prepara los datos a guardar
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(), // Esto añade la fecha y hora del servidor
      });

      console.log("Documento escrito con ID: ", docRef.id);
      setStatusMessage('¡Mensaje enviado con éxito! Te responderemos pronto.');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Limpiar formulario

    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setStatusMessage('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo. ' + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles['contact-container']}>
      <div className={styles['contact-info']}>
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna pregunta, sugerencia o quieres hacer un pedido especial? ¡No dudes en contactarnos!</p>

        <div className={styles['info-item']}>
          <h3><i className="fas fa-map-marker-alt"></i> Dirección</h3>
          <p>Bogota suba av cali con 139</p>
        </div>
        <div className={styles['info-item']}>
          <h3><i className="fas fa-phone-alt"></i> Teléfono</h3>
          <p>(+57) 3015347481</p>
        </div>
        <div className={styles['info-item']}>
          <h3><i className="fas fa-envelope"></i> Email</h3>
          <p>sintenedor.com</p>
        </div>
        <div className={styles['info-item']}>
          <h3><i className="fas fa-clock"></i> Horarios</h3>
          <p>Lunes - Viernes: 11:00 AM - 10:00 PM</p>
          <p>Sábados - Domingos: 12:00 PM - 11:00 PM</p>
        </div>

        
      </div>

      <form className={styles['contact-form']} onSubmit={handleSubmit}>
        <h3>Envíanos un Mensaje</h3>
        {statusMessage && (
          <p className={statusMessage.includes('éxito') ? styles.success : styles.error}>
            {statusMessage}
          </p>
        )}
        <div className={styles['form-group']}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSending}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSending}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="subject">Asunto (Opcional):</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSending}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSending}
          ></textarea>
        </div>
        <button type="submit" disabled={isSending}>
          {isSending ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
      {/* Placeholder para el mapa */}
      <div className={styles['map-placeholder']}>
          {/* Aquí podrías integrar un mapa de Google Maps, Leaflet, etc. */}
          <p>Mapa de ubicación</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.60233488421!2d-74.06786012500001!3d4.675000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a74421d0a51%3A0xf63a7f8b9e6c9c61!2sPlaza%20de%20Bol%C3%ADvar!5e0!3m2!1ses!2sco!4v1719131644754!5m2!1ses!2ses"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de nuestra pizzería"
          ></iframe>
        </div>
    </div>
  );
};

export default ContactForm;