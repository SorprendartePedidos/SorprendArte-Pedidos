document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('pedido-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const pedidoFinal = [];
    const jabones = ['uva', 'durazno', 'mandarina', 'sandia', 'neutro', 'carbon'];
    const nombres = {
      uva: 'Jabón con Aroma a Uva',
      durazno: 'Jabón con Aroma a Durazno',
      mandarina: 'Jabón con Aroma a Mandarina',
      sandia: 'Jabón con Aroma a Sandía',
      neutro: 'Jabón 0% Aroma, 0% Color',
      carbon: 'Jabón de Carbón Activado'
    };

    jabones.forEach(jabon => {
      const cantidad = form[jabon].value;
      if (cantidad && parseInt(cantidad) > 0) {
        pedidoFinal.push(`${cantidad} x ${nombres[jabon]}`);
      }
    });

    const datos = {
      nombre: form.nombre.value,
      correo: form.email.value,
      estado: form.estado.value,
      municipio: form.municipio.value,
      colonia: form.colonia.value,
      direccion: form.direccion.value,
      pedidoLines: pedidoFinal
    };

    emailjs.send('service_gapodll', 'template_kmt7yxo', datos, 'eNlwbg1TntZXdHYaM')
      .then(function () {
        window.location.href = 'resumen.html?nombre=' + encodeURIComponent(datos.nombre);
      }, function (error) {
        alert('Hubo un error al enviar el pedido. Intenta de nuevo.');
        console.error('EmailJS error:', error);
      });
  });
});
