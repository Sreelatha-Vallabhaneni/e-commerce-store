// create heading
const h1 = document.querySelector('.title');
h1.textContent = 'SV Shoes';
//render google map for store location
/*const getLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        pStatus.textContent = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;*/
//}
function renderLocationOnGoogleMap(lat, lng) {
  const location = document.querySelector(".fa-map-marker-alt");
  const mapDiv = document.getElementById("map");
  location.addEventListener('click', () => {
    document.querySelector(".map-modal").style.display = "flex";
  const map = new google.maps.Map(mapDiv, {
    center: { lat, lng },
    zoom: 10
  });
 const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    label: {
      color: "darkblue",
      fontWeight: "bold",
      fontSize: "24px",
      text: "SV Shoes"
    }
  });
  console.log(map);
  console.log(marker);
});
}
//getLocation();
renderLocationOnGoogleMap(55.654307800000005, 12.271277699999999);



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
const productName = document.querySelector(".product-name");
const bigImg = document.querySelector(".big-image");
const imagesdiv = document.querySelector(".subimg-one");
const imagesdiv2 = document.querySelector(".subimg-two");
const colorsList = document.querySelector(".colors-list");
const sizeList = document.querySelector(".size-list");
const productPrice = document.querySelector(".product-price");
const cartCount = document.querySelector(".cart-count");
//search
const openSearch = document.querySelector('.open-search-box');
const search = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const searchModal =document.querySelector('.search-modal');
const searchMContent = document.querySelector(".search-m-content");
// Create class for Product
class Product{
    constructor(name, price, id, color = [], size = [], image, subImages = [], defaultImage){
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
      //if(this.subImages.length < 2)
        return this.subImages.push(subImages);
    }
    addColor(color){
        return this.color.push(color);
    }
    addSize(size){
      return this.size.push(size);
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
      .map(product => {
        bigImg.src = `${product.images}`;
        imagesdiv.src = product.subImages[0];
        imagesdiv2.src = product.subImages[1];
        // mouseover and mouseout functionality to sub images
        function subImagesEventListener(item) {
          item.addEventListener("mouseover", () => {
            bigImg.src = item.src;
          });
          item.addEventListener("mouseout", () => {
            bigImg.src = product.images;
          });
        }
        subImagesEventListener(imagesdiv);
        subImagesEventListener(imagesdiv2);
        productPrice.textContent = product.price + " DKK";
        productName.textContent = product.name;
        // Dropdown list to select shoe color
        product.color.forEach(clr => {
          const color = document.createElement("option");
          color.innerHTML = `<option value="${clr}">${clr}</option>`;
          colorsList.appendChild(color);
        });             
        // Dropdown list to select shoe size
        product.size.forEach(size => {
          const shoeSize = document.createElement("option");
          shoeSize.textContent = size;
          sizeList.appendChild(shoeSize);
        });
      });      
  }
  searchProduct() {
    searchBtn.addEventListener("click", () => {      
      this.products
        .filter(product => search.value.toLowerCase().trim().includes(product.name.toLowerCase().trim()))
        .map(product => {
          document.querySelector(".bg-modal").style.display = "flex";
          this.renderSingleProduct(product.name);
          search.value = "";          
        });
      });
  }
}

// Create class for Display Products
class DisplayProducts {
  constructor(products) {
    this.products = products;
  }
  //render Display products in landing page
  renderDisplayProducts() {
    this.products.forEach(product => {
      const repeatImage = document.createElement("image");
      repeatImage.innerHTML = `<img class="disp-images" src=${product.images}>`;
      mensDisProducts.appendChild(repeatImage);
    });
    createButton("Shop Nike", mensDisButtons, "Nike");
    createButton("Shop Sneaker", mensDisButtons, "Sneaker");
    createButton("Shop TrekkingShoes", mensDisButtons, "Trekking Shoes");
    createButton("Shop WinterShoes", mensDisButtons, "Winter Shoes");
  }
  renderCart() {
    let cartPrices = [];
    //this.products.map(product => cartPrices.push(product.price));    
    const addtoCartBtn = document.querySelector(".btn-primary");
    const cartProduct = document.querySelector(".cart-product");
    //eventlistener to Add to cart button
    addtoCartBtn.addEventListener("click", () => {
      document.querySelector(".bg-modal-two").style.display = "flex";
      document.querySelector(".bg-modal").style.display = "none";
      /*let currentCount = 1;
      cartCount.textContent = currentCount++;*/
      this.products.filter(product => productName.textContent === product.name)
      .map(product => {
        console.log(product);
        //cart Image
        const cartProductImage = document.createElement('image');
        cartProduct.appendChild(cartProductImage);
        cartProductImage.innerHTML = `<img class="cart-image" src=${product.images}>`;
        //cart Price
        const cartPriceDiv = document.querySelector('.cart-price');
        const cartPrice = document.createElement("p");        
        cartPriceDiv.appendChild(cartPrice);
        cartPrice.innerHTML = `<p>${product.price}</p>`;
        cartPrices.push(product.price);
        const total = cartPrices.reduce((sum, product) => (sum += product), 0);
        const sum = document.querySelector(".total");
        sum.textContent = `Total: ${total} DKK`;
        console.log(cartPrices);
        //cart Quantity
        /*const cartQty = document.querySelector('.cart-quantity');
        const cartQuantity = document.createElement('input');
        cartQty.appendChild(cartQuantity);
        cartQuantity.innerHTML = `<input class="quantity" type="number">`; 
        cartQuantity.value = 1;
        cartQuantity.min = 0;
        cartQuantity.max = 20;
        cartQuantity.type = 'number';
        cartQuantity.placeholder = 'Quantity';
        //eventlistener to quantity
        cartQuantity.addEventListener('input', () => {
          if (cartQuantity.value) {
            const qtyPrice =  (cartQuantity.value ) * (cartPrice.textContent);
            sum.textContent ='Total: ' + (total + qtyPrice) + ' DKK';*/
            /*const qtyCount = Number(currentCount) + Number(cartQuantity.value)-1;
            cartCount.textContent = qtyCount;*/
         /* }else if(total !== 0){
            sum.textContent = "Total: " + Number(total) + (cartQuantity.value * cartPrice.textContent) + ' DKK';
          }*/

        //});
        //cart Delete Product
        const deleteBtn = document.querySelector('.delete-btn');
        const dbtn = document.createElement("button");
        deleteBtn.appendChild(dbtn);
        dbtn.innerHTML = `<button class="btn btn-danger">Delete</button><br>`;
        dbtn.addEventListener('click', () => {
          cartPrice.remove();
          cartProductImage.remove();
          dbtn.remove();
          //cartQuantity.remove();
          const index = cartPrices.indexOf(product.price);
          if (index > -1) {
            cartPrices.splice(index, 1);
            const total = cartPrices.reduce((sum, product) => (sum += product), 0);
            const sum = document.querySelector(".total");
            sum.textContent = `Total: ${total} DKK`;
          }          
        });           
      });
    });        
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
const nikeProduct = new Product("Nike", 100, 1, [], [], "images/mens1.jpg", []);
const sneakerProduct = new Product("Sneaker", 200, 2, [], [], "images/mens2.jpg", []);
const trekkingShoesProduct = new Product("Trekking Shoes", 300, 3, [], [], "images/mens3.jpg", [],'images/default-image.jpg' );
const winterShoesProduct = new Product("Winter Shoes", 4500, 4, [], [], "images/mens4.jpg", []);
// Each product Colors
nikeProduct.addColor('Gray');
nikeProduct.addColor("black");
nikeProduct.addColor("white");
sneakerProduct.addColor('red');
sneakerProduct.addColor('black');
trekkingShoesProduct.addColor('Dark grey');
trekkingShoesProduct.addColor('white');
winterShoesProduct.addColor('brown');
winterShoesProduct.addColor('dark brown');
// Each product sizes
nikeProduct.addSize("EU 40");
nikeProduct.addSize("EU 39");
sneakerProduct.addSize("EU 42");
sneakerProduct.addSize("EU 40");
trekkingShoesProduct.addSize("EU 38");
trekkingShoesProduct.addSize("EU 42");
winterShoesProduct.addSize("EU 40");
winterShoesProduct.addSize("EU 42");
//Each product subImages
nikeProduct.addImages("images/mens1-a.jpg");
nikeProduct.addImages("images/mens1-b.jpg");
sneakerProduct.addImages("images/mens2-a.jpg");
sneakerProduct.addImages("images/mens2-b.jpg");
trekkingShoesProduct.addImages("images/mens3-a.jpg");
trekkingShoesProduct.addImages("images/mens3-b.jpg");
winterShoesProduct.addImages("images/mens4-a.jpg");
winterShoesProduct.addImages("images/mens4-b.jpg");
// store products in array
const shoppingCart = new ShoppingCart([nikeProduct, sneakerProduct, trekkingShoesProduct, winterShoesProduct]);
const displayProducts = new DisplayProducts([nikeProduct, sneakerProduct, trekkingShoesProduct, winterShoesProduct]);
displayProducts.renderDisplayProducts();
displayProducts.renderCart();
shoppingCart.searchProduct();

// Event listener functionality to close Modal Popup
document.querySelector(".map-modal").style.display = "none";
function closeButton(e1, e2){
  document.querySelector(e1).addEventListener('click', () =>{
    document.querySelector(e2).style.display = "none";
  });
}
closeButton(".close", ".bg-modal");
closeButton(".close-two", ".bg-modal-two");
closeButton(".close-map", ".map-modal");
