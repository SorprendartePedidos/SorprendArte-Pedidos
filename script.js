document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-pedido');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Aviso al cliente
    alert('Se abrirá tu cliente de correo para enviar el pedido a SorprendARTE.');

    // Recoger datos del cliente
    const nombre    = form.nombre.value.trim();
    const correo    = form.correo.value.trim();
    const estado    = form.estado.value.trim();
    const municipio = form.municipio.value.trim();
    const colonia   = form.colonia.value.trim();
    const direccion = form.direccion.value.trim();

    // Validación
    if (!nombre || !correo || !estado || !municipio || !colonia || !direccion) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Recoger los items del pedido
    const items = window.pedidoItems || [];
    if (items.length === 0) {
      alert('No hay productos seleccionados.');
      return;
    }

    // Construir asunto y cuerpo para mailto:
    const subject = encodeURIComponent(`Nuevo pedido de ${nombre}`);
    let body = `Cliente: ${nombre}\nCorreo: ${correo}\n\n` +
               `Dirección de entrega:\n` +
               `Estado: ${estado}\n` +
               `Municipio: ${municipio}\n` +
               `Colonia: ${colonia}\n` +
               `Dirección: ${direccion}\n\n` +
               `Pedido:\n` +
               items.map(i => `- ${i}`).join('\n');

    // Abrir cliente de correo
    window.location.href = `mailto:sorprendarte01@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;

    // Redirigir al cliente a gracias.html con su nombre
    setTimeout(() => {
      window.location.href = `gracias.html?nombre=${encodeURIComponent(nombre)}`;
    }, 500);
  });
});
