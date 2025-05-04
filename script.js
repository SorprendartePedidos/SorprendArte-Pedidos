document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-pedido');

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Se abrirá tu cliente de correo para enviar el pedido a SorprendARTE.');

    // 1) Recoger datos del cliente
    const nombre    = form.nombre.value.trim();
    const correo    = form.correo.value.trim();
    const estado    = form.estado.value.trim();
    const municipio = form.municipio.value.trim();
    const colonia   = form.colonia.value.trim();
    const direccion = form.direccion.value.trim();

    if (!nombre || !correo || !estado || !municipio || !colonia || !direccion) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // 2) Recoger productos
    const items = window.pedidoItems || [];
    if (items.length === 0) {
      alert('No hay productos seleccionados.');
      return;
    }

    // 3) Construir mailto URL
    const subject = encodeURIComponent(`Nuevo pedido de ${nombre}`);
    let body = 
      `Cliente: ${nombre}\nCorreo: ${correo}\n\n` +
      `Dirección de entrega:\nEstado: ${estado}\nMunicipio: ${municipio}\nColonia: ${colonia}\nDirección: ${direccion}\n\n` +
      `Pedido:\n` +
      items.map(i => `- ${i}`).join('\n');

    const mailtoLink = `mailto:sorprendarte01@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;

    // 4) Crear y "clickear" un enlace <a>
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // 5) Redirigir a gracias.html pasado medio segundo
    setTimeout(() => {
      window.location.href = `gracias.html?nombre=${encodeURIComponent(nombre)}`;
    }, 500);
  });
});
