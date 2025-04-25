export class Products {
  static products = null;
  static isLoaded = false;

  cat = [];

  constructor() {
  }


  static async ensureLoaded() {
    if (!Products.isLoaded) {
      const response = await fetch('https://dummyjson.com/products?limit=194');
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
    let res = await fetch('https://dummyjson.com/products/category-list');
    let data = await res.json();
    this.cat = data;
    return this.cat;
  }
  async getByCategory(category) {
    let res = await fetch('https://dummyjson.com/products/category/smartphones')
    let data = res.json()
      .then(console.log);
  }

  async displayProducts(searchStr) {
    await Products.ensureLoaded();
    return Products.products.filter((product) =>
      product.title.toLowerCase().includes(searchStr.toLowerCase().trim())
    );
  }
}
