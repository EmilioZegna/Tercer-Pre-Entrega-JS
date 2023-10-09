let productos = [];

fetch("./JS/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesMenu = document.querySelectorAll(".botonesMenu");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".botonAgregar");

function cargarProductos(productosSeleccionados) {
    contenedorProductos.innerHTML = "";

    productosSeleccionados.forEach(producto => {
       
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="imagenProducto" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="detallesProducto">
            <h3 class="tituloProducto">${producto.titulo}</h3>
            <p class="precioProducto">$${producto.precio}</p>
            <button class="botonAgregar" id="${producto.id}">AGREGAR</button>
        </div>
        `;
        contenedorProductos.append(div);
    })

    botonAgregarFuncionando();
}

cargarProductos(productos);

botonesMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const categoriaProductos = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = categoriaProductos.categoria.nombre;
        
        botonesMenu.forEach(boton => boton.classList.remove("activo"));
        e.currentTarget.classList.add("activo");

        if (e.currentTarget.id != "todos") {
        const productosElegidos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosElegidos);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});

function botonAgregarFuncionando() {
    botonesAgregar = document.querySelectorAll(".botonAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    });
}

const productosAgregados = [];

function agregarCarrito() {
    const botonId = e.currentTarget.id;
    const productoAgregar = productos.find(producto => producto.id === botonId);

    if(productosAgregados.some(producto => producto.id === botonId)) {
        const index = productosAgregados.findIndex(producto => producto.id === botonId);
        productosAgregados[index].cantidad++;
    } else {
        productoAgregar.cantidad = 1;
        productosAgregados.push(productoAgregar);
    }

}
