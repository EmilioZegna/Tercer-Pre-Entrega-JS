let productosAgregados = localStorage.getItem("productosAgregados");
productosAgregados = JSON.parse(productosAgregados)

const carritoVacio = document.querySelector("#carritoVacio");
const productosEnCarrito = document.querySelector("#productosCarrito");
const accionesCarrito = document.querySelector("#accionesCarrito");
const carritoCompra = document.querySelector("#carritoCompra");
let botonesEliminar = document.querySelectorAll(".eliminarProducto");
const botonVaciar = document.querySelector("#vaciarCarrito");
const totalCarrito = document.querySelector("#total");
const botonComprar = document.querySelector("#comprarCarrito");

function cargarProductosCarrito() {
    if (productosAgregados && productosAgregados.length > 0) {

        carritoVacio.classList.add("desabilitado");
        productosEnCarrito.classList.remove("desabilitado");
        accionesCarrito.classList.remove("desabilitado");
        carritoCompra.classList.add("desabilitado");
    
        productosEnCarrito.innerHTML = "";
    
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
    
        productosEnCarrito.append(div);
    
        })
        
    } else {
        carritoVacio.classList.remove("desabilitado");
        productosEnCarrito.classList.add("desabilitado");
        accionesCarrito.classList.add("desabilitado");
        carritoCompra.classList.add("desabilitado");
    }
    botonEliminarFuncionando();
    totalActualizado();
}

cargarProductosCarrito();

function botonEliminarFuncionando() {
    botonesEliminar = document.querySelectorAll(".eliminarProducto");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    });
}

function eliminarCarrito(e) {
    const botonId = e.currentTarget.id;    
    const index = productosAgregados.findIndex(producto => producto.id === botonId);
   
    productosAgregados.splice(index, 1);
    cargarProductosCarrito();

    console.log(cargarProductosCarrito);

    localStorage.setItem("productosAgregados", JSON.stringify(productosAgregados));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosAgregados.length = 0;
    localStorage.setItem("productosAgregados", JSON.stringify(productosAgregados));

    cargarProductosCarrito();
}

function totalActualizado() {
    const calcularTotal = productosAgregados.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${calcularTotal}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosAgregados.length = 0;
    localStorage.setItem("productosAgregados", JSON.stringify(productosAgregados));
    
    carritoVacio.classList.add("desabilitado");
    productosEnCarrito.classList.add("desabilitado");
    accionesCarrito.classList.add("desabilitado");
    carritoCompra.classList.remove("desabilitado");
    
}