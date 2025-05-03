function sendEmail() {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const estado = document.getElementById('estado').value;
  const municipio = document.getElementById('municipio').value;
  const colonia = document.getElementById('colonia').value;
  const direccion = document.getElementById('direccion').value;
  const pedido = document.getElementById('pedidoResumen').innerText.trim().split('\n');

  emailjs.send("service_gapodll", "template_kmt7yxo", {
    nombre,
    correo,
    estado,
    municipio,
    colonia,
    direccion,
    pedidoLines: pedido
  }, "eNlwbg1TntZXdHYaM")
  .then(function(response) {
    console.log('Correo enviado con éxito', response.status, response.text);
    window.location.href = `gracias.html?nombre=${encodeURIComponent(nombre)}`;
  }, function(error) {
    console.log('Error al enviar el correo:', error);
    alert("Hubo un error al enviar el pedido. Intenta nuevamente.");
  });

  return false;
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pedidoResumen = document.getElementById('pedidoResumen');

  const items = ['uva', 'durazno', 'mandarina', 'sandia', 'neutro', 'carbon'];
  const nombres = {
    uva: "Jabón con aroma a Uva",
    durazno: "Jabón con aroma a Durazno",
    mandarina: "Jabón con aroma a Mandarina",
    sandia: "Jabón con aroma a Sandía",
    neutro: "Jabón 0% Aroma y Color",
    carbon: "Jabón de Carbón Activado"
  };

  items.forEach(item => {
    const cantidad = parseInt(urlParams.get(item));
    if (!isNaN(cantidad) && cantidad > 0) {
      const p = document.createElement('p');
      p.textContent = `– ${cantidad} ${nombres[item]}`;
      pedidoResumen.appendChild(p);
    }
  });
};
