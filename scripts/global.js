import { Cart } from "./Cart.js";
let flagShow = false;
let cartMenu = document.getElementById("cart-menu");
let cartIcon = document.getElementById("cart-icon");
let closeIcon = document.getElementById("closeIcon");

closeIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    cartMenu.style.animation = 'cartHide 0.5s forwards';
    flagShow = false;
});

// Back to top button functionality
let gototop = document.getElementById('backToTop');
if (gototop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1000) {
            gototop.style.display = "flex";
        } else {
            gototop.style.display = 'none';
        }
    });
    gototop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

cartIcon.addEventListener("click", () => {
    if (!flagShow) {
        showCart();
    } else {
        hideCart();
    }
});

function showCart() {
    let cartt = new Cart();
    let cartItems = cartt.cart.items;
    let cartElement = cartMenu.querySelector(".items");
    cartElement.innerHTML = '<h2>Cart</h2>';

    if (cartItems.length === 0) {
        cartElement.innerHTML += '<p>Your cart is empty</p>';
    } else {
        for (let i = 0; i < cartItems.length; i++) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cartItem row position-relative';
            itemDiv.innerHTML = `
                <div class="removeItem" data-id="${cartItems[i].id}"> <i class="fa-solid fa-xmark"></i> </div>
                <div class="cartItem__image col-5">
                    <img src="${cartItems[i].image}" alt="${cartItems[i].title}">
                </div>
                <div class="cart__description col-6">
                    <h4>${cartItems[i].title}</h4>
                    <p>${cartItems[i].price} $</p>
                    <div class='d-flex'>
                        <button class="minus" data-id="${cartItems[i].id}">-</button>
                        <p class="quantity">${cartItems[i].quantity}</p>
                        <button class="add" data-id="${cartItems[i].id}">+</button>
                    </div>
                </div>`;
            cartElement.appendChild(itemDiv);
        }

        // Add order button
        let btnOrder = document.createElement('div');
        btnOrder.className = 'btnOrder-container';
        btnOrder.innerHTML = `
            <div class="position-relative w-100 d-flex justify-content-center h-100">
                <button class="btn-order">Order Now</button>
            </div>`;
        cartElement.appendChild(btnOrder);

        // Add event listeners for all buttons
        document.querySelectorAll('.removeItem').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                cartt.deleteFromCart(id);
                updateCartDisplay();
            });
        });

        cartMenu.querySelectorAll('.add').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                cartt.addToCart(id, 1);
                updateCartDisplay();
            });
        });

        cartMenu.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const item = cartt.cart.items.find(item => item.id == id);
                if (item.quantity >=1) {
                    cartt.addToCart(id, -1); // Decrease quantity by 1
                } else {
                    cartt.deleteFromCart(id);
                }
                updateCartDisplay();
            });
        });

        cartMenu.querySelector('.btn-order')?.addEventListener("click", () => {
            if (cartt.cart.items.length > 0) {
                cartt.clearCart();
                hideCart();
                setTimeout(() => {
                    window.location.href = "http://127.0.0.1:5500/pages/trackOrder.html";
                }, 200);
            }
        });
    }

    cartMenu.style.animation = 'cartShow 0.5s forwards';
    flagShow = true;
}

function hideCart() {
    cartMenu.style.animation = 'cartHide 0.5s forwards';
    flagShow = false;
}

function updateCartDisplay() {
        showCart();
}