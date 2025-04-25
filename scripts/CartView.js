import { Cart } from './Cart.js';
let car = new Cart()
let cartView = document.getElementById('cart')
await car.addToCart(5, 2)
await car.addToCart(6, 2)
await car.addToCart(7, 2)
for (let i = 0; i < car.Cart.items.length; i++) {
    let cartItem = document.createElement('div')
    cartItem.innerHTML = `
    <img src="${car.Cart.items[i].image}" alt="Product Image" width="100" height="100">
    Title: ${car.Cart.items[i].title}
     <br>
     Price : ${car.Cart.items[i].price}
    <br> 

    Quantity: ${car.Cart.items[i].quantity}
    <br>
     <h2>+=====================================</h2>
     ${Cart.totalPrice}
     `
    cartView.appendChild(cartItem)
}



