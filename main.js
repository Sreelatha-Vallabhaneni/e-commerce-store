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

// Create class for Product
class Product{
    constructor(name, price, productNumber, color, size, image){
        this.name = name;
        this.price = price;
        this.productNumber = productNumber;
        this.color = color;
        this.size = size;
        this.image = image;
    }
    addImages(){

    }

}
// Create class for ShoppingCart
class ShoppingCart{
    constructor(products){
        this.products = products;
    }
    addProduct(product){
        return this.products.push(product);
    }
    removeProduct(product){
        const productIndex = this.products.indexOf(product);
        const removeProduct = this.products.splice(productIndex, 1);
        return removeProduct;
    }
    getTotal(){
        const total = this.products.reduce((sum, product) => (sum += product.price), 0);
        const sum = document.querySelector(".total");
        sum.textContent = `TOTAL ${total}`;
        console.log(total);
    }
}


