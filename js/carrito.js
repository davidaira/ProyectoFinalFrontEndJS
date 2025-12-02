// Seleccionamos los contenedores
const elegidosContainer = document.querySelector(".seccion-elegidos");

let carrito = sessionStorage.getItem('carrito')

// Llamamos a la API y procesamos los datos
fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    // Tomamos 8 productos con el método slice.
    const products = data.products.slice(0, 8);

    // Renderizamos los productos elegidos en carrito2
    console.log("Este es el carrito: " + carrito)
    let elegidosHTML = "";
    for (let i = 0; i < products.length; i++) {
        const prod = products[i];

        if(carrito.includes(prod.id)){

        elegidosHTML += `
        <article class="producto">
          <h2>${prod.title}</h2>
          <img src="${prod.thumbnail}" class="img-producto" alt="${prod.title}">
          <p>${prod.description.slice(0, 50)}</p>
          <h3>$${prod.price}</h3>
        </article>
        `;
        }
    }
    elegidosContainer.innerHTML = elegidosHTML;

    // Activar eventos
    cargarEventosAgregar();
    actualizarContador();

  })
  .catch(error => console.log("Error cargando la API:", error));

  // ===========================================
// FUNCIÓN PARA OBTENER EL CARRITO ACTUAL
// ===========================================

function obtenerCarrito() {
  return JSON.parse(sessionStorage.getItem('carrito')) || []; //probamos con session para que cargue el carrito en carrito.html
}

// ================================================
// FUNCIÓN PARA GUARDAR EL CARRITO EN STORAGE
// ================================================

function guardarCarrito(carrito) {
  sessionStorage.setItem('carrito', JSON.stringify(carrito)); //se guarda en sesion para utilizar en carrito.html
}

// =====================================================
// FUNCIÓN PARA ACTUALIZAR EL CONTADOR EN PANTALLA
// =====================================================

const contadorCarrito = document.getElementById('contador-carrito');

function actualizarContador() {
  const carrito = obtenerCarrito();
  contadorCarrito.textContent = `Productos en carrito: ${carrito.length}`;
}

// ============================================================
// FUNCIÓN PARA ACTIVAR EL EVENTO DE AÑADIR A TODOS LOS BOTONES
// ============================================================

function cargarEventosAgregar() {
  const botones = document.querySelectorAll('#seccion-productos button');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      agregarAlCarrito(boton.getAttribute('data-id'));
    });
  });
}

// ======================================================
// FUNCIÓN PARA VACIAR EL CARRITO Y RESETEAR CONTADOR
// ======================================================

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  sessionStorage.removeItem('carrito');
  actualizarContador();
  alert('Carrito vaciado correctamente');
});