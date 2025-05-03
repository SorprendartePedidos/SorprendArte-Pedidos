// Inicializa EmailJS con tu Public Key
emailjs.init('eNlwbg1TntZXdHYaM');

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('pedido-form');
  const resumenDiv = document.getElementById('resumenPedido');

  // Tomar cantidades de la URL y mostrarlas
  const params = new URLSearchParams(window.location.search);
  const tipos = {
    uva: 'Jabón con Aroma a Uva',
    durazno: 'Jabón con Aroma a Durazno',
    mandarina: 'Jabón con Aroma a Mandarina',
    sandia: 'Jabón con Aroma a Sandía',
    neutro: 'Jabón 0% Aroma, 0% Color',
    carbon: 'Jabón de Carbón Activado'
  };

  let resumenHTML = '';
  for (let key in tipos) {
    const qty = parseInt(params.get(key)) || 0;
    if (qty > 0) {
      resumenHTML += `<p><strong>${tipos[key]}:</strong> ${qty}</p>`;
    }
  }
  if (!resumenHTML) {
    resumenHTML = '<p><em>No seleccionaste ningún producto.</em></p>';
  }
  resumenDiv.innerHTML = resumenHTML;

  // Al enviar el formulario, envía el correo y redirige
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Construir array de líneas de pedido
    const pedidoLines = [];
    for (let key in tipos) {
      const qty = parseInt(params.get(key)) || 0;
      if (qty > 0) {
        pedidoLines.push(`${qty} x ${tipos[key]}`);
      }
    }

    // Preparar datos para EmailJS
    const datos = {
      nombre: form.nombre.value,
      correo: form.email.value,
      estado: form.estado.value,
      municipio: form.municipio.value,
      colonia: form.colonia.value,
      direccion: form.direccion.value,
      pedidoLines: pedidoLines
    };

    // Enviar correo
    emailjs.send('service_gapodll', 'template_kmt7yxo', datos)
      .then(function () {
        // Redirigir a la página de resumen con nombre y pedido en query string
        const query = new URLSearchParams({
          nombre: datos.nombre,
          pedido: pedidoLines.join('\n')
        }).toString();
        window.location.href = 'resumen.html?' + query;
      }, function (err) {
        console.error('EmailJS error:', err);
        alert('Hubo un error al enviar el pedido. Intenta de nuevo.');
      });
  });
});
