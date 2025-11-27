import React, { useState } from "react";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Error al actualizar contraseña.");
        return;
      }

      setMessage("Contraseña actualizada correctamente ✔️");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error en el servidor");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Restablecer Contraseña</h2>

      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          placeholder="Token recibido"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Cambiar Contraseña</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
