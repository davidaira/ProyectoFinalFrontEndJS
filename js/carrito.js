// Seleccionamos los contenedores
const elegidosContainer = document.querySelector(".seccion-elegidos");
const elegidosTotal = document.querySelector(".elegidosTotal");

let carrito = sessionStorage.getItem('carrito');

// Llamamos a la API y procesamos los datos
fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    // Tomamos 8 productos con el método slice.
    const products = data.products.slice(0, 8);

    // Renderizamos los productos elegidos en carrito
    let elegidosHTML = "";
    let total = 0;
    if (carrito) {
      for (let i = 0; i < products.length; i++) {
        const prod = products[i];

        if (carrito.includes(prod.id)) {

          const count = contar(carrito, prod.id);

          const subtotal = count * prod.price;

          elegidosHTML += `
        <article class="producto">
          <h2>${prod.title}</h2>
          <img src="${prod.thumbnail}" class="img-producto" alt="${prod.title}">
          <h3>Precio individual: $${prod.price}</h3>
          <h3>Cantidad: ${count}</h3>
          <h3>Subtotal: $${subtotal}</h3>
        </article>
        `;

        total += subtotal;

        sessionStorage.setItem('total', JSON.stringify(total)); //se guarda el total n sesion para utilizar en carrito.html
        }
      }
    }
    else {
      elegidosHTML = `
          <h2>No hay productos en el carrito</h2>
          `;
    }

    elegidosContainer.innerHTML = elegidosHTML;


    // Activar eventos
    cargarEventosAgregar();
    actualizarContador();
    actualizarTotal();

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

// =====================================================
// FUNCIÓN PARA ACTUALIZAR EL TOTAL EN PANTALLA
// =====================================================

const precioTotal = document.getElementById('precioTotal');

function actualizarTotal() {
  const total = JSON.parse(sessionStorage.getItem('total'))
  precioTotal.textContent = `Total: $ ${total}`;
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
// FUNCIÓN PARA VACIAR EL CARRITO Y RESETEAR CONTADOR Y TOTAL
// ======================================================

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  sessionStorage.removeItem('carrito');
  sessionStorage.setItem('total',0);
  actualizarContador();
  actualizarTotal();
  alert('Carrito vaciado correctamente');
});

// ======================================================
// FUNCIÓN PARA CONTAR LAS VECES QUE APARECE UN PRODUCTO EN EL CARRITO
// ======================================================

function contar(string, caracter) {
  return string.split(caracter).length - 1;
}