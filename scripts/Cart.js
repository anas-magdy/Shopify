import { Products } from './Products.js';
export class Cart {
    pro = new Products()
    Cart = {
        owner: "anas",
        items: []
    };

    static totalPrice = 0;

    constructor() { }



    async addToCart(productID, quantity = 1) {
        await this.pro.getById(productID)
            .then((item) => {
                Cart.totalPrice += item.price * quantity;
                console.log(item)
                let cartItem = {
                    image: item.thumbnail,
                    title: item.title,
                    price: item.price,
                    quantity: quantity
                }
                this.Cart.items.push(cartItem);
            }
            )
    }
    deleteFromCart(productID) {
        let index = this.Cart.items.findIndex((item) => item.id == productID);
        if (index !== -1) {
            Cart.totalPrice -= this.Cart.items[index].price * this.Cart.items[index].quantity;
            this.Cart.items.splice(index, 1);
        }
    }

}