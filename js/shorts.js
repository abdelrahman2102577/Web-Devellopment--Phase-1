const carticon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#btn-close");
carticon.addEventListener("click", () => {
    cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}
function start() {
    addEvents();
}
function update() {
    addEvents();
    updateTotal();
}
function addEvents() {
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);

    });
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });
    let addCart_btns = document.querySelectorAll(".btn");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

}

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".price").innerHTML;
    let imgscr = product.querySelector(".product-img").src;
    let newtoadd = {
        title,
        price,
        imgscr,
    };



    let cartBoxElement = CartBoxComponent(title, price, imgscr);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}



function handle_removeCartItem() {
    this.parentElement.remove();
    update();
}
function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartbox) => {
        let priceElement = cartbox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartbox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    total = total.toFixed(2);
    totalElement.innerHTML = "$" + total;

}
function CartBoxComponent(title, price, imgscr) {
    return `
    <div class="cart-box">
    <img src=${imgscr} class="cart-img">
    <div class="details-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <img class="cart-remove" src="../images/imgaes-product/jean/delete logo.jpg" >
</div>`;


}