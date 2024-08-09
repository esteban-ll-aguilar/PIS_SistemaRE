import React, { useEffect } from 'react';

export const Chatbot = () => {
  useEffect(() => {
    // Configuración del chatbot
    window.embeddedChatbotConfig = {
      chatbotId: "ttMfKfuJ8miPli8HVTRjK",
      domain: "www.chatbase.co"
    };

    // Crear el script dinámicamente
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.chatbotId = "ttMfKfuJ8miPli8HVTRjK";
    script.domain = "www.chatbase.co";
    script.defer = true;

    // Agregar el script al final del body para asegurar que se cargue
    document.body.appendChild(script);

    // Limpieza: remover el script cuando el componente se desmonte
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Aquí puedes agregar cualquier contenido adicional si es necesario */}
    </div>
  );
};

export default Chatbot;
