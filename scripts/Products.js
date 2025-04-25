// export class Products {
//   static products = null;
//   static initialized = false;

//   constructor() {
//     if (!Products.initialized) {
//       Products.initialize();
//     }
//   }

//   static async initialize() {
//     if (!Products.initialized) {
//       const response = await fetch('https://dummyjson.com/products');
//       const data = await response.json();
//       Products.products = data.products;
//       Products.initialized = true;
//     }
//   }

//   async getAllProducts() {
//     if (!Products.initialized) {
//       await Products.initialize();
//     }
//     return Products.products;
//   }

//   async getById(id) {
//     if (!Products.initialized) {
//       await Products.initialize();
//     }
//     return Products.products.find((product) => product.id == id);
//   }
// }




export class Products {
  static products = null; 
  static isLoaded = false; 
  cat = []; 

  constructor() {
  }

  
  static async ensureLoaded() {
    if (!Products.isLoaded) {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      Products.products = data.products;
      Products.isLoaded = true;
    }
  }

  
  async getAllProducts() {
    await Products.ensureLoaded(); 
    return Products.products;
  }


  async getById(id) {
    await Products.ensureLoaded();
    return Products.products.find((product) => product.id == id);
  }

  async getAllCategories() {
    const res = await fetch('https://dummyjson.com/products/category-list');
    const data = await res.json();
    this.cat = data; 
    return this.cat;
  }


  async displayProducts(searchStr) {
    await Products.ensureLoaded(); 
    return Products.products.filter((product) =>
      product.title.toLowerCase().includes(searchStr.toLowerCase().trim())
    );
  }
}





// export class Products {
//   cat = []
//   static products;
//   constructor() {
//   }

//   async getAllProducts() {
//     const response = await fetch('https://dummyjson.com/products');
//     const data = await response.json();
//     Products.products = data.products;
//     return Products.products;

//   }
//   getById(id) {
//     let product = Products.products.find((product) => product.id == id)
//     console.log(product)
//     return product
//   }

//   getAllcatigory() {
//     fetch('https://dummyjson.com/products/category-list')
//       .then(res => res.json())
//       .then(data => cat = data)
//   }

//   displayProducts(str) {
//     let allProducts = Products.products
//     let displayProducts = allProducts.filter((product) => {
//       return product.title.toLowerCase().includes(str.toLowerCase().trim())
//     })
//     return displayProducts

//   }
// }