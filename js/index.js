document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarContadorCarrito();
    const productosContainer = document.getElementById('products-container');
    productosContainer.addEventListener("click", (e) => {
        const boton = e.target.closest(".card__button");
        if(boton){
            const id = parseInt(boton.dataset.id);
            agregarProducto(id);
        }
    });

    const finalizarCompra = document.querySelector(".header__contenedor-carrito");
    finalizarCompra.addEventListener("click", () => {
        window.location.href = "finalizar.html";
    });
});
