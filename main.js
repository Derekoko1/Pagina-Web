function activarClasesVisibles(selector, claseActiva) {
    const elementos = document.querySelectorAll(selector);
    elementos.forEach((elemento) => {
        const rect = elemento.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            elemento.classList.add(claseActiva);
        }
    });
}

function manejarScroll() {
    activarClasesVisibles('.fade-in', 'active');
    activarClasesVisibles('.fade-in-scale', 'active');
}

window.addEventListener('scroll', manejarScroll);
manejarScroll();

const carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    const botonesCarrito = document.querySelectorAll('.btn-carrito');
    const mensajeCarrito = document.getElementById('mensaje-carrito');

    if (botonesCarrito) {
        botonesCarrito.forEach(boton => {
            boton.addEventListener('click', () => {
                const nombre = boton.dataset.nombre;
                const precio = parseFloat(boton.dataset.precio);

                const index = carrito.findIndex(item => item.nombre === nombre);

                if (index !== -1) {
                    carrito[index].cantidad += 1;
                } else {
                    carrito.push({ nombre, precio, cantidad: 1 });
                }

                if (mensajeCarrito) {
                    mostrarMensajeCarrito(mensajeCarrito, `${nombre} añadido al carrito.`);
                }
                guardarCarritoEnLocalStorage(carrito);
            });
        });
    }

    cargarCarrito();
});

function mostrarMensajeCarrito(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.classList.add('mostrar');

    setTimeout(() => {
        elemento.classList.remove('mostrar');
    }, 2000);
}

function guardarCarritoEnLocalStorage(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoItems = document.getElementById("carrito-items");
    const totalCarrito = document.getElementById("total-carrito");

    if (!carritoItems || !totalCarrito) return;

    carritoItems.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        carritoItems.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
            </tr>
        `;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const index = e.target.dataset.index;
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }
});

function inicializarAnimaciones() {
    manejarScroll();
}

document.addEventListener("DOMContentLoaded", inicializarAnimaciones);
