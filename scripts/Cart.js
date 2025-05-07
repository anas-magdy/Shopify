import { Products } from './Products.js';

export class Cart {
    pro = new Products();
    static instance = null;

    cart = {
        owner: "anas",
        items: []
    };

    totalPrice = 0;

    constructor() {
        if (Cart.instance) {
            return Cart.instance;
        }
        Cart.instance = this;
        this.loadCart();
    }

    async addToCart(productID, quantity = 1) {
        await this.pro.getById(productID)
            .then((item) => {
                console.log(item)
                this.totalPrice += item.price * quantity;
                let flag = this.cart.items.some((elem) => elem.id == item.id);

                if (!flag) {
                    let cartItem = {
                        id: item.id,
                        image: item.thumbnail,
                        title: item.title,
                        price: item.price,
                        quantity: quantity
                    };
                    this.cart.items.push(cartItem);
                } else {
                    let index = this.cart.items.findIndex((elem) => elem.id == item.id);
                    this.cart.items[index].quantity += quantity;
                }

                this.saveCart();
                console.log(this.cart);
            });
    }

    deleteFromCart(productID) {
        console.log("ramadan", productID)
        let index = this.cart.items.findIndex((item) => item.id == productID);
        if (index !== -1) {
            this.totalPrice -= this.cart.items[index].price * this.cart.items[index].quantity;
            this.cart.items.splice(index, 1);
            this.saveCart();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify({
            items: this.cart.items,
            totalPrice: this.totalPrice
        }));
    }

    loadCart() {

        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            this.cart.items = parsedCart.items || [];
            this.totalPrice = parsedCart.totalPrice || 0;
        }
    }
    decreaseQuantity(productID, amount = 1) {
        let index = this.cart.items.findIndex((item) => item.id == productID);
        if (index !== -1) {
            this.cart.items[index].quantity -= amount;
            this.totalPrice -= this.cart.items[index].price * amount;

            if (this.cart.items[index].quantity <= 0) {
                this.cart.items.splice(index, 1);
            }

            this.saveCart();
        }
    }
    clearCart() {
        this.cart.items = [];
        this.totalPrice = 0;
        localStorage.removeItem('cart');
    }
}

export const globalCart = new Cart();
















// import { Products } from './Products.js';
// export class Cart {
//     pro = new Products()
//     static cart = {
//         owner: "anas",
//         items: []
//     };

//     static totalPrice = 0;

//     constructor() { }



//     async  addToCart(productID, quantity = 1) {
//         await this.pro.getById(productID)
//             .then((item) => {
//                 Cart.totalPrice += item.price * quantity;
//                 let flag = Cart.cart.items.some((elem) => elem.id == item.id)
//                 if (!flag) {
//                     let cartItem = {
//                         id: item.id,
//                         image: item.thumbnail,
//                         title: item.title,
//                         price: item.price,
//                         quantity: quantity
//                     }
//                     Cart.cart.items.push(cartItem);
//                     console.log(Cart.cart)
//                 } else {
//                     let index = Cart.cart.items.findIndex((elem) => elem.id == item.id)
//                     Cart.cart.items[index].quantity++;

//                     console.log(Cart.cart)
//                 }

//             }
//             )
//     }
//     deleteFromCart(productID) {
//         let index = this.Cart.items.findIndex((item) => item.id == productID);
//         if (index !== -1) {
//             Cart.totalPrice -= this.Cart.items[index].price * this.Cart.items[index].quantity;
//             Cart.cart.items.splice(index, 1);
//         }
//     }

// }