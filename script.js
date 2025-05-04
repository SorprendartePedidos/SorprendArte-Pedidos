document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-pedido');

  form.addEventListener('submit', e => {
    e.preventDefault();

    alert('Se abrirá tu cliente de correo para enviar el pedido a SorprendARTE.');

    // Datos del cliente
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

    // Recogemos los productos
    const items = window.pedidoItems || [];
    if (items.length === 0) {
      alert('No hay productos seleccionados.');
      return;
    }

    // Construimos asunto y cuerpo para mailto
    const subject = encodeURIComponent(`Nuevo pedido de ${nombre}`);
    let body = 
      `Cliente: ${nombre}\nCorreo: ${correo}\n\n` +
      `Dirección de entrega:\nEstado: ${estado}\nMunicipio: ${municipio}\nColonia: ${colonia}\nDirección: ${direccion}\n\n` +
      `Pedido:\n` +
      items.map(i => `- ${i}`).join('\n');

    // En vez de cambiar location.href abrimos en nueva ventana
    window.open(
      `mailto:sorprendarte01@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    // Ahora sí redirigimos a gracias.html
    setTimeout(() => {
      window.location.href = `gracias.html?nombre=${encodeURIComponent(nombre)}`;
    }, 500);
  });
});
