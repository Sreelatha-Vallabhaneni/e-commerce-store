// create heading
const h1 = document.querySelector('.title');
h1.textContent = 'SV Shoes';
// create navigation links
const mensLi =  document.querySelector('.mens');
mensLi.innerHTML = `<a href= "#">Mens Shoes</a>`;
const womensLi = document.querySelector('.womens');
womensLi.innerHTML = `<a href= "#">Womens Shoes</a>`;
const kidsLi = document.querySelector('.kids');
kidsLi.innerHTML = `<a href= "#">Kids Shoes</a>`;
// select carousel / banners and add image source links
const bannerOne = document.querySelector('.banner-one');
bannerOne.src = 'images/banner1.jpg';
const bannerTwo = document.querySelector(".banner-two");
bannerTwo.src = "images/banner2.jpg";
const bannerThree = document.querySelector(".banner-three");
bannerThree.src = "images/banner3.jpg";
// create Mens Shoes functionality
const h2Mens = document.querySelector('.mens-shoes');
h2Mens.textContent = 'Mens Shoes';
const mensDisProducts = document.querySelector(".mens-display-products");
const mensDisButtons = document.querySelector('.mens-display-buttons');
// Create class for Product
class Product{
    constructor(name, price, id, color, size, image, subImages = [], defaultImage){
        this.name = name;
        this.price = price;
        this.id = id;
        this.color = color;
        this.size = size;
        this.images = image;
        this.subImages = subImages;
        this.defaultImage = defaultImage
    }
    addImages(subImages){
        return this.subImages.push(subImages);
    }
    addDefaultImage(defaultImage){
        return this.subImages.push(defaultImage);
    }
}
// Create class for ShoppingCart
class ShoppingCart {
  constructor(products) {
    this.products = products;
  }
  addProduct(product) {
    return this.products.push(product);
  }
  removeProduct(product) {
    const productIndex = this.products.indexOf(product);
    const removeProduct = this.products.splice(productIndex, 1);
    return removeProduct;
  }
  getTotal() {
    const total = this.products.reduce(
      (sum, product) => (sum += product.price),
      0
    );
    const sum = document.querySelector(".total");
    sum.textContent = `TOTAL ${total}`;
    console.log(total);
  }
  renderSingleProduct(name) {
    this.products
      .filter(product => name === product.name)
      .map(product =>{        
        if(product.defaultImage){ 
          const imagesUl = document.querySelector(".images-list");
          const imagesLi = document.createElement("li");
          imagesUl.appendChild(imagesLi);         
          imagesLi.innerHTML = `<div class="images-li"><img src=${product.defaultImage}></div>`;
        }
        product.subImages.forEach(subImage => {
          const imagesLi = document.createElement("li");
          imagesLi.innerHTML = `<div class="images-li"><img src=${subImage}></div>`;
          const imagesUl = document.querySelector(".images-list");
          imagesUl.appendChild(imagesLi);          
        })      
    });
  } 
}
// Create class for Display Products
class DisplayProducts{
  constructor(products){
    this.products = products;
  }
  //render Display products in landing page
  renderDisplayProducts() {    
    this.products.forEach(product => {      
      const repeatImage = document.createElement("image");
      repeatImage.innerHTML = `<img class="disp-images" src=${product.images}>`;
      mensDisProducts.appendChild(repeatImage);
    })
    createButton("Shop Now", mensDisButtons, "Nike");
    createButton("Shop Now", mensDisButtons, "Sneaker");
    createButton("Shop Now", mensDisButtons, "Trekking Shoes");
    createButton("Shop Now", mensDisButtons, "Winter Shoes");
  }
  /* <li><button type="button" class="btn btn-warning" id="${product.id}">${product.name+"Shop Now"}</button></li>
   <li><p class="sampleid">${product.name}</p></li>*/
}
function createButton(text, parent, name){
  const myBtn = document.createElement('button');
  myBtn.innerHTML = `<button type="button" class="btn btn-warning">${text}</button>`;
  parent.appendChild(myBtn);
  //Event listener functionality for button click -  Open Modal Popup & render single product
  myBtn.addEventListener("click", () => {
    document.querySelector(".bg-modal").style.display = "flex"; //to open Modal Box/POPUP
    shoppingCart.renderSingleProduct(name);
  });
}
// mens all products
const nikeProduct = new Product("Nike", 1000, 1, "Dark Grey", "42In", "images/mens1.jpg", []);
const sneakerProduct = new Product("Sneaker", 2000, 2, "Black", "40In", "images/mens2.jpg", []);
const trekkingShoesProduct = new Product("Trekking Shoes", 3000, 3, "Grey", "41In", "images/mens3.jpg", [],'images/default-image.jpg' );
const winterShoesProduct = new Product("Winter Shoes", 4000, 4, "Brown", "42In", "images/mens4.jpg", []);
//Each product subImages
nikeProduct.addImages("images/mens1-a.jpg");
nikeProduct.addImages("images/mens1-b.jpg");
sneakerProduct.addImages("images/mens2-a.jpg");
sneakerProduct.addImages("images/mens2-b.jpg");
trekkingShoesProduct.addImages("images/mens3-a.jpg");
winterShoesProduct.addImages("images/mens4-a.jpg");
winterShoesProduct.addImages("images/mens4-b.jpg");
// store products in array
const shoppingCart = new ShoppingCart([nikeProduct, sneakerProduct, trekkingShoesProduct, winterShoesProduct]);
const displayProducts = new DisplayProducts([sneakerProduct, nikeProduct, trekkingShoesProduct, winterShoesProduct]);
displayProducts.renderDisplayProducts();
// Event listener functionality for close Modal Popup
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".bg-modal").style.display = "none";
  location.reload();
});


