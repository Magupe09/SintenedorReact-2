// src/Components/Auth/ForgotPassword.jsx
import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || "Revisa tu correo para continuar.");
    } catch (error) {
      console.error("Error enviando solicitud:", error);
      setMessage("Hubo un error. Intenta de nuevo.");
    }
  };

  return (
    <div>
      <h2>¿Olvidaste tu contraseña?</h2>

      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Enviar enlace</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

