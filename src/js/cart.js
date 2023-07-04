import { products } from "./product.js";

const emptyCartContent = "<p>Your cart is empty</p>";
let cartItems = [];
const clearCartBtnElement = document.getElementById("clearCartBtn");
const addToCartBtnElements = document.querySelectorAll(".addToCartBtn");
const cartItemsElement = document.getElementById("cartItems");

const cartButtonClickHandler = (e, ...rest) => {
  const id = parseInt(e.target.getAttribute("data-id"));
  const qty = rest.length ? parseInt(rest[0]) : 1;
  const productDetail = products.find((el) => el.ID === id);

  const cartIndex = cartItems.findIndex((el) => el.ID === id);

  if (cartIndex === -1) {
    // add new product to cart
    productDetail.qty = qty;
    cartItems.push(productDetail);
  } else {
    // product already exists in cart
    cartItems[cartIndex].qty += qty;
  }

  renderCartItems();
};

const cartAllButtonClickListenerInit = () => {
  document.querySelectorAll(".removeCartBtn").forEach((buttonElement) => {
    buttonElement.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const findIndex = cartItems.findIndex((item) => item.ID === id);
      findIndex !== -1 && cartItems.splice(findIndex, 1);
      renderCartItems();
    });
  });

  // cart increment qty handler
  document.querySelectorAll(".increment").forEach((buttonElement) => {
    buttonElement.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const findIndex = cartItems.findIndex((item) => item.ID === id);
      findIndex !== -1 && (cartItems[findIndex].qty += 1);
      renderCartItems();
    });
  });

  // cart decrement qty handler
  document.querySelectorAll(".decremnet").forEach((buttonElement) => {
    buttonElement.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const findIndex = cartItems.findIndex((item) => item.ID === id);
      findIndex !== -1 && (cartItems[findIndex].qty -= 1);
      renderCartItems();
    });
  });

  // discount input field change handler
  document.getElementById("discountInput").addEventListener("change", (e) => {
    renderCartItems();
  });
};

clearCartBtnElement.addEventListener("click", () => {
  cartItems = [];
  renderCartItems();
});

const renderCartItems = () => {
  if (cartItems.length === 0) {
    cartItemsElement.innerHTML = emptyCartContent;
    clearCartBtnElement.classList.add("d-none");
  } else {
    let subTotal = 0;
    let cartMarkup = `<ul>`;
    cartItems.forEach((item) => {
      const total = item.price * item.qty;
      subTotal += total;
      cartMarkup += `<li class="d-flex mb-3">
            <figure>
              <a href="#">
                <img height="80px" src="${item.photo}" alt="">
              </a>
            </figure>
            <div style="width: 100%;" class="cart-item-inner d-flex justify-content-between p-2">
              <div class="cart-item-content">
                <h5 class="mb-3">${item.name}</h5>
                <strong>Price</strong> $${item.price} 
                <button data-id="${
                  item.ID
                }" class="ml-5 btn btn-sm btn-outline-secondary decremnet" ${
        item.qty === 1 && "disabled"
      }>-</button>
                <strong>${item.qty}</strong>
                <button data-id="${
                  item.ID
                }" class="btn btn-sm btn-outline-secondary increment">+</button>
              </div>
              <div class="cart-item-info ">
                <h5>$${total}</h5>
                <button data-id="${
                  item.ID
                }" class="btn btn-sm btn-warning removeCartBtn">Remove</button>
              </div>
            </div>
          </li>`;
    });
    cartMarkup += `</ul>`;
    const discountElement = document.getElementById("discountInput");
    let discountedAmount = 0;
    if (discountElement && discountElement.value) {
      discountedAmount = parseFloat(discountElement.value);
    }
    const grandTotal = subTotal - discountedAmount;
    cartMarkup += `<div class="d-flex align-items-end flex-column mb-2">
    <h5>
        <small>Sub Total</small>:
      $${subTotal.toFixed(2)}
    </h5>
    <h5><small>Discount:</small><input type="number" id="discountInput" min="1" max="${subTotal}" value="${
      discountedAmount !== 0 ? discountedAmount : ""
    }" /></h5>
    <h4>Total: $${grandTotal}</h4>
  </div>`;
    cartItemsElement.innerHTML = cartMarkup;

    clearCartBtnElement.classList.remove("d-none");

    cartAllButtonClickListenerInit();
  }
};

export {
  emptyCartContent,
  cartItems,
  clearCartBtnElement,
  addToCartBtnElements,
  cartButtonClickHandler,
};
