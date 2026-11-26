// Función para limpiar la lista de productos y actualizar el total a $0.00
function limpiarListaProductos(){
    const productosLista = document.getElementById('products-list');
    productosLista.innerHTML = '<p class="products__empty">Tu carrito está vacío.</p>';
    const totalCompra = document.getElementById('total-amount');
    totalCompra.textContent = '$0.00';
    actualizarContadorCarrito();
}

// Mostrar el contenido del carrito en la interfaz
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    const carrito = obtenerCarrito();
    const totalCompra = document.getElementById('total-amount');
    let total = 0;
    if (carrito.length != 0){
        const productosLista = document.getElementById('products-list');
        productosLista.innerHTML = '';
        let html = '';
        carrito.forEach((producto) => {
            html += `
                <article class="products__item">
                    <img class="products__image" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="products__content">
                        <h3 class="products__name">${producto.titulo}</h3>
                        <p class="products__price">Precio: $${producto.precio}</p>
                        <p class="products__quantity">Cantidad: ${producto.cantidad}</p>
                    </div>
                </article>
            `;
            total += producto.precio * producto.cantidad;
        })
        productosLista.innerHTML = html;
    } else{
        document.getElementById('products-list').innerHTML = '<p class="products__empty">Tu carrito está vacío.</p>';
    };
    totalCompra.textContent = `$${total.toFixed(2)}`;
});

// Función para vaciar el carrito con confirmación
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
vaciarCarritoBtn.addEventListener('click', () => {
    // Si ya está vacío, solo avisa
    if (obtenerCarrito().length === 0) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'El carrito ya está vacío',
            showConfirmButton: false,
            timer: 1500,
        });
        return;
    }
    // Si tiene productos, pide confirmación
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: 'Se eliminarán todos los productos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            limpiarListaProductos();
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Carrito vaciado',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
});

const form = document.getElementById('form-container');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(obtenerCarrito().length === 0){
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'El carrito está vacío, debes agregar productos antes de finalizar la compra',
            showConfirmButton: false,
            timer: 1500,
        });
        return;
    }
    const nombre = document.getElementById('nombre').value;
    Swal.fire({
        title: '¿Finalizar compra?',
        text: 'Su pedido será enviado para prepararlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            limpiarListaProductos();
            form.reset();
            Swal.fire({
                title: '¡Gracias por tu compra, ' + nombre + '!',
                text: 'Tu pedido ha sido recibido y está en proceso de preparación.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            }).then(() => {
                window.location.href = "index.html";
            });
        }
    });
});