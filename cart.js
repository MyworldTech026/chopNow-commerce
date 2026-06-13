import { getproduct } from '../data.js'
import {addToCart, saveFoodcartToStorage , inc_dec,getCartfromStorage} from './share-logic.js'
import { savethemeToStorage } from '../toolbox/utils.js'
import {getfullProductDetails,subTotal,Total} from './order_summary.js'

const cart=getCartfromStorage()
let menuItems=[]
getproduct((data)=>{
menuItems=data
displayCartItem(cart)
})


const cartQuantity = document.querySelector('.js-cart-counts')
const cartGrid = document.querySelector('.js-cart-list')
const emptycartAlert=document.querySelector('.js-cart-empty')
const clearCartBtn=document.querySelector('.js-clear-cart')
const updateItemCount=document.querySelector('.js-cart-items-count')
const subtotal=document.querySelector('.js-subtotal')
const total=document.querySelector('.js-total')

function displayCartItem(cart){
let cartdisplay = ''
cart.forEach((foodItem) => {
  const id = foodItem.id
  let item;
  menuItems.forEach((menu) => {
    if (id === menu.id) {
      item = menu
    }
  })
  cartdisplay +=
    ` 
  <div class="cart-item" data-id="${item.id}">

  <img class="cart-item-image" src="${item.image}" alt="${item.name}" />

  <div class="cart-item-info">
    <div class="cart-item-name">${item.name}</div>
    <div class="cart-item-category">${item.category}</div>
    <div class="cart-item-price">₦${(item.price * foodItem.quantity).toLocaleString()}</div>
  </div>

  <div class="js-cart-item-controls cart-item-controls">
    <button class="qty-btn js-decrease" data-id="${item.id}">−</button>
    <span class="cart-item-qty">${foodItem.quantity}</span>
    <button class="qty-btn js-increase" data-id="${item.id}">+</button>
  </div>

  <button class="js-remove-item" data-id="${item.id}">✕</button>

</div>
  `
})
cartGrid.innerHTML = cartdisplay
if(cart.length===0){
  document.querySelector('.js-cart-actions').classList.add('hidden')
}else{
document.querySelector('.js-cart-actions').classList.remove('hidden')
}
}
// displayCartItem(cart)

let filteredCart;
cartGrid.addEventListener('click', (e) => {
  const increase = e.target.closest('.js-increase')
  const decrease = e.target.closest('.js-decrease')
  const deleteItem = e.target.closest('.js-remove-item')
 
  if (increase) {
   const id = Number(increase.dataset.id)
  const cart= inc_dec('js-increase',id)
  saveFoodcartToStorage(cart)
   displayCartItem(cart)
  updateCartQuantity()
  orderSummary()
  }

  if (decrease) {
   const id = Number(decrease.dataset.id)
  const cart= inc_dec('js-decrease',id)
  //console.log(cart)
  //if(cart.quantity===1)return
  saveFoodcartToStorage(cart)
   displayCartItem(cart)
  updateCartQuantity()
  orderSummary()
  }

  if (deleteItem) {
    let cart=getCartfromStorage()
    const id =Number(deleteItem.dataset.id)
   let carts= cart.filter((item)=>{
      return id !==item.id
    })
  
  
    saveFoodcartToStorage(carts)
   displayCartItem(carts)
    updateCartQuantity()
    emptyCart()
    orderSummary()
     numOfItems()
  }
})


// update cart quantity
function updateCartQuantity() {
  let cart = getCartfromStorage()
  let Quantity = 0
  if (cart.length === 0) {
    cartQuantity.classList.add('hidden')
    return
  }
  cart.forEach((cartItem) => {
    Quantity += cartItem.quantity
  })
  cartQuantity.classList.remove('hidden')
  cartQuantity.textContent = Quantity
}

updateCartQuantity()


function emptyCart(){
   let cart=getCartfromStorage()
   if(cart.length===0){
    emptycartAlert.classList.remove('hidden')
   }
}
emptyCart()

clearCartBtn.addEventListener('click',()=>{
let cart=getCartfromStorage()
cart.length=0
saveFoodcartToStorage(cart)
displayCartItem(cart)
updateCartQuantity()
emptyCart()
numOfItems()
orderSummary()

})


function numOfItems(){
  let cart=getCartfromStorage()
  updateItemCount.textContent=`${cart.length} items`
}
numOfItems()



function orderSummary(){
  subtotal.textContent=subTotal()?`₦${subTotal()}`:`₦0.00`
  if(subTotal()){
   total.textContent=`₦${Total()}`
  }else{
    total.textContent=`₦0.00`
  }
 
}

orderSummary()


const html = document.documentElement
const toggleBtn = document.querySelector('.js-theme-togglebtn')

// user theme on last page visit
const userPreferedTheme = localStorage.getItem('usertheme')
if (userPreferedTheme) {
  html.setAttribute('data-theme', userPreferedTheme)
}

// theme changer
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', newTheme)
    savethemeToStorage(newTheme)
  })
}





