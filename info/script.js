// ===== Xiaomi Website Clone - JavaScript =====

// User Authentication State
let isLoggedIn = false;
let currentUser = null;

// Payment State
let selectedCard = null;

// Product Data
const products = [
    {
        id: 1,
        name: 'Xiaomi 14 Ultra',
        price: 1299,
        originalPrice: 1499,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/xiaomi-14-ultra/thumb.png',
        description: 'Leica Quad Camera | Snapdragon 8 Gen 3'
    },
    {
        id: 2,
        name: 'Xiaomi 14',
        price: 899,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/xiaomi-14/thumb.png',
        description: 'Leica Triple Camera | Compact Flagship'
    },
    {
        id: 3,
        name: 'Redmi Note 13 Pro',
        price: 399,
        originalPrice: 449,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/redmi-note-13-pro/thumb.png',
        description: '200MP Camera | 120W Charging'
    },
    {
        id: 4,
        name: 'POCO X6 Pro',
        price: 349,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/poco-x6-pro/thumb.png',
        description: 'Dimensity 8300 Ultra | Gaming Beast'
    },
    {
        id: 5,
        name: 'Mi Smart Band 8',
        price: 49,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/mi-smart-band-8/thumb.png',
        description: '1.62" AMOLED | 16 Days Battery'
    },
    {
        id: 6,
        name: 'Mi TV A2 55"',
        price: 449,
        originalPrice: 549,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/mi-tv-a2/thumb.png',
        description: '4K UHD | Dolby Vision | Google TV'
    },
    {
        id: 7,
        name: 'Robot Vacuum X10',
        price: 599,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/robot-vacuum/thumb.png',
        description: 'Auto Empty | LiDAR Navigation'
    },
    {
        id: 8,
        name: 'Air Purifier 4 Pro',
        price: 249,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/air-purifier/thumb.png',
        description: 'HEPA Filter | Smart Control'
    },
    {
        id: 9,
        name: 'Electric Scooter 4',
        price: 599,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/electric-scooter/thumb.png',
        description: '35km Range | Max 25km/h'
    },
    {
        id: 10,
        name: 'Xiaomi Buds 4 Pro',
        price: 149,
        originalPrice: 179,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/buds-4-pro/thumb.png',
        description: 'ANC | Spatial Audio | 38hrs'
    },
    {
        id: 11,
        name: 'Power Bank 3 20000',
        price: 39,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/power-bank/thumb.png',
        description: '22.5W Fast Charge | USB-C'
    },
    {
        id: 12,
        name: 'Xiaomi Watch S1',
        price: 199,
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF3BE74055509DD/website/product/watch-s1/thumb.png',
        description: 'GPS | 12 Days Battery | AMOLED'
    }
];

// Cart State
let cart = [];

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCountEl = document.querySelector('.cart-count');
const totalPriceEl = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.btn-checkout');
const addToCartBtns = document.querySelectorAll('.btn-cart');
const toast = document.querySelector('.toast');
const heroSlides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

// ===== Hero Slider =====
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    heroSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % heroSlides.length;
    showSlide(nextIndex);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Dot click events
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopSlider();
        showSlide(index);
        startSlider();
    });
});

// Initialize slider
startSlider();

// ===== Mobile Menu =====
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (!mobileNav) {
            createMobileNav();
        } else {
            mobileNav.classList.toggle('active');
        }
    });
}

function createMobileNav() {
    const nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    nav.innerHTML = `
        <ul>
            <li><a href="#phones">Xiaomi Phones</a></li>
            <li><a href="#redmi">Redmi Phones</a></li>
            <li><a href="#tv">TV</a></li>
            <li><a href="#laptops">Laptops</a></li>
            <li><a href="#smart-home">Smart Home</a></li>
            <li><a href="#lifestyle">Lifestyle</a></li>
            <li><a href="#support">Support</a></li>
        </ul>
    `;
    document.body.appendChild(nav);
    
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// ===== Cart Functionality =====
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart" style="font-size: 60px; color: #757575; margin-bottom: 20px;"></i>
                <p style="color: #757575;">Your cart is empty</p>
            </div>
        `;
        totalPriceEl.textContent = '$0';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price}</p>
                    <div class="cart-item-controls">
                        <div class="cart-item-qty">
                            <button onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                            <span>${item.qty}</span>
                            <button onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Update total price
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        totalPriceEl.textContent = `$${total}`;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({
            ...product,
            qty: 1
        });
    }
    
    updateCart();
    showToast();
    openCart();
}

function updateQty(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.qty += change;
    
    if (item.qty <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Make functions global
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;

// ===== Cart Sidebar =====
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ===== Add to Cart Buttons =====
document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(btn.dataset.id);
        addToCart(productId);
    });
});

// ===== Toast Notification =====
function showToast() {
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ===== Checkout =====
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Show payment modal directly
    openPaymentModal();
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Initialize =====
updateCart();

// ===== Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card, .category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Easter Egg: "alex y maya" =====
let keyBuffer = '';
const easterEggCode = 'alex y maya';

document.addEventListener('keydown', (e) => {
    keyBuffer += e.key;
    if (keyBuffer.length > easterEggCode.length) {
        keyBuffer = keyBuffer.slice(-easterEggCode.length);
    }
    
    if (keyBuffer.toLowerCase() === easterEggCode.toLowerCase()) {
        showEasterEgg();
        keyBuffer = '';
    }
});

function showEasterEgg() {
    const toast = document.createElement('div');
    toast.className = 'easter-egg-toast';
    toast.innerHTML = '🐕 Alex es un mandilón 😂';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('active');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ===== Search Icon (Placeholder) =====
document.querySelector('.nav-icon[href="#"]').addEventListener('click', (e) => {
    if (e.target.closest('.fa-search')) {
        e.preventDefault();
        const searchTerm = prompt('What are you looking for?');
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}\n\nThis is a demo. Search functionality would be implemented here.`);
        }
    }
});

