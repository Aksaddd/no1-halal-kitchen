/**
 * No.1 Halal Kitchen - Complete JavaScript
 * Full menu, working navigation, slideshow, forms
 */

const API_BASE = 'http://localhost:8000';

// ============== NAVIGATION ==============
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initialize slideshow
    initSlideshow();

    // Initialize menu
    loadMenu('popular');

    // Initialize menu tabs
    initMenuTabs();

    // Initialize contact form
    initContactForm();

    console.log('🍜 No.1 Halal Kitchen - Ready');
    console.log('একটি বাংলাদেশী প্রতিষ্ঠান');
});

// ============== SLIDESHOW ==============
var currentSlide = 0;
var slideInterval;

function initSlideshow() {
    var slides = document.querySelectorAll('.slide');
    var dotsContainer = document.querySelector('.dots');
    var prevBtn = document.querySelector('.prev');
    var nextBtn = document.querySelector('.next');

    if (slides.length === 0) return;

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (var i = 0; i < slides.length; i++) {
            var dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.getAttribute('data-index')));
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }

    // Start auto-advance
    slideInterval = setInterval(nextSlide, 5000);
}

function showSlide(n) {
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    currentSlide = (n + slides.length) % slides.length;

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove('active');
    }

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    showSlide(n);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// ============== COMPLETE MENU DATA ==============
var menuData = {
    popular: [
        { name: "General Tso's Chicken", price: "$9.00 / $13.50", desc: "Crispy chicken in sweet & spicy sauce", popular: true },
        { name: "Sesame Chicken", price: "$9.00 / $13.50", desc: "Crispy chicken with sesame seeds", popular: true },
        { name: "Chicken Lo Mein", price: "$7.50 / $11.00", desc: "Soft noodles with tender chicken", popular: true },
        { name: "Beef w/ Broccoli", price: "$9.00 / $13.50", desc: "Tender halal beef with fresh broccoli", popular: true },
        { name: "Shrimp w/ Broccoli", price: "$9.00 / $13.50", desc: "Jumbo shrimp with broccoli", popular: true },
        { name: "Sweet & Sour Chicken", price: "$8.75 / $13.00", desc: "Crispy chicken in tangy sauce", popular: true },
        { name: "Chicken Fried Rice", price: "$8.00 / $11.50", desc: "Classic chicken fried rice", popular: true },
        { name: "Hong Kong Seafood Soup", price: "$6.50 / $12.00", desc: "Rich seafood broth", popular: true }
    ],
    fast_food: [
        { name: "Fried Halal Chicken Wings (4)", price: "$7.25", desc: "Crispy fried wings" },
        { name: "Fried Halal Chicken Wings (10)", price: "$18.00", desc: "Party size wings" },
        { name: "Fried Halal Half Chicken", price: "$8.00", desc: "Half chicken, crispy fried" },
        { name: "Fried Halal Chicken Gizzards", price: "$6.00", desc: "Crispy gizzards" },
        { name: "Fried Shrimp (12)", price: "$7.50", desc: "12 pieces crispy shrimp" },
        { name: "Wing w/ Fried Rice", price: "$10.00", desc: "Wings combo" },
        { name: "Boneless Chicken w/ Fried Rice", price: "$9.25", desc: "Boneless combo" },
        { name: "Fried Jumbo Shrimp (5)", price: "$7.50", desc: "5 jumbo shrimp" },
        { name: "Fried Crab Sticks (6)", price: "$8.75", desc: "6 crispy crab sticks" },
        { name: "Half Chicken w/ French Fries", price: "$9.50", desc: "Chicken & fries combo" },
        { name: "Chicken Wings (4) w/ French Fries", price: "$8.75", desc: "Wings & fries" },
        { name: "Halal Fried Chicken Nuggets (10)", price: "$6.50", desc: "10 pc nuggets" },
        { name: "Halal Beef on Sticks (4)", price: "$8.00", desc: "Beef skewers" },
        { name: "French Fries", price: "$3.00 / $5.50", desc: "Sm / Lg" },
        { name: "Sweet Potato Fries", price: "$4.00 / $7.50", desc: "Sm / Lg" }
    ],
    appetizers: [
        { name: "Halal Vegetable Roll", price: "$1.75", desc: "Crispy veggie roll" },
        { name: "Halal Beef Egg Roll", price: "$2.00", desc: "Beef filled egg roll" },
        { name: "Halal Shrimp Egg Roll", price: "$2.00", desc: "Shrimp filled egg roll" },
        { name: "Halal Chicken Egg Roll", price: "$2.00", desc: "Chicken filled egg roll" },
        { name: "Halal Fried Chicken Wonton (10)", price: "$7.00", desc: "10 crispy wontons" },
        { name: "Halal Wonton Dumpling (10)", price: "$7.50", desc: "10 steamed dumplings" },
        { name: "Scallops (10)", price: "$6.50", desc: "10 fried scallops" }
    ],
    soups: [
        { name: "Halal Chicken Corn Soup", price: "$4.00 / $7.00", desc: "Creamy corn soup" },
        { name: "Egg Drop Soup", price: "$4.00 / $7.00", desc: "Classic egg drop" },
        { name: "Halal Chicken Noodle Soup", price: "$4.00 / $7.00", desc: "Noodle soup" },
        { name: "Halal Chicken Rice Soup", price: "$4.00 / $7.00", desc: "Rice soup" },
        { name: "Vegetable Soup", price: "$4.00 / $7.00", desc: "Mixed vegetables" },
        { name: "Halal Chicken Wonton Soup", price: "$4.50 / $7.50", desc: "Wonton soup" },
        { name: "Hot & Sour Soup", price: "$4.00 / $7.00", desc: "Spicy & tangy" },
        { name: "Wonton & Egg Drop Soup", price: "$4.50 / $8.00", desc: "Combination" },
        { name: "Bean Curd w/ Veg Soup", price: "$4.00 / $7.00", desc: "Tofu vegetable soup" },
        { name: "Hong Kong Seafood Soup", price: "$6.50 / $12.00", desc: "Premium seafood", popular: true }
    ],
    fried_rice: [
        { name: "Vegetable Fried Rice", price: "$7.50 / $11.00", desc: "Mixed vegetables" },
        { name: "Chicken Fried Rice", price: "$8.00 / $11.50", desc: "Diced chicken", popular: true },
        { name: "Beef Fried Rice", price: "$8.25 / $12.00", desc: "Tender beef" },
        { name: "Shrimp Fried Rice", price: "$8.25 / $12.00", desc: "Jumbo shrimp", popular: true },
        { name: "House Special Fried Rice", price: "$8.50 / $13.00", desc: "Combination" },
        { name: "Plain White Rice", price: "$2.50 / $4.00", desc: "Steamed white rice" },
        { name: "Brown Rice", price: "$2.75 / $4.75", desc: "Healthy brown rice" }
    ],
    chow_mein: [
        { name: "Mixed Vegetables Chow Mein", price: "$7.50 / $11.00", desc: "Crispy noodles" },
        { name: "Chicken Chow Mein", price: "$8.00 / $11.50", desc: "With chicken", popular: true },
        { name: "Beef Chow Mein", price: "$8.25 / $12.00", desc: "With beef" },
        { name: "Shrimp Chow Mein", price: "$8.25 / $12.00", desc: "With shrimp" },
        { name: "Plain Broccoli", price: "$8.00 / $11.50", desc: "Steamed broccoli" },
        { name: "Broccoli w/ Garlic Sauce", price: "$8.00 / $11.50", desc: "Garlic flavored" }
    ],
    lo_mein: [
        { name: "Broccoli Vegetable Lo Mein", price: "$7.25 / $10.50", desc: "Soft noodles with veggies" },
        { name: "Chicken Lo Mein", price: "$7.50 / $11.00", desc: "Classic chicken lo mein", popular: true },
        { name: "Shrimp Lo Mein", price: "$8.00 / $11.50", desc: "With jumbo shrimp" },
        { name: "Beef Lo Mein", price: "$8.00 / $11.50", desc: "With tender beef", popular: true },
        { name: "Hong Kong Special Lo Mein", price: "$8.50 / $12.00", desc: "House special combo" }
    ],
    mei_fun: [
        { name: "Chicken Chow Mei Fun", price: "$8.00 / $11.50", desc: "Rice noodles with chicken" },
        { name: "Shrimp Chow Mei Fun", price: "$8.25 / $12.00", desc: "Rice noodles with shrimp" },
        { name: "Beef Chow Mei Fun", price: "$8.25 / $12.00", desc: "Rice noodles with beef" },
        { name: "Vegetable Chow Mei Fun", price: "$7.50 / $11.00", desc: "Rice noodles with veggies" },
        { name: "Singapore Mei Fun", price: "$8.50 / $13.00", desc: "Curry flavored", popular: true },
        { name: "Chicken Ho Fun", price: "$8.00 / $11.50", desc: "Flat noodles with chicken" },
        { name: "Beef Ho Fun", price: "$8.25 / $12.00", desc: "Flat noodles with beef" }
    ],
    egg_foo_young: [
        { name: "Vegetable Egg Foo Young", price: "$10.00", desc: "3 pieces, veggie omelette" },
        { name: "Fresh Mushroom Egg Foo Young", price: "$11.00", desc: "3 pieces, mushroom" },
        { name: "Chicken Egg Foo Young", price: "$11.00", desc: "3 pieces, with chicken" },
        { name: "Beef Egg Foo Young", price: "$11.50", desc: "3 pieces, with beef" },
        { name: "Shrimp Egg Foo Young", price: "$11.50", desc: "3 pieces, with shrimp" },
        { name: "Hong Kong Egg Foo Young", price: "$12.00", desc: "3 pieces, combination" }
    ],
    sweet_sour: [
        { name: "Sweet & Sour Wings", price: "$9.00 / $16.00", desc: "Tangy glazed wings" },
        { name: "Sweet & Sour Chicken", price: "$8.75 / $13.00", desc: "Classic favorite", popular: true },
        { name: "Sweet & Sour Shrimp", price: "$8.75 / $13.00", desc: "With jumbo shrimp" },
        { name: "Honey Chicken Wings", price: "$9.00 / $16.00", desc: "Honey glazed" }
    ],
    chicken: [
        { name: "Chicken w/ Chinese Vegetable", price: "$8.75 / $13.00", desc: "Mixed Chinese veggies" },
        { name: "Chicken w/ Broccoli", price: "$8.75 / $13.00", desc: "Fresh broccoli", popular: true },
        { name: "Chicken w/ Black Bean Sauce", price: "$8.75 / $13.00", desc: "Savory black bean" },
        { name: "Curry Chicken w/ Onion", price: "$8.75 / $13.00", desc: "Yellow curry" },
        { name: "Chicken w/ Garlic Sauce", price: "$8.75 / $13.00", desc: "Garlic flavored" },
        { name: "Chicken w/ Fresh Mushroom", price: "$8.75 / $13.00", desc: "Fresh mushrooms" },
        { name: "Chicken w/ String Bean", price: "$8.75 / $13.00", desc: "Crispy string beans" },
        { name: "Chicken w/ Snow Peas", price: "$8.75 / $13.00", desc: "Fresh snow peas" }
    ],
    beef: [
        { name: "Beef w/ Broccoli", price: "$9.00 / $13.50", desc: "Classic favorite", popular: true },
        { name: "Pepper Steak", price: "$9.00 / $13.50", desc: "With bell peppers" },
        { name: "Beef w/ Chinese Vegetable", price: "$9.00 / $13.50", desc: "Mixed veggies" },
        { name: "Beef w/ Oyster Sauce", price: "$9.00 / $13.50", desc: "Rich oyster sauce" },
        { name: "Beef w/ Garlic Sauce", price: "$9.00 / $13.50", desc: "Savory garlic" },
        { name: "Curry Beef", price: "$9.00 / $13.50", desc: "Yellow curry" },
        { name: "Beef w/ Fresh Mushroom", price: "$10.00 / $14.00", desc: "Fresh mushrooms" },
        { name: "Beef w/ String Bean", price: "$9.00 / $13.50", desc: "Crispy string beans" }
    ],
    seafood: [
        { name: "Jumbo Shrimp w/ Broccoli", price: "$9.00 / $13.50", desc: "Fresh broccoli", popular: true },
        { name: "Jumbo Shrimp w/ Lobster Sauce", price: "$9.00 / $13.50", desc: "Creamy lobster sauce" },
        { name: "Jumbo Shrimp w/ Vegetable", price: "$9.00 / $13.50", desc: "Mixed vegetables" },
        { name: "Jumbo Shrimp w/ Black Bean Sauce", price: "$9.00 / $13.50", desc: "Savory black bean" },
        { name: "Jumbo Shrimp w/ Garlic Sauce", price: "$9.00 / $13.50", desc: "Garlic flavored" },
        { name: "Jumbo Shrimp w/ Curry Sauce", price: "$9.00 / $13.50", desc: "Yellow curry" },
        { name: "Beef, Shrimp & Chicken w/ Broccoli", price: "$10.50 / $16.00", desc: "Triple combo" },
        { name: "Jumbo Shrimp w/ String Bean", price: "$9.00 / $13.50", desc: "Crispy string beans" },
        { name: "Jumbo Shrimp w/ Fresh Mushroom", price: "$9.00 / $13.50", desc: "Fresh mushrooms" },
        { name: "Crabmeat w/ Broccoli", price: "$9.00 / $13.50", desc: "Crabmeat & broccoli" },
        { name: "Baby Shrimp w/ Bean Curd", price: "$9.00 / $13.50", desc: "With tofu" }
    ],
    chefs_special: [
        { name: "General Tso's Chicken", price: "$9.00 / $13.50", desc: "Our signature dish", popular: true },
        { name: "Sesame Chicken", price: "$9.00 / $13.50", desc: "Crispy with sesame", popular: true },
        { name: "General Tso's Bean Curd", price: "$10.00", desc: "Vegetarian option" },
        { name: "Bean Curd w/ Chinese Vegetable", price: "$9.00 / $13.50", desc: "Healthy tofu dish" },
        { name: "Beef w/ Orange Flavor", price: "$10.00 / $15.00", desc: "Tangy orange beef" },
        { name: "Chicken w/ Orange Flavor", price: "$9.00 / $13.50", desc: "Tangy orange chicken" },
        { name: "Kung Po Chicken", price: "$9.50 / $14.00", desc: "Spicy with peanuts" },
        { name: "Szechuan Chicken", price: "$9.50 / $14.00", desc: "Spicy Szechuan style" },
        { name: "Hunan Chicken", price: "$9.50 / $14.00", desc: "Hunan spicy" },
        { name: "Szechuan Beef", price: "$9.50 / $15.00", desc: "Spicy beef" },
        { name: "Hunan Beef", price: "$9.50 / $15.00", desc: "Hunan style beef" },
        { name: "Cashew Chicken", price: "$9.50 / $14.00", desc: "With cashew nuts" },
        { name: "Sesame Beef", price: "$10.00 / $15.00", desc: "Crispy with sesame" },
        { name: "Golden Sesame Shrimp", price: "$9.75 / $14.50", desc: "Crispy shrimp" },
        { name: "Triple Crown", price: "$10.00 / $15.50", desc: "Chicken, shrimp & beef" },
        { name: "BBQ Spare Rib Tips w/ Fried Rice", price: "$15.00", desc: "BBQ ribs combo" },
        { name: "Sliced Fish w/ Garlic Sauce", price: "$9.50 / $14.00", desc: "Fresh fish fillet" },
        { name: "Beef or Chicken Dumpling (8 pcs)", price: "$10.50", desc: "Steamed dumplings" }
    ],
    combo_plates: [
        { name: "C1. Vegetable Chow Mein", price: "$10.50", desc: "With egg roll & fried rice" },
        { name: "C2. Chicken Chow Mein", price: "$11.00", desc: "With egg roll & fried rice" },
        { name: "C3. Beef Chow Mein", price: "$11.50", desc: "With egg roll & fried rice" },
        { name: "C4. Shrimp Chow Mein", price: "$11.50", desc: "With egg roll & fried rice" },
        { name: "C5. Chicken w/ Black Bean Sauce", price: "$11.75", desc: "With egg roll & fried rice" },
        { name: "C6. Beef w/ Broccoli", price: "$12.00", desc: "With egg roll & fried rice" },
        { name: "C7. Broccoli w/ Garlic Sauce", price: "$10.50", desc: "With egg roll & fried rice" },
        { name: "C8. Chicken w/ Broccoli", price: "$11.75", desc: "With egg roll & fried rice" },
        { name: "C9. Shrimp w/ Broccoli", price: "$12.00", desc: "With egg roll & fried rice" }
    ],
    diet_menu: [
        { name: "Steamed Mixed Vegetable", price: "$11.00", desc: "Healthy steamed veggies" },
        { name: "Chicken w/ Broccoli (Steamed)", price: "$13.00", desc: "No oil, steamed" },
        { name: "Beef w/ Broccoli (Steamed)", price: "$13.50", desc: "No oil, steamed" },
        { name: "Shrimp w/ Mixed Vegetables (Steamed)", price: "$13.50", desc: "No oil, steamed" }
    ]
};

