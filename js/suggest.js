const productData = {
  productId: 1,
  productImages: {
    image_1: "./images/image-product-1.jpg",
    image_2: "./images/image-product-2.jpg",
    image_3: "./images/image-product-3.jpg",
    image_4: "./images/image-product-4.jpg",
  },
  productInfo: {
    companyName: "Sneaker Company",
    title: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    originalPrice: 250,
    offerNumber: 50,
    discountedPrice: (250 * 50) / 100,
  },
};

const elements = {
  productDataContainer: document.getElementById("productDataContainer"),
  toggleMenuIcon: document.getElementById("toggleMenuIcon"),
  darkCover: document.getElementById("darkCover"),
  navSideBar: document.getElementById("navSideBar"),
  closeIcon: document.getElementById("closeIcon"),
  productLargeImageWrapper: document.getElementById("productarLgeImageWraper"),
  lightBoxGallery: document.getElementById("lightBoxGallary"),
  closeIconWrapper: document.getElementById("closeIconWraper"),
  largeImage: document.getElementById("largeImage1"),
  subImages: document.querySelectorAll(".subImage"),
  decrement: document.getElementById("decrment"),
  increment: document.getElementById("increment"),
  count: document.getElementById("count"),
  addToCartBtn: document.getElementById("addToCartBtn"),
  productCount: document.getElementById("productCount"),
  previous: document.getElementById("previous"),
  next: document.getElementById("next"),
  cartIcon: document.getElementById("cartIcon"),
  cartProductsList: document.getElementById("CartProudectsList"),
  productList: document.getElementById("productList"),
};

let productCount = 0;
let currentImageNumber = 1;
let cart = [];

const images = Object.values(productData.productImages);

function renderProduct() {
  elements.productDataContainer.innerHTML = `
    <div class="product-images">
      <div class="product-largeImage-wrapper" id="productarLgeImageWraper">
        <img class="product-largeImage" src="${productData.productImages.image_1}" id="largeImage1" alt="Product image">
        <img class="previous" id="previous" src="./images/icon-previous.svg" alt="Previous image">
        <img class="next" id="next" src="./images/icon-next.svg" alt="Next image">
      </div>
      <div class="product-imagesList">
        ${Object.keys(productData.productImages)
          .map(
            (key, index) => `
          <div class="product-ImageWrapper" tabindex="0">
            <img class="subImage" src="${productData.productImages[key]}" alt="Thumbnail ${index + 1}" data-imageId="image${index + 1}">
          </div>`
          )
          .join("")}
      </div>
    </div>
    <div class="product-info">
      <p>${productData.productInfo.companyName}</p>
      <h1>${productData.productInfo.title}</h1>
      <p>${productData.productInfo.description}</p>
      <h2>$${productData.productInfo.discountedPrice} <span>${productData.productInfo.offerNumber}%</span></h2>
      <p class="originalPrice">$${productData.productInfo.originalPrice.toFixed(2)}</p>
      <div class="actionDetails">
        <div class="addSub">
          <button id="decrment">-</button>
          <span class="number" id="count">${productCount}</span>
          <button id="increment">+</button>
        </div>
        <button class="addToCartBtn" id="addToCartBtn">
          <i class="fa-solid fa-cart-shopping"></i> Add to cart
        </button>
      </div>
    </div>
  `;
}

function changeImage(element, index) {
  element.src = images[index - 1];
  return index;
}

function renderCart() {
  elements.productList.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
            <div class="productWraper" data-proN="${item.id}">
              <img src="${productData.productImages.image_1}" alt="Product image">
              <div class="productDetails">
                <p>${productData.productInfo.title}</p>
                <p>$${item.price} x ${item.quantity} <span>$${item.price * item.quantity}</span></p>
              </div>
              <i class="fa-solid fa-trash removeProduct" data-deletIcon="${item.id}" aria-label="Remove product"></i>
            </div>`
        )
        .join("")
    : "<p>No Products</p>";
  elements.productList.classList.toggle("noProductList", cart.length === 0);
}

function addToCart() {
  if (productCount > 0) {
    cart = [{ id: productData.productId, quantity: productCount, price: productData.productInfo.discountedPrice }];
    renderCart();
    elements.productCount.classList.remove("hide");
    elements.productCount.textContent = cart.length;
  } else {
    elements.productCount.classList.add("hide");
  }
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
  elements.productCount.textContent = cart.length || "";
  if (cart.length === 0) elements.productCount.classList.add("hide");
}

function init() {
  renderProduct();

  elements.toggleMenuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.darkCover.classList.add("outerDarkCover");
    elements.navSideBar.classList.add("active");
  });

  elements.closeIcon.addEventListener("click", () => {
    elements.navSideBar.classList.remove("active");
    elements.darkCover.classList.remove("outerDarkCover");
  });

  elements.darkCover.addEventListener("click", () => {
    elements.navSideBar.classList.remove("active");
    elements.darkCover.classList.remove("outerDarkCover");
  });

  elements.productLargeImageWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    if (elements.largeImage2) {
      elements.largeImage2.src = elements.largeImage.src;
      elements.lightBoxGallery.classList.add("active");
    }
  });

  elements.closeIconWrapper.addEventListener("click", () => {
    elements.lightBoxGallery.classList.remove("active");
  });

  elements.next.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageNumber = changeImage(elements.largeImage, (currentImageNumber % 4) + 1);
  });

  elements.previous.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageNumber = changeImage(elements.largeImage, currentImageNumber === 1 ? 4 : currentImageNumber - 1);
  });

  elements.subImages.forEach((image) => {
    image.addEventListener("click", () => {
      const imageId = image.getAttribute("data-imageId");
      currentImageNumber = changeImage(elements.largeImage, parseInt(imageId.replace("image", "")));
    });
  });

  elements.increment.addEventListener("click", () => {
    elements.count.textContent = ++productCount;
  });

  elements.decrement.addEventListener("click", () => {
    if (productCount > 0) elements.count.textContent = --productCount;
  });

  elements.addToCartBtn.addEventListener("click", addToCart);

  elements.productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeProduct")) {
      const id = parseInt(e.target.getAttribute("data-deletIcon"));
      removeFromCart(id);
    }
  });

  elements.cartIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.cartProductsList.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    const isClickInsideCart = elements.cartProductsList.contains(e.target);
    const isClickOnIcon = elements.cartIcon.contains(e.target);
    if (!isClickInsideCart && !isClickOnIcon) {
      elements.cartProductsList.classList.remove("active");
    }
  });
}

init();