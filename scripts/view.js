import { Products } from './Products.js';
import { Cart } from './Cart.js'
let user = JSON.parse(localStorage.getItem('email'))
let quantity = 0

if (!user) {
  window.location.href = "http://127.0.0.1:5500/pages/entryPoint.html"
}
let cart = new Cart()

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let prod = new Products();
const productsInstance = new Products();
let glopalProducts = [];

prod.getById(id).then((data) => {
  glopalProducts = productsInstance.getByCategory(data.category).then((data) => {
    glopalProducts = data
    document.getElementsByClassName('products-cards')[0].innerHTML = ''
    console.log(glopalProducts)
    renderData()
  })

  document.querySelector('.productSection').innerHTML = `
        <div class="col-xs-12 col-md-6">
            <div class="row d-flex flex-xs-column flex-md-row">
                <div class="col-xs-12 col-md-10 thumbnail-container" >
                    <img src=${data.thumbnail} alt="" class="thumbnail">
                </div>
<div class="col-12 col-md-2 image-container">
    <div class="row test g-2">
      ${data.images.map(image => `
        <div class="col-3 col-md-12 p-0 image-container">
          <img src="${image}" alt="Product image" class="img-fluid w-100 h-auto images">
        </div>
      `).join('')}
    </div>
  </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6">
            <div class="p-3">
                <h2 class="productTitle">${data.title}</h2>
                <div class="d-flex justify-content-between">
                   <h3 class="productPrice" >${data.price} $</h3>
                   <div class="mx-4">
                  ${getStarRating(data.rating)}
                   </div>
                </div>
              
                
                <p class="fs-5">${data.description}</p>
                <div class='d-flex'>
                        <button class="minus">-</button>
                        <p class="quantity">${quantity}</p>
                        <button class="add" >+</button>
                </div>
                <button class="btn-veiw">Add to cart</button>
            </div>
        </div>
    
    ` ;

  document.querySelector('.add').addEventListener('click', () => {
    ++quantity;
    document.querySelector('.quantity').innerHTML = quantity;
  })
  document.querySelector('.minus').addEventListener('click', () => {
    --quantity;
    document.querySelector('.quantity').innerHTML = quantity
  })
  document.querySelector('.btn-veiw').onclick = async () => {
    await cart.addToCart(data.id, quantity)
    let cartIcon = document.getElementById("cart-icon");
    cartIcon.click()
  }

})



function getStarRating(rating) {
  const fullStar = '<i class="fa-solid fa-star text-warning"></i>';
  const halfStar = '<i class="fa-solid fa-star-half-stroke text-warning"></i>';
  const emptyStar = '<i class="fa-regular fa-star text-warning"></i>';
  const maxStars = 5;

  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  stars += fullStar.repeat(fullStars);
  if (hasHalfStar) {
    stars += halfStar;
  }
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  stars += emptyStar.repeat(emptyStars);
  return stars;
}
let activeImage = 0;
setInterval(() => {
  const allImages = document.querySelectorAll('.images');
  allImages[((activeImage + allImages.length) - 1) % allImages.length].classList.remove('active');
  allImages[activeImage].classList.add('active');
  document.querySelector('.thumbnail').src = allImages[activeImage].src;
  activeImage = (activeImage + 1) % allImages.length;
  allImages[activeImage - 1];
}, 5000)

document.addEventListener('click', (e) => {
  const clickedElement = e.target.closest('.images');
  if (!clickedElement) return;
  const allImages = document.querySelectorAll('.images');
  allImages.forEach(img => {
    if (img === clickedElement) {
      img.classList.add('active');
      document.querySelector('.thumbnail').src = img.src;
    } else {
      img.classList.remove('active');
    }
  });
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



