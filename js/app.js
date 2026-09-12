// ============================================
// ANIMACIONES CON GSAP
// ============================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Animación del hero título
    gsap.from('.hero-title', {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: 'power3.out'
    });

    // Animación del hero subtítulo
    gsap.from('.hero-subtitle', {
        duration: 1,
        delay: 0.3,
        opacity: 0,
        y: -30,
        ease: 'power3.out'
    });

    // Animación del botón principal
    gsap.from('.btn-primary', {
        duration: 1,
        delay: 0.6,
        opacity: 0,
        y: -20,
        ease: 'power3.out'
    });

    // Animación de las tarjetas de características
    gsap.from('.feature-card', {
        duration: 0.8,
        delay: 0.2,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Animación de las tarjetas de productos
    gsap.from('.product-card', {
        duration: 0.8,
        delay: 0.2,
        opacity: 0,
        y: 30,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Animación de los títulos de secciones
    gsap.from('.catalogo h2, .contact-container h2, .info-container h2', {
        duration: 1,
        opacity: 0,
        y: -20,
        ease: 'power3.out'
    });

    // Animación de entrada de la navegación
    gsap.from('.navbar', {
        duration: 0.6,
        opacity: 0,
        y: -50,
        ease: 'power2.out'
    });

    // Efecto hover en tarjetas (interactivo)
    const cards = document.querySelectorAll('.feature-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                boxShadow: '0 8px 30px rgba(139, 90, 142, 0.3)'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            });
        });
    });

    // Manejar el envío del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Crear animación de envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            gsap.to(submitBtn, {
                duration: 0.3,
                background: '#d4a5d4'
            });
            
            submitBtn.textContent = '✓ Mensaje Enviado';
            submitBtn.disabled = true;

            // Resetear el formulario después de 2 segundos
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                gsap.to(submitBtn, {
                    duration: 0.3,
                    background: '#8b5a8e'
                });
            }, 2000);
        });
    }

    // Scroll animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animar elementos cuando entren en viewport
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    ease: 'power2.out'
                });
            }
        });
    }, observerOptions);

    // Observar todos los párrafos de información
    document.querySelectorAll('.info-container p, .contact-info').forEach(el => {
        gsap.set(el, { opacity: 0, y: 20 });
        observer.observe(el);
    });
});

// Función para agregar productos al carrito (ejemplo simple)
function agregarAlCarrito(nombreProducto) {
    gsap.to('.btn-add', {
        duration: 0.5,
        scale: 0.95,
        ease: 'power2.inOut',
        onComplete: function() {
            gsap.to('.btn-add', {
                duration: 0.3,
                scale: 1
            });
        }
    });
    
    alert(`${nombreProducto} agregado al carrito`);
}

// Agregar listeners a botones "Agregar al Carrito"
document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').textContent;
        agregarAlCarrito(productName);
    });
});
