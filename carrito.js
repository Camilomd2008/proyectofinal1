// carrito.js

// Formatear precio a COP
function formatearPrecio(num) {
    return num.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
}

// Recuperar carrito del localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
const tbody = document.querySelector('#carrito-items tbody');
const totalDiv = document.getElementById('total');
const filtroInput = document.getElementById('filtro-productos');
const ordenarSelect = document.getElementById('ordenar-precio');
const clearCartBtn = document.getElementById('clear-cart');

// Actualizar contador en el header
function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if(contador) {
        const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.textContent = cantidad;
    }
}

// Mostrar carrito
function mostrarCarrito() {
    tbody.innerHTML = '';
    let total = 0;

    const filtro = filtroInput ? filtroInput.value.toLowerCase() : '';
    let productos = carrito.filter(p => p.nombre.toLowerCase().includes(filtro));

    // Ordenar por precio
    if(ordenarSelect) {
        if(ordenarSelect.value === 'asc') productos.sort((a,b) => a.precio - b.precio);
        if(ordenarSelect.value === 'desc') productos.sort((a,b) => b.precio - a.precio);
    }

    productos.forEach(p => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${p.imagen || 'https://via.placeholder.com/50'}" style="width:50px; height:50px; object-fit:cover; border-radius:8px; margin-right:10px;" />
                ${p.nombre}
            </td>
            <td>
                <input type="number" class="cantidad-input" data-nombre="${p.nombre}" value="${p.cantidad}" min="1" style="width:50px; text-align:center;" />
            </td>
            <td>${formatearPrecio(p.precio)}</td>
            <td>${formatearPrecio(subtotal)}</td>
            <td><button class="remove-item" data-nombre="${p.nombre}">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });

    totalDiv.textContent = `Total: ${formatearPrecio(total)}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Cambiar cantidad
tbody.addEventListener('input', e => {
    if(e.target.classList.contains('cantidad-input')) {
        const nombre = e.target.dataset.nombre;
        let nuevaCantidad = parseInt(e.target.value);
        if(isNaN(nuevaCantidad) || nuevaCantidad < 1) {
            nuevaCantidad = 1;
            e.target.value = 1;
        }
        const producto = carrito.find(p => p.nombre === nombre);
        if(producto) {
            producto.cantidad = nuevaCantidad;
            mostrarCarrito();
        }
    }
});

// Eliminar producto
tbody.addEventListener('click', e => {
    if(e.target.classList.contains('remove-item')) {
        const nombre = e.target.dataset.nombre;
        carrito = carrito.filter(p => p.nombre !== nombre);
        mostrarCarrito();
    }
});

// Limpiar carrito
if(clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        carrito = [];
        localStorage.removeItem('carrito');
        mostrarCarrito();
    });
}

// Filtrar y ordenar
if(filtroInput) filtroInput.addEventListener('input', mostrarCarrito);
if(ordenarSelect) ordenarSelect.addEventListener('change', mostrarCarrito);

// Inicializar
mostrarCarrito();


        // Confirmación de sugerencia
        const form = document.getElementById('sugerencias-form');
        const mensaje = document.getElementById('mensaje-confirmacion');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            mensaje.style.display = 'block';
            form.reset();
        });

        // ===== ACTUALIZAR CONTADOR DEL CARRITO =====
        function actualizarContadorCarrito() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            const contador = document.getElementById('contador-carrito');
            if (contador) contador.textContent = cantidad;
        }

        // Ejecutar al cargar la página
        document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);


        if (
    document.getElementById('chatbot-toggle') &&
    document.getElementById('chatbot-window') &&
    document.getElementById('close-chat') &&
    document.getElementById('user-input') &&
    document.getElementById('send-button') &&
    document.getElementById('clear-chat-button') &&
    document.getElementById('chat-messages')
) {

        // ==========================
        // --- CHATBOT AVANZADO V6 ---
        // ==========================
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatClose = document.getElementById('close-chat');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        const clearChatButton = document.getElementById('clear-chat-button');
        const chatMessages = document.getElementById('chat-messages');

        const productos = [
            {
                nombre: "Maleta de Jean",
                link: "productobolso.html",
                categoria: "accesorios",
                precio: "$29.000",
                caracteristicas: "Hecha de tela de jean reciclada, forrada con tela sintetica. Ideal para el día a día. Cómoda y duradera.",
                medidas: "40cm x 35cm"
            },
            {
                nombre: "Bolso de Jean",
                link: "productobolso.html",
                categoria: "accesorios",
                precio: "$35.000",
                caracteristicas: "Hecho de tela de jean reciclada. Ideal para el día a día. Cómodo y duradero.",
                medidas: "25cm x 30cm"
            },
            {
                nombre: "Trapo para Limpiar",
                link: "productotrapo.html",
                categoria: "hogar",
                precio: "$8.000",
                caracteristicas: "Elaborado con telas de algodón reutilizadas. Absorbe líquidos de manera eficiente. Ideal para la limpieza del hogar.",
                medidas: "24cm x 24cm"
            },
            {
                nombre: "Funda para Almohada",
                link: "productofunda.html",
                categoria: "hogar",
                precio: "$20.000",
                caracteristicas: "Fabricada con retazos de tela de distintos colores. Suave al tacto y fácil de lavar.",
                medidas: "43cm x 43cm"
            },
            {
                nombre: "Cama para Perro",
                link: "productocamaperro.html",
                categoria: "mascotas",
                precio: "$50.000",
                caracteristicas: "Rellena con fibras de ropa reciclada. Proporciona comodidad y calidez a tu mascota.",
                medidas: "40cm x 40cm"
            },
            {
                nombre: "Cama para Gato",
                link: "productocamagato.html",
                categoria: "mascotas",
                precio: "$45.000",
                caracteristicas: "Diseñada para el confort de los felinos. Materiales suaves y ecológicos.",
                medidas: "40cm x 40cm"
            },
            {
                nombre: "Pañoleta",
                link: "productopañoleta.html",
                categoria: "mascotas",
                precio: "$15.000",
                caracteristicas: "Perfecta para complementar el look de tu mascota. Hecha de tela de algodón reutilizada.",
                medidas: "39cm x 95cm"
            }
        ];

        function addMessage(msg, sender = "bot", isHtml = false) {
            const div = document.createElement('div');
            div.classList.add('message');
            div.classList.add(sender === "bot" ? "bot-message" : "user-message");
            if (isHtml) {
                div.innerHTML = msg;
            } else {
                div.textContent = msg;
            }
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Función para renderizar el menú de categorías con acordeones y animación
        function displayCategoryAccordion() {
            const categories = ['mascotas', 'hogar', 'accesorios'];
            let html = '<p>Puedes explorar nuestros productos por categoría:</p>';
            
            categories.forEach(category => {
                const categoryProducts = productos.filter(p => p.categoria === category);
                const categoryId = `category-${category}-${Date.now()}`;
                
                // Agregamos un contenedor para la animación de apertura
                html += `
                    <div class="product-accordion-item">
                        <button class="accordion-button" aria-expanded="false" aria-controls="${categoryId}">
                            ${category.charAt(0).toUpperCase() + category.slice(1)}
                            <span class="accordion-icon">▶</span>
                        </button>
                        <div id="${categoryId}" class="accordion-content">
                            <div class="category-content-container">
                                ${categoryProducts.map((p, index) => {
                                    const productId = `product-${p.nombre.replace(/\s/g, '-')}-${Date.now()}-${index}`;
                                    return `
                                        <div class="product-accordion-item-nested">
                                            <button class="accordion-button" aria-expanded="false" aria-controls="${productId}">
                                                ${p.nombre}
                                                <span class="accordion-icon">▶</span>
                                            </button>
                                            <div id="${productId}" class="accordion-content">
                                                <p><strong>Precio:</strong> ${p.precio}</p>
                                                <p><strong>Características:</strong> ${p.caracteristicas}</p>
                                                <p><strong>Medidas:</strong> ${p.medidas}</p>
                                                <button class="buy-button" onclick="window.location.href='${p.link}'">Ver y Comprar</button>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });
            addMessage(html, "bot", true);
            setupAccordionListeners();
        }

        // Función para configurar los listeners de los acordeones y la animación de apertura
        function setupAccordionListeners() {
            document.querySelectorAll('.accordion-button').forEach(button => {
                button.addEventListener('click', () => {
                    const content = document.getElementById(button.getAttribute('aria-controls'));
                    const isExpanded = button.getAttribute('aria-expanded') === 'true';

                    button.setAttribute('aria-expanded', !isExpanded);
                    content.classList.toggle('active');
                    
                    // Activa la animación del contenido interior para un efecto de "apertura"
                    const innerContent = content.querySelector('.category-content-container');
                    if (innerContent) {
                        innerContent.classList.toggle('active', !isExpanded);
                    }
                    
                    button.querySelector('.accordion-icon').textContent = isExpanded ? '▶' : '▼';
                });
            });
        }

        // Función para manejar las respuestas del bot
        function handleBotResponse(query) {
            const q = query.toLowerCase().trim();

            // Si el usuario escribe algo, muestra el mensaje de bienvenida y el menú
            if (q.length > 0) {
                const welcomeMessage = `
                    ¡Hola! Soy el asistente de Ecotextil. 🌱
                    <br><br>
                    ¿En qué puedo ayudarte?
                `;
                addMessage(welcomeMessage, "bot", true);
                displayCategoryAccordion();
                return;
            }
        }

        // Event Listeners
        chatbotToggle.addEventListener('click', () => {
            const isVisible = chatbotWindow.style.display === 'block';
            chatbotWindow.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                // Al abrir el chat, el contenedor de mensajes se vacía y no se muestra nada.
                chatMessages.innerHTML = '';
            }
        });

        chatClose.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });

        sendButton.addEventListener('click', () => {
            const text = userInput.value.trim();
            if (text === "") {
                return; // Evita enviar mensajes vacíos
            }
            addMessage(text, "user");
            chatMessages.innerHTML = ''; // Limpia el chat para la nueva respuesta
            handleBotResponse(text);
            userInput.value = '';
        });

        userInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') sendButton.click();
        });

        clearChatButton.addEventListener('click', () => {
            chatMessages.innerHTML = '';
        });

}
