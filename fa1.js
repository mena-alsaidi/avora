
/* =================================
   AVORA - JAVASCRIPT
================================= */

// 1. Product Data

const products = [
    {
        id: 1,
        name: "Elegant Beige Blazer",
        category: "women",
        price: 89,
        tag: "NEW IN",
        image: "imag woman/8.jpg"
    },
    {
        id: 2,
        name: "Classic White Shirt",
        category: "women",
        price: 49,
        tag: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=700"
    },
    
    {
        id: 3,
        name: "Minimal Black Dress",
        category: "women",
        price: 75,
        tag: "NEW IN",
       image: "imag woman/14.jpg"
    },
    {
        id: 4,
        name: "Soft Pink Outfit",
        category: "women",
        price: 65,
        tag: "TRENDING",
      image: "imag woman/35.jpg"
    },
     {
        id: 1,
        name: "Elegant Beige Blazer",
        category: "women",
        price: 89,
        tag: "NEW IN",
        image: "imag woman/22.jpg"
    },
    {
        id: 2,
        name: "Classic White Shirt",
        category: "women",
        price: 49,
        tag: "BESTSELLER",
         image: "imag woman/15.jpg"
    },
    
    {
        id: 3,
        name: "Minimal Black Dress",
        category: "women",
        price: 75,
        tag: "NEW IN",
       image: "imag woman/12.jpg"
    },
    {
        id: 4,
        name: "Soft Pink Outfit",
        category: "women",
        price: 65,
        tag: "TRENDING",
      image: "imag woman/6.jpg"
    },
    {
        id: 5,
        name: "Modern Grey Jacket",
        category: "men",
        price: 99,
        tag: "NEW IN",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700"
    },
    {
        id: 6,
        name: "Classic Casual Shirt",
        category: "men",
        price: 55,
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=700"
    },
    
    {
        id: 7,
        name: "Urban Black Jacket",
        category: "men",
        price: 110,
        tag: "TRENDING",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700"
    },
    {
        id: 8,
        name: "Essential White Tee",
        category: "men",
        price: 35,
        tag: "NEW IN",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700"
    }
    
    
];

// 2. Load Saved Data

let cart = JSON.parse(localStorage.getItem("avoraCart")) || [];

let wishlist = JSON.parse(localStorage.getItem("avoraWishlist")) || [];

let currentFilter = "all";


// 3. HTML Elements

const productGrid = document.getElementById("productGrid");

const cartCount = document.getElementById("cartCount");

const wishlistCount = document.getElementById("wishlistCount");

const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("searchInput");


// 4. Save Data

function saveData() {

    localStorage.setItem("avoraCart", JSON.stringify(cart));

    localStorage.setItem("avoraWishlist", JSON.stringify(wishlist));

}


// 5. Show Notification

function showToast(message) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.avoraToastTimer);

    window.avoraToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


// 6. Display Products

function displayProducts(filter = "all", search = "") {

    productGrid.innerHTML = "";

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            filter === "all" || product.category === filter;

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;

    });

    if (filteredProducts.length === 0) {

        productGrid.innerHTML =
            "<p>No products found. Try another search.</p>";

        return;

    }

    filteredProducts.forEach(product => {

        const isFavorite = wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-tag">${product.tag}</span>

                <button
                    class="wishlist-btn ${isFavorite ? "active" : ""}"
                    data-id="${product.id}"
                    aria-label="Toggle wishlist"
                >
                    <i class="${isFavorite ? "fa-solid" : "fa-regular"} fa-heart"></i>
                </button>

                <button class="add-cart" data-id="${product.id}">
                    ADD TO BAG <i class="fa-solid fa-bag-shopping"></i>
                </button>

            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category.toUpperCase()}
                </p>

                <h3 class="product-name">${product.name}</h3>

                <p class="product-price">$${product.price.toFixed(2)}</p>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


// 7. Filter Products

function setFilter(filter) {

    currentFilter = filter;

    displayProducts(filter, searchInput.value);

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );

    });

    document.querySelectorAll(".nav-link").forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.filter === filter
        );

    });

}


// Filter Buttons

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        setFilter(button.dataset.filter);

    });

});


// Navigation Filters

document.querySelectorAll(".nav-link[data-filter]").forEach(link => {

    link.addEventListener("click", () => {

        setFilter(link.dataset.filter);

    });

});


// Category and Banner Buttons

document.querySelectorAll("[data-filter]").forEach(element => {

    if (
        element.classList.contains("filter-btn") ||
        element.classList.contains("nav-link")
    ) return;

    element.addEventListener("click", () => {

        setFilter(element.dataset.filter);

    });

});


// 8. Search Products

function searchProducts() {

    const search = searchInput.value.trim();

    displayProducts(currentFilter, search);

    document.getElementById("new-arrivals")
        .scrollIntoView({ behavior: "smooth" });

}

document.getElementById("searchButton")
    .addEventListener("click", searchProducts);

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        searchProducts();

    }

});


// 9. Add and Remove Wishlist

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist");

    }

    saveData();

    updateCounts();

    displayProducts(currentFilter, searchInput.value);

}


// 10. Add to Cart

function addToCart(id) {

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }

    saveData();

    updateCounts();

    renderCart();

    showToast("Added to your bag!");

}


// 11. Remove from Cart

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveData();

    updateCounts();

    renderCart();

}


// 12. Update Counts

function updateCounts() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

    wishlistCount.textContent = wishlist.length;

}


// 13. Render Shopping Cart

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your bag is currently empty.</p>';

        cartTotal.textContent = "$0.00";

        return;

    }

    let total = 0;

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        if (!product) return;

        total += product.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const info = document.createElement("div");

        const name = document.createElement("h4");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent =
            `$${product.price.toFixed(2)} × ${item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-item";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            removeFromCart(item.id);
        });

        info.append(name, price, removeButton);

        cartItem.append(image, info);

        cartItems.appendChild(cartItem);

    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

}


// 14. Product Card Events

productGrid.addEventListener("click", event => {

    const wishlistButton = event.target.closest(".wishlist-btn");

    const cartButton = event.target.closest(".add-cart");

    if (wishlistButton) {

        toggleWishlist(Number(wishlistButton.dataset.id));

    }

    if (cartButton) {

        addToCart(Number(cartButton.dataset.id));

    }

});


// 15. Open and Close Cart

document.getElementById("cartButton").addEventListener("click", () => {

    cartOverlay.classList.add("open");

});

document.getElementById("closeCart").addEventListener("click", () => {

    cartOverlay.classList.remove("open");

});

cartOverlay.addEventListener("click", event => {

    if (event.target === cartOverlay) {

        cartOverlay.classList.remove("open");

    }

});


// 16. Mobile Menu

const menuToggle = document.getElementById("menuToggle");

const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("open");

});

navbar.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

    });

});


// 17. Newsletter

document.getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const email = document.getElementById("emailInput").value;

        showToast("Thank you for joining AVORA!");

        event.target.reset();

    });


// 18. View All Products

document.getElementById("viewAll").addEventListener("click", () => {

    setFilter("all");

    searchInput.value = "";

});


// 19. Checkout Demo

document.getElementById("checkoutButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your bag is empty!");

            return;

        }

        showToast("Checkout will be available soon!");

    });


// 20. Initialize Website

displayProducts();

updateCounts();

renderCart();

console.log("AVORA Fashion Store is ready!");