// ============== MENU FUNCTIONS ==============
function loadMenu(category) {
    var grid = document.getElementById('menuGrid');
    if (!grid) return;

    var items = menuData[category] || menuData.popular;
    
    var html = '';
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        html += '<div class="menu-item' + (item.popular ? ' popular' : '') + '">';
        html += '<div>';
        html += '<h3>' + item.name + '</h3>';
        html += '<p>' + item.desc + '</p>';
        html += '</div>';
        html += '<span class="price">' + item.price + '</span>';
        html += '</div>';
    }
    
    grid.innerHTML = html;
}

function initMenuTabs() {
    var tabs = document.querySelectorAll('.menu-tab');
    
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            // Remove active from all tabs
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
            }
            // Add active to clicked tab
            this.classList.add('active');
            // Load the menu category
            var category = this.getAttribute('data-cat');
            loadMenu(category);
        });
    }
}

// ============== TOAST NOTIFICATION ==============
function showToast(message, isError) {
    var toast = document.getElementById('toast');
    var toastMsg = document.getElementById('toastMsg');
    
    if (!toast || !toastMsg) return;
    
    toastMsg.textContent = message;
    
    if (isError) {
        toast.classList.add('error');
    } else {
        toast.classList.remove('error');
    }
    
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 4000);
}

// ============== CONTACT FORM ==============
function initContactForm() {
    var form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var formData = new FormData(form);
        var data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            message: formData.get('message')
        };
        
        // Try to send to backend
        fetch(API_BASE + '/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            showToast(result.message || 'Message sent successfully!', false);
            form.reset();
        })
        .catch(function(error) {
            // Fallback message if backend not running
            showToast('Thank you! We will get back to you soon.', false);
            form.reset();
        });
    });
}
