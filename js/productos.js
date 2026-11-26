const URL_API = 'https://fakestoreapi.com/products/category/electronics';
let listaProductos = [];

// Función para cargar los productos desde la API y mostrarlos en el contenedor
function cargarProductos() {
    fetch(URL_API)
        .then( (response) => {
            if(!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json()
        })
        .then( (productos) => {
            listaProductos = productos;
            mostrarProductos(productos);
        })
        .catch( (error) => {
            console.error('Error al cargar los productos:', error);
            document.getElementById('products-container').innerHTML = '<p>Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.</p>';
        });
}

function mostrarProductos(productos) {
    const productosContainer = document.getElementById('products-container');
    productosContainer.innerHTML = '';
    let html = '';
    productos.forEach((producto) => {
        html += `
            <article class="card">
                <img class="card__image" src="${producto.image}" alt="${producto.title}">
                <div class="card__content">
                    <h3 class="card__name">${producto.title}</h3>
                    <p class="card__description">${producto.description}</p>
                    <p class="card__price">Precio: $${producto.price}</p>
                    <button class="card__button" type="button" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </article>
        `;
    })
    productosContainer.innerHTML = html;
}