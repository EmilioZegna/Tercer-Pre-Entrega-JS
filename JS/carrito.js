const productosAgregados = JSON.parse(localStorage.getItem("productosAgregados"));

const carritoVacio = document.querySelector("#carritoVacio");
const productosCarrito = document.querySelector("#productosCarrito");
const accionesCarrito = document.querySelector("#accionesCarrito");
const carritoCompra = document.querySelector("#carritoCompra");

if (productosAgregados) {
    carritoVacio.classList.add("desabilitado");
    productosCarrito.classList.remove("desabilitado");
    accionesCarrito.classList.remove("desabilitado");
    carritoCompra.classList.add("desabilitado");

    productosCarrito.innerHTML = "";

    productosAgregados.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("productoCarrito");
    div.innerHTML = `
    <img class="imagenCarrito" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="tituloProductoCarrito">
        <small>Titulo</small>
        <h3>${producto.titulo}</h3>
    </div>
    <div class="cantidadProducto">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
    </div>
    <div class="precioProductoCarrito">
        <small>Precio</small>
        <p>$${producto.precio}</p>
    </div>
    <div class="subtotalCarrito">
        <small>Subtotal</small>
        <p>$${producto.precio * producto.cantidad}</p>
    </div>
<button class="eliminarProducto" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
    `;

    productosCarrito.append(div);

    })
    
} else {

}