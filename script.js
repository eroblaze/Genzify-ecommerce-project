// Cart menu slide in

const cart = document.querySelector(".cart");
const close_cart = document.querySelector(".close_cart");

cart.addEventListener("click", () => {
  document.querySelector(".cart_menu").classList.add("slide");
});

close_cart.addEventListener("click", () => {
  document.querySelector(".cart_menu").classList.remove("slide");
});

// Add To Cart

const addedItems = {};

const addToCartButtons = document.querySelectorAll(".add_to_cart");

addToCartButtons.forEach((el) => {
  el.addEventListener("click", handleAddToCart);
});

function createItem(product_ID, product_name, product_price) {
  const element = `
  <div class="content_item" id="content_item_${product_ID}">

    <div class="first_part">

      <div class="content_item_title">
        <span class="clickable cancel" product_id="${product_ID}">
          <img src="images/cancel.png" class="cancel_image" product_id="${product_ID}"/>
        </span>
        <h5>${product_name}</h5>
      </div>

      <p class="content_item_price">₦<span class="item_price">${product_price}</span></p>

    </div>

    <div class="quantity_regulator">
      <img src="images/remove.png" class="clickable decrease_qty" product_id="${product_ID}" product_price="${product_price}"/>
    
      <span class="qty">1</span>

      <img src="images/add.png" class="clickable increase_qty" product_id="${product_ID}" product_price="${product_price}"/>
    </div>

</div>
`;
  return element;
}

function increaseTotalPrice(product_price) {
  const totalPrice = document.querySelector(".total_price");
  const sum = Number(product_price) + Number(totalPrice.textContent);
  totalPrice.textContent = sum;
}

function decreaseTotalPrice(product_price) {
  const totalPrice = document.querySelector(".total_price");
  const sum = Number(totalPrice.textContent) - Number(product_price);
  totalPrice.textContent = sum;
}

function handleAddToCart(event) {
  const addToCartBtn = event.currentTarget;
  const product_name = addToCartBtn.getAttribute("product_name");
  const product_price = addToCartBtn.getAttribute("product_price");
  const product_ID = addToCartBtn.getAttribute("id");

  if (!addedItems[product_ID]) {
    addedItems[product_ID] = product_name;

    document.querySelector(".cart_content").classList.remove("none");
    document.querySelector(".no_content").classList.add("none");

    const createdElement = createItem(product_ID, product_name, product_price);
    document
      .querySelector(".total")
      .insertAdjacentHTML("beforebegin", createdElement);

    increaseTotalPrice(product_price);
  }
}

// Increase and Decrease Items quantity

const cart_menu = document.querySelector(".cart_menu");

cart_menu.addEventListener("click", (event) => {
  const targetElement = event.target;
  if (targetElement.classList.contains("increase_qty")) {
    increaseItemQty(event);
  } else if (targetElement.classList.contains("decrease_qty")) {
    decreaseItemQty(event);
  } else if (
    targetElement.classList.contains("cancel") ||
    targetElement.classList.contains("cancel_image")
  ) {
    handleCancelBtn(event);
  }
});

function getContentItem(product_ID) {
  const content_item = document.querySelector(`#content_item_${product_ID}`);
  return content_item;
}

function removeElement(content_item, product_ID) {
  content_item.remove();
  delete addedItems[product_ID];

  if (Object.keys(addedItems).length === 0) {
    document.querySelector(".cart_content").classList.add("none");
    document.querySelector(".no_content").classList.remove("none");
  }
}

function increaseItemQty(event) {
  const targetElement = event.target;
  const product_ID = targetElement.getAttribute("product_id");
  const product_price = targetElement.getAttribute("product_price");
  const content_item = getContentItem(product_ID);

  const qty = content_item.querySelector(".qty");
  qty.textContent = Number(qty.textContent) + 1;

  const price = content_item.querySelector(".item_price");
  price.textContent = Number(price.textContent) + Number(product_price);

  increaseTotalPrice(product_price);
}

function decreaseItemQty(event) {
  const targetElement = event.target;
  const product_ID = targetElement.getAttribute("product_id");
  const product_price = targetElement.getAttribute("product_price");
  const content_item = getContentItem(product_ID);

  const qty = content_item.querySelector(".qty");
  qty.textContent = Number(qty.textContent) - 1;

  const price = content_item.querySelector(".item_price");
  price.textContent = Number(price.textContent) - Number(product_price);

  if (Number(qty.textContent) === 0) {
    removeElement(content_item, product_ID);
  }

  decreaseTotalPrice(product_price);
}

function handleCancelBtn(event) {
  const targetElement = event.target;
  const product_ID = targetElement.getAttribute("product_id");
  const content_item = getContentItem(product_ID);

  const price = content_item.querySelector(".item_price").textContent;

  decreaseTotalPrice(price);
  removeElement(content_item, product_ID);
}
