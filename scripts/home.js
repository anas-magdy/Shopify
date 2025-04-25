import { Products } from "./Products.js";
const productsInstance = new Products();
let glopalProducts = [];
glopalProducts = await productsInstance.getAllProducts()
   .then(products => {
      glopalProducts = products;
      console.log("from anas", glopalProducts);
      renderData();
   });

let flagShow = false
let cartMenu = document.getElementById("cart-menu");
let cartIcon = document.getElementById("cart-icon");
let closeIcon = document.getElementById("closeIcon");
closeIcon.addEventListener("click", (event) => {
   event.stopPropagation()
   cartMenu.style.animation = 'cartHide 0.5s forwards';
   flagShow = false
});

cartIcon.addEventListener("click", () => {
   if (!flagShow) {
      cartMenu.style.animation = 'cartShow 0.5s forwards';
      flagShow = true
      return
   }
   else {
      cartMenu.style.animation = 'cartHide 0.5s forwards';
      flagShow = false
      return
   }
});

document.getElementById("search").addEventListener("input", async (event) => {
   document.getElementsByClassName('products-cards')[0].innerHTML = ''
   glopalProducts = await productsInstance.displayProducts(event.target.value);
   renderData();
});

function renderData() {
   for (let i = 0; i < glopalProducts.length; i++) {
      console.log(glopalProducts[i])
      let card = document.createElement('div')
      card.className = 'p-3 col-xs-12 col-sm-6 col-md-4 col-lg-3'
      card.innerHTML = `
   <div class="card rounded p-0 h-100">
         <img style="object-fit:"cover" src="${glopalProducts[i].thumbnail}" alt="${glopalProducts[i].title}" />
         <div class="image-container"></div>
         <div class="card-body d-flex flex-column align-self-center">
            <div class="d-flex flex-column justify-content-center align-items-center p-2">
                  <h6>
                     ${glopalProducts[i].title.length > 50 ? glopalProducts[i].title.substring(0, 30) + '...' : glopalProducts[i].title}
                  </h6>
              
               <span class="price">${glopalProducts[i].price} $</span>
         
               <button class="btn-veiw" onclick="location.href='../pages/productDetails.html?id=${glopalProducts[i].id}'">View</button>
            </div>
         </div>
   </div>
`;
      document.getElementsByClassName('products-cards')[0].appendChild(card)
   }
}

