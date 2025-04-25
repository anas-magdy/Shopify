import { Products } from "./Products.js";
const productsInstance = new Products();
let glopalProducts = [];
glopalProducts = await productsInstance.getAllProducts()
   .then(products => {
      glopalProducts = products;
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

let options = document.getElementById("categorySelection")
var categories = await productsInstance.getAllCategories()
categories.forEach((category) => {
   let option = document.createElement("option")
   option.value = category
   option.innerHTML = category
   options.appendChild(option)
})
document.getElementById("categorySelection").addEventListener("change", async (event) => {

})








document.getElementById("search").addEventListener("input", async (event) => {
   glopalProducts = await productsInstance.displayProducts(event.target.value);
   document.getElementsByClassName('products-cards')[0].innerHTML = ''
   renderData();
});

function renderData() {
   for (let i = 0; i < glopalProducts.length; i++) {
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