// ===== User Icon (Login Modal) =====
const userIcon = document.querySelector('#userIcon');

// ===== Modal Functions =====
const loginModal = document.getElementById('loginModal');
const paymentModal = document.getElementById('paymentModal');
const shippingModal = document.getElementById('shippingModal');
const closeLoginModalBtn = document.getElementById('closeLoginModal');
const closePaymentModalBtn = document.getElementById('closePaymentModal');
const closeShippingModalBtn = document.getElementById('closeShippingModal');
const loginForm = document.getElementById('loginForm');
const paymentCards = document.querySelectorAll('.payment-card');

// Login Modal Functions
function openLoginModal() {
    if (loginModal) {
        loginModal.classList.add('active');
        // Hide body content
        document.body.style.overflow = 'hidden';
    }
}

function closeLoginModal() {
    if (loginModal) {
        loginModal.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Payment Modal Functions
function openPaymentModal() {
    if (paymentModal) {
        paymentModal.classList.add('active');
        // Close cart sidebar
        closeCart();
    }
}

function closePaymentModal() {
    if (paymentModal) {
        paymentModal.classList.remove('active');
        // Reset selected card
        selectedCard = null;
        paymentCards.forEach(card => card.classList.remove('selected'));
    }
}

// Shipping Modal Functions
function openShippingModal() {
    if (shippingModal) {
        shippingModal.classList.add('active');
    }
}

function closeShippingModalFn() {
    if (shippingModal) {
        shippingModal.classList.remove('active');
        // Clear cart and reset
        cart = [];
        updateCart();
        closePaymentModal();
    }
}

// User Icon Click Handler
if (userIcon) {
    userIcon.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            openLoginModal();
        } else {
            // Show user info
            alert(`Logged in as:\nName: ${currentUser.name}\nEmail: ${currentUser.email}`);
        }
    });
}

// Event Listeners for Modals
if (closeLoginModalBtn) {
    closeLoginModalBtn.addEventListener('click', closeLoginModal);
}

if (closePaymentModalBtn) {
    closePaymentModalBtn.addEventListener('click', closePaymentModal);
}

if (closeShippingModalBtn) {
    closeShippingModalBtn.addEventListener('click', closeShippingModalFn);
}

// Close login modal when clicking outside the card
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target.classList.contains('signin-full-page')) {
            closeLoginModal();
        }
    });
}

if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            closePaymentModal();
        }
    });
}

if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            closePaymentModal();
        }
    });
}

// Login Form Submit with validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit-btn');
const nameCheck = document.getElementById('name-check');
const emailCheck = document.getElementById('email-check');

function isValidGmail(v) {
    return /^[^\s@]+@gmail\.com$/i.test(v.trim());
}

function isValidName(v) {
    return v.trim().length >= 2;
}

function updateForm() {
    if (!nameInput || !emailInput || !submitBtn) return;
    
    const nameOk = isValidName(nameInput.value);
    const emailOk = isValidGmail(emailInput.value);
    
    if (nameCheck) nameCheck.classList.toggle('show', nameOk);
    if (nameInput) nameInput.classList.toggle('filled', nameOk);
    
    if (emailCheck) emailCheck.classList.toggle('show', emailOk);
    if (emailInput) emailInput.classList.toggle('filled', emailOk);
    
    if (nameOk && emailOk) {
        submitBtn.disabled = false;
        submitBtn.classList.add('active');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('active');
    }
}

if (nameInput) {
    nameInput.addEventListener('input', updateForm);
}

if (emailInput) {
    emailInput.addEventListener('input', updateForm);
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;

        // Save user data
        currentUser = { name, email };
        isLoggedIn = true;

        // Update UI
        document.body.classList.add('user-logged-in');

        // Show success message
        showToast();
        const toastEl = document.querySelector('.toast');
        if (toastEl) {
            toastEl.querySelector('span').textContent = `Welcome, ${name}!`;
        }

        // Close login modal
        closeLoginModal();

        // Reset form
        loginForm.reset();
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.remove('active');
        }
    });
}

// Ripple effect for button
if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        if (!submitBtn.classList.contains('active')) return;
        const rect = submitBtn.getBoundingClientRect();
        const r = document.createElement('span');
        r.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
        submitBtn.appendChild(r);
        setTimeout(() => r.remove(), 700);
    });
}

// Payment Card Selection
paymentCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected from all cards
        paymentCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected to clicked card
        card.classList.add('selected');
        selectedCard = card.dataset.card;

        // Show shipping delay modal after a short delay
        setTimeout(() => {
            closePaymentModal();
            setTimeout(() => {
                openShippingModal();
            }, 300);
        }, 500);
    });
});

// Google Login Button
const googleLoginBtn = document.querySelector('.social-btn.google');
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
        // Simulate Google login
        currentUser = { name: 'Google User', email: 'user@gmail.com' };
        isLoggedIn = true;
        document.body.classList.add('user-logged-in');
        
        showToast();
        const toastEl = document.querySelector('.toast');
        if (toastEl) {
            toastEl.querySelector('span').textContent = 'Welcome, Google User!';
        }
        
        closeLoginModal();
    });
}

console.log('Xiaomi Website Clone Loaded Successfully! 🎉');
console.log('Products available:', products.length);
console.log('Features: Hero Slider, Shopping Cart, Smooth Scroll, Animations');

