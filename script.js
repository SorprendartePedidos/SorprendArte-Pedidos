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

    // Productos (se guardaron antes en window.pedidoItems y están en URL)
    const params = new URLSearchParams(window.location.search);
    const items = window.pedidoItems || [];

    // Construir mailto
    const subject = encodeURIComponent(`Nuevo pedido de ${nombre}`);
    let body = 
      `Cliente: ${nombre}\nCorreo: ${correo}\n\n` +
      `Dirección de entrega:\nEstado: ${estado}\nMunicipio: ${municipio}\nColonia: ${colonia}\nDirección: ${direccion}\n\n` +
      `Pedido:\n` +
      items.map(i => `- ${i}`).join('\n');

    // Abrir cliente de correo
    window.location.href = 
      `mailto:sorprendarte01@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;

    // Redirigir a gracias.html, pasando nombre, correo y los productos
    setTimeout(() => {
      // conservamos los parámetros de producto
      const prodQuery = window.location.search.startsWith('?')
        ? window.location.search.substring(1)
        : window.location.search;
      const query = new URLSearchParams({
        nombre,
        correo
      });
      if (prodQuery) query.append(prodQuery);
      window.location.href = `gracias.html?${query.toString()}`;
    }, 500);
  });
});
