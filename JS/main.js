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
const numero = document.querySelector("#numero");

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
    boton.addEventListener("click", (e)  => {
        
        botonesMenu.forEach(boton => boton.classList.remove("activo"));
        e.currentTarget.classList.add("activo");

        if (e.currentTarget.id != "todos") {
        const categoriaProductos = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = categoriaProductos.categoria.nombre;
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

let productosAgregados;

let productosAgregadosLS = localStorage.getItem("productosAgregados");

if (productosAgregadosLS) {
    productosAgregados = JSON.parse(productosAgregadosLS);
    sumarProductos();
} else {
    productosAgregados = [];
}


function agregarCarrito(e) {
    Toastify({
        text: "PRODUCTO AGREGADO",
        duration: 3500,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "url(../assets/fondo.webp)",
        borderRadius: '2rem',
        fontSize: '0.75rem'
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function(){} 
      }).showToast();

    const botonId = e.currentTarget.id;
    const productoAgregar = productos.find(producto => producto.id === botonId);

    if(productosAgregados.some(producto => producto.id === botonId)) {
        const index = productosAgregados.findIndex(producto => producto.id === botonId);
        productosAgregados[index].cantidad++;
    } else {
        productoAgregar.cantidad = 1;
        productosAgregados.push(productoAgregar);
    }

    sumarProductos();

    localStorage.setItem("productosAgregados", JSON.stringify(productosAgregados));

}

function sumarProductos() {
    let nuevaCantidad = productosAgregados.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevaCantidad;
}
