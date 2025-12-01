// Seleccionamos los contenedores
const productsContainer = document.querySelector(".seccion-productos");
const commentsContainer = document.querySelector(".seccion-reseñas");

// Llamamos a la API y procesamos los datos
fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    // Tomamos 6 productos con el método slice.
    const products = data.products.slice(0, 8);

    // Renderizamos los productos
    let productsHTML = "";
    for (let i = 0; i < products.length; i++) {
      const prod = products[i];

      productsHTML += `
        <article class="producto">
          <h2>${prod.title}</h2>
          <img src="${prod.thumbnail}" class="img-producto" alt="${prod.title}">
          <p>${prod.description.slice(0, 50)}</p>
          <h3>$${prod.price}</h3>
          <div><button data-id="${prod.id}" class="compra">añadir al carrito</button></div>
        </article>
      `;
    }
    productsContainer.innerHTML = productsHTML;

    // Activar eventos
    cargarEventosAgregar();
    actualizarContador();

    // Tomamos reseñas
    let reviews = [];
    for (let i = 0; i < products.length; i++) {
      const prod = products[i];

      if (prod.reviews) {
        reviews = reviews.concat(prod.reviews);
      }
    }

    // Limitamos a 5 reseñas
    reviews = reviews.slice(0, 5);

    // Renderizamos las reseñas
    let reviewsHTML = "";
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];

      reviewsHTML += `
        <div class="reseña">
          <h4>${review.reviewerName}</h4>
          <p>${review.comment}</p>
          <h5>Fecha: ${new Date(review.date).toLocaleDateString()}</h5>
        </div>
      `;
    }
    commentsContainer.innerHTML = reviewsHTML;

    

  })
  .catch(error => console.log("Error cargando la API:", error));

// ===========================================
// FUNCIÓN PARA OBTENER EL CARRITO ACTUAL
// ===========================================

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

// ================================================
// FUNCIÓN PARA GUARDAR EL CARRITO EN STORAGE
// ================================================

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// ==========================================
// FUNCIÓN PARA AGREGAR PRODUCTO AL CARRITO
// ==========================================

function agregarAlCarrito(id) {
  let carrito = obtenerCarrito();
  carrito.push(id); // Podrías guardar el objeto completo si quisieras
  guardarCarrito(carrito);
  actualizarContador();
  alert('Producto agregado al carrito');
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
  localStorage.removeItem('carrito');
  actualizarContador();
  alert('Carrito vaciado correctamente');
});