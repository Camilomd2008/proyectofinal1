
  function cambiarImagen(img) {
    document.getElementById('imagen-principal').src = img.src;
  }

  function agregarAlCarrito() {
    const nombre = document.querySelector('.info h2').textContent.trim();
    const precioTexto = document.querySelector('.precio').textContent.replace(/[^\d]/g, '');
    const precio = parseInt(precioTexto, 10) || 0;
    const cantidad = 1;
    const imagen = document.getElementById('imagen-principal').src;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.nombre === nombre);

    if (index > -1) {
      carrito[index].cantidad += cantidad;
    } else {
      carrito.push({ nombre, precio, cantidad, imagen });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar contador total
    let total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    localStorage.setItem('carritoCantidad', total);
    document.getElementById('contador-carrito').textContent = total;

    document.getElementById('mensaje-ok').style.display = 'block';
    setTimeout(() => {
      document.getElementById('mensaje-ok').style.display = 'none';
    }, 1500);
  }

  function actualizarContadorCarrito() {
    const cantidad = localStorage.getItem('carritoCantidad') || '0';
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.textContent = cantidad;
  }

  actualizarContadorCarrito();

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
      link: "productomaleta.html",
      categoria: "accesorios",
      precio: "$29.000",
      caracteristicas: "Hecha de tela de jean reciclada, forrada con tela sintética. Ideal para el día a día. Cómoda y duradera.",
      medidas: "40cm x 35cm",
      imagen: "img/WhatsApp Image 2025-09-11 at 1.32.17 PM.jpeg"
    },
    {
      nombre: "Bolso de Jean",
      link: "productobolso.html",
      categoria: "accesorios",
      precio: "$22.000",
      caracteristicas: "Hecho de tela de jean reciclada. Ideal para el día a día. Cómodo y duradero.",
      medidas: "25cm x 30cm",
      imagen: "img/bolsojean.jpg"
    },
    {
      nombre: "Trapo para Limpiar",
      link: "productotrapo.html",
      categoria: "hogar",
      precio: "$6.000",
      caracteristicas: "Elaborado con telas de algodón reutilizadas. Absorbe líquidos de manera eficiente. Ideal para la limpieza del hogar.",
      medidas: "24cm x 24cm",
      imagen: "img/WhatsApp Image 2025-06-06 at 1.17.37 PM (2).jpeg"
    },
    {
      nombre: "Funda para Almohada",
      link: "productofunda.html",
      categoria: "hogar",
      precio: "$8.000",
      caracteristicas: "Fabricada con retazos de tela de distintos colores. Suave al tacto y fácil de lavar.",
      medidas: "43cm x 43cm",
      imagen: "img/WhatsApp Image 2025-08-29 at 1.40.49 PM.jpeg"
    },
    {
      nombre: "Cama para Perro",
      link: "productocamaperro.html",
      categoria: "mascotas",
      precio: "$30.000",
      caracteristicas: "Rellena con fibras de ropa reciclada. Proporciona comodidad y calidez a tu mascota.",
      medidas: "40cm x 40cm",
      imagen: "img/WhatsApp Image 2025-06-05 at 11.37.26 PM.jpeg"
    },
    {
      nombre: "Cama para Gato",
      link: "productocamagato.html",
      categoria: "mascotas",
      precio: "$30.000",
      caracteristicas: "Diseñada para el confort de los felinos. Materiales suaves y ecológicos.",
      medidas: "40cm x 40cm",
      imagen: "img/WhatsApp Image 2025-06-05 at 11.37.26 PM.jpeg"
    },
    {
      nombre: "Pañoleta",
      link: "productopañoleta.html",
      categoria: "mascotas",
      precio: "$8.000",
      caracteristicas: "Perfecta para complementar el look de tu mascota. Hecha de tela de algodón reutilizada.",
      medidas: "39cm x 95cm",
      imagen: "img/pañoleta.jpg"
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

  // Renderizar categorías con acordeones e imágenes
  function displayCategoryAccordion() {
    const categories = ['mascotas', 'hogar', 'accesorios'];
    let html = '<p>Puedes explorar nuestros productos por categoría:</p>';
    
    categories.forEach(category => {
      const categoryProducts = productos.filter(p => p.categoria === category);
      const categoryId = `category-${category}-${Date.now()}`;
      
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
                      <img src="${p.imagen}" alt="${p.nombre}" style="max-width:120px; border-radius:8px; margin-bottom:8px;">
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

  function setupAccordionListeners() {
    document.querySelectorAll('.accordion-button').forEach(button => {
      button.addEventListener('click', () => {
        const content = document.getElementById(button.getAttribute('aria-controls'));
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('active');

        const innerContent = content.querySelector('.category-content-container');
        if (innerContent) {
          innerContent.classList.toggle('active', !isExpanded);
        }
        
        button.querySelector('.accordion-icon').textContent = isExpanded ? '▶' : '▼';
      });
    });
  }

  function handleBotResponse(query) {
    const q = query.toLowerCase().trim();
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

  chatbotToggle.addEventListener('click', () => {
    const isVisible = chatbotWindow.style.display === 'block';
    chatbotWindow.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
      chatMessages.innerHTML = '';
    }
  });

  chatClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
  });

  sendButton.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text === "") return;
    addMessage(text, "user");
    chatMessages.innerHTML = '';
    handleBotResponse(text);
    userInput.value = '';
  });

  userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendButton.click();
  });

  clearChatButton.addEventListener('click', () => {
    chatMessages.innerHTML = '';
  });