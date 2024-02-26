import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js'

const productGrid = document.querySelector('.products-grid')
const search = document.querySelector('.search-bar')

search.addEventListener('input', (event) => {
    
    let fliteredProduct = products.filter(product => product.name.toLowerCase().includes(event.target.value))

    productsHTML = '';
    fliteredProduct.forEach((product) => {
        productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
            <img class="product-image" src="${product.image}">
            </div>
    
            <div class="product-name limit-text-to-2-lines">${product.name}</div>
    
            <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
    
            <div class="product-price">${product.price} Rs</div>
    
            <div class="product-quantity-container">
            <select class="quantity-selector-${product.id}">
                <option selected value="1">1</option>
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
            </div>
    
            <div class="product-spacer"></div>
    
            <div class="added-to-cart add-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
            </div>
    
            <button class="add-to-cart-button button-primary" data-product-id="${product.id}"> Add to Cart</button>
        </div>`;
    })
    productGrid.innerHTML = productsHTML
})

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
        <div class="product-image-container">
        <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">${product.name}</div>

        <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>

        <div class="product-price">${product.price} Rs</div>

        <div class="product-quantity-container">
        <select class="quantity-selector-${product.id}">
            <option selected value="1">1</option>
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
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart add-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${product.id}"> Add to Cart</button>
    </div>`;
})

productGrid.innerHTML = productsHTML


let addToCartButton = document.querySelectorAll('.add-to-cart-button')

addToCartButton.forEach((button) => {
    button.addEventListener('click', () => {

        const productId = button.dataset.productId
        //  console.log(button.dataset);
        addToCart(productId)

        updateCartQuantity(productId)
    })
})


function updateCartQuantity(productId) {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })

    let Quantity = document.querySelector('.cart-quantity')
    Quantity.textContent = cartQuantity

    // console.log(cart)

    let addToCartMessage = document.querySelector(`.add-to-cart-${productId}`)
    addToCartMessage.classList.add('added-to-cart-visible');
    setTimeout(() => {
        addToCartMessage.classList.remove('added-to-cart-visible');
    }, 2000);
 
    
}

