import { cartButtonClickHandler } from "./cart";
import products from "./../data/products.json" assert { type: "json" };

const showAllProducts = () => {
  let productListWrapperElement = document.getElementById("productListWrapper");
  let productElement = "";

  products.forEach((item) => {
    productElement += `<div class="col-lg-4 col-md-6 mt-4">
        <div class="card p-3" style="border: 2px solid #CCC;">

            <div class="d-flex justify-content-between align-items-center mb-4 ">
                <img src="${item.photo}" width="100%">
            </div>
            
            <h6>${item.name}</h6>
            
            <div class="d-flex flex-xl-row flex-lg-column justify-content-between align-items-center">
                <span class="item mb-lg-2 mb-xl-0">$ <strong>${item.price}</strong></span>
                <div class="d-flex">
                    <select class="qty form-select me-2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button class="item btn btn-sm btn-primary addToCartBtn text-nowrap" data-id="${item.ID}">Add to cart</button>
                </div>
            </div>
        </div>
    </div>`;
  });

  productListWrapperElement.innerHTML = productElement;

  addToCartButtonClickLister();
};

const addToCartButtonClickLister = () => {
  let elements = document.querySelectorAll(".addToCartBtn");

  elements.forEach((element) => {
    element.addEventListener("click", (evt) => {
      const qtyElement = evt.target.parentElement.querySelector(".qty");

      cartButtonClickHandler(
        evt,
        qtyElement.options[qtyElement.selectedIndex].value
      );

      // reset quantity to 1
      qtyElement.value = 1;
    });
  });
};

export { showAllProducts, products };
