// Inicializa EmailJS con tu clave pública
emailjs.init('eNlwbg1TntZXdHYaM');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-pedido');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const municipio = document.getElementById('municipio').value.trim();
    const colonia = document.getElementById('colonia').value.trim();
    const direccion = document.getElementById('direccion').value.trim();

    // Validar campos obligatorios
    if (!nombre || !correo || !estado || !municipio || !colonia || !direccion) {
      alert('Por favor llena todos los campos.');
      return;
    }

    // Obtener los productos que el cliente pidió
    const pedidoItems = Array.from(document.querySelectorAll('.pedido-item')).map(item => item.textContent.trim());

    // Si no hay pedido, no continuamos
    if (pedidoItems.length === 0) {
      alert('No se ha seleccionado ningún producto.');
      return;
    }

    // Parametros para el template de EmailJS
    const templateParams = {
      nombre,
      correo,
      estado,
      municipio,
      colonia,
      direccion,
      pedidoLines: pedidoItems
    };

    // Enviar el correo
    emailjs.send('service_gapodll', 'template_kmt7yxo', templateParams)
      .then(function (response) {
        console.log('Correo enviado:', response.status, response.text);
        // Redirigir a página de agradecimiento con el nombre
        window.location.href = `gracias.html?nombre=${encodeURIComponent(nombre)}`;
      }, function (error) {
        console.error('Error al enviar:', error);
        alert('Hubo un error al enviar el pedido. Por favor, inténtalo más tarde.');
      });
  });
});
