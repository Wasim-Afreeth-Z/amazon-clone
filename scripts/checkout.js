
import { cart, removeFormCart, updateDeliveryOption, saveToStorge, addToCart } from '../data/cart.js'
import { products, getProduct } from '../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOptions.js'


// left side order summary
function renderOrderSummary() {

    let cartSummaryHTML = ''

    cart.forEach((cartItem) => {
        const productId = cartItem.productId

        const matchingProduct = getProduct(productId)

        const deliveryOptionId = cartItem.deliveryOptionId

        const deliveryOption = getDeliveryOption(deliveryOptionId)

        const today = dayjs()
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, MMMM, D')

        cartSummaryHTML += `
        <div class="cart-item-container carts-item-container-${matchingProduct.id} ">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            ${matchingProduct.price} Rs
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="delete-quantity-link link-primary" data-product-id='${matchingProduct.id}'>
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
        </div>
        </div>
    </div>`
    })

    function deliveryOptionHTML(matchingProduct, cartItem) {
        let html = ''

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs()
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
            const dateString = deliveryDate.format('dddd, MMMM, D')

            const pricsString = deliveryOption.price === 0 ? 'FREE' : `${deliveryOption.price} Rs`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `  <div class="delivery-option" data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
        <div>
            <div class="delivery-option-date"> ${dateString} </div>
            <div class="delivery-option-price"> ${pricsString} - Shipping</div>
        </div>
        </div>`
        })

        return html
    }

    const orderSummary = document.querySelector('.order-summary')
    orderSummary.innerHTML = cartSummaryHTML

    let removeItem = document.querySelectorAll('.delete-quantity-link')

    removeItem.forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            removeFormCart(productId)

            // let deleteitem = document.querySelector(`.carts-item-container-${productId} `)
            // deleteitem.remove()
            // updateCartQuantity()
            renderOrderSummary();
            renderPaymentSummary()
        })
    })

    function updateCartQuantity() {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.return-to-home-link').textContent = `${cartQuantity} items`;
    }

    updateCartQuantity();

    let deliveryBox = document.querySelectorAll('.delivery-option')

    deliveryBox.forEach((element) => {
        element.addEventListener('click', () => {
            const productId = element.dataset.productId
            const deliveryOptionId = element.dataset.deliveryOptionId
            updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary()
            renderPaymentSummary()
        })

    })

}

renderOrderSummary()

// right side payment summary

function renderPaymentSummary() {
    let productPrice = 0
    let shippingPrice = 0

    cart.forEach((cartItem) => {
        const products = getProduct(cartItem.productId)
        productPrice += products.price * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPrice += deliveryOption.price
    })

    const totalBeforeTax = productPrice + shippingPrice
    const tax = Math.round(totalBeforeTax * 0.1)
    const totalamount = totalBeforeTax + tax

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const paymentSummaryHTML = `
            <div class="payment-summary-title">
            Order Summary
            </div>

            <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">${productPrice} Rs</div>
            </div>

            <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${shippingPrice} Rs</div>
            </div>

            <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${totalBeforeTax} Rs</div>
            </div>

            <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${tax} Rs</div>
            </div>

            <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${totalamount} Rs</div>
            </div>

            <button class="place-order-button button-primary">Place your order</button>
        `

    const paymenSummary = document.querySelector('.payment-summary')
    paymenSummary.innerHTML = paymentSummaryHTML
}

renderPaymentSummary()

// let cardempty=document.querySelector('.card-empty')
let orderedmessage = document.querySelector('.ordered-message')
let viewProduct = document.querySelector('.view')
const placeOrderButton = document.querySelector('.place-order-button')


placeOrderButton.addEventListener('click', () => {
    localStorage.removeItem('cart')

    // cardempty.textContent='Your cart empty.'
    orderedmessage.textContent = 'Order was Placed !!!'
    setTimeout(() => {
        orderedmessage.textContent = ''
    }, 3000);

    viewProduct.innerHTML = `<a href="index.html" class="view-product">For More Products</a>`

    const orderSummary = document.querySelector('.order-summary')
    orderSummary.innerHTML = ''
    
    const paymenSummary = document.querySelector('.payment-summary')
    paymenSummary.innerHTML=''

})




