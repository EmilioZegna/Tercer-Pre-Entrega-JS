const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesMenu = document.querySelectorAll(".botonesMenu")

function cargarProductos() {
    
    productos.forEach(producto => {
       
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="imagenProducto" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="detallesProducto">
            <h3 class="tituloProducto">${producto.titulo}</h3>
            <p class="precioProducto">$${producto.precio}</p>
            <button class="botonAgregar" id="${producto.id}">AGREGAR</button>
        </div>
        ` 
        contenedorProductos.append(div);
    })
}

cargarProductos();

botonesMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {
        e.currentTarget.classList.add("activo");
    })
})