document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pedidoForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const estado = document.getElementById("estado").value;
    const municipio = document.getElementById("municipio").value;
    const colonia = document.getElementById("colonia").value;
    const direccion = document.getElementById("direccion").value;

    // Obtener los datos del pedido desde sessionStorage
    const pedido = JSON.parse(sessionStorage.getItem("pedido")) || [];
    const pedidoLines = pedido.map(item => `- ${item}`);

    // Configurar los parámetros para EmailJS
    const templateParams = {
      nombre: nombre,
      correo: correo,
      estado: estado,
      municipio: municipio,
      colonia: colonia,
      direccion: direccion,
      pedidoLines: pedidoLines
    };

    emailjs.send('service_gapodll', 'template_kmt7yxo', templateParams, 'eNlwbg1TntZXdHYaM')
      .then(function () {
        window.location.href = "enviado.html";
      }, function (error) {
        alert("Hubo un error al enviar el pedido. Inténtalo de nuevo.");
        console.error("EmailJS Error:", error);
      });
  });
});
