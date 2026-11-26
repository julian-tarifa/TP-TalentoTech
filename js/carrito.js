// Obtener el carrito desde el almacenamiento local (si existe)
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado === null) {
        return [];
    }
    return JSON.parse(carritoGuardado);
}

// Guardar el carrito en el almacenamiento local
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Agregar un producto al carrito
function agregarProducto(id) {
    const carrito = obtenerCarrito();
    const producto = listaProductos.find(function (p) {
        return p.id === id;
    });
    const itemCarrito = carrito.find(function (item) {
        return item.id === id;
    })
    if(itemCarrito) {
        itemCarrito.cantidad++;
    }
    else {
        carrito.push({
            id: producto.id,
            titulo: producto.title,
            precio: producto.price,
            imagen: producto.image,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Agregaste: ' + producto.title + ' al carrito',
        showConfirmButton: false,
        timer: 1500,
    })
}

// Eliminar un producto del carrito
function eliminarProducto(id) {
    const carrito = obtenerCarrito();
    const carritoNuevo = carrito.filter(function (item) {
        return item.id !== id;
    });
    guardarCarrito(carritoNuevo);
}

// Vaciar el carrito
function vaciarCarrito() {
    guardarCarrito([]);
}

// Calcular el total del carrito
function calcularTotal(){
    const carrito = obtenerCarrito();
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + (carrito[i].precio * carrito[i].cantidad);
    }
    return total;
}

// Contar la cantidad total de productos en el carrito
function contarProductos() {
    const carrito = obtenerCarrito();
    let cantidadTotal = 0;
    for (let i = 0; i < carrito.length; i++) {
        cantidadTotal = cantidadTotal + carrito[i].cantidad;
    }
    return cantidadTotal;
}

// Actualizar el contador del carrito en la interfaz
function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    contador.textContent = contarProductos();
}