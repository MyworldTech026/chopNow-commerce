import menuItems from './data.js'
import { getCartfromStorage } from './share-logic.js'
import { savethemeToStorage } from './utils.js'
import { saveFoodcartToStorage } from './share-logic.js'
import { addToCart } from './share-logic.js'



let cart=getCartfromStorage()
const html = document.documentElement
const toggleBtn = document.querySelector('.js-theme-toggle')
const menuGrid = document.querySelector('.js-menu-grid')
const cartQuantity = document.querySelector('.js-cart-count')
const categoryDiv = document.querySelector('.js-category-tabs')



// render food product on the menu page
function renderMenuItems(menuItems) {
    document.querySelector('.js-menu-stat').textContent=`${menuItems.length} +`
  let productCard = ''
  menuItems.forEach((item) => {
    productCard += `
<div class="menu-card" data-id="${item.id}">

  <div class="menu-card-image-wrap">
    <img class="menu-card-image" src="${item.image}" alt="${item.name}" />
    <div class="menu-card-category">${item.category}</div>
  </div>

  <div class="menu-card-body">
    <h3 class="menu-card-name">${item.name}</h3>
    <p class="menu-card-desc">${item.desc}</p>

    <div class="menu-card-footer">
      <div class="menu-card-price">
        ₦${item.price.toLocaleString()}
        <span>• ${item.time}</span>
      </div>
      <button class="js-add-to-cart" data-id="${item.id}">+</button>
    </div>
  </div>

</div>
`
  })
  menuGrid.innerHTML = productCard
}

renderMenuItems(menuItems)

//filter menuitems
categoryDiv.addEventListener('click', (e) => {
  const categoryBtn = e.target.closest('.js-category-btn')
  if (!categoryBtn) return
  const category = categoryBtn.dataset.category
  const filtered = menuItems.filter((filter) => {
    return category === 'all' ? menuItems : filter.category === category
  })
  renderMenuItems(filtered)
})


// add item to cart
menuGrid.addEventListener('click', (e) => {
  const addItemBtn = e.target.closest('.js-add-to-cart')
  if (!addItemBtn) return
  const id = Number(addItemBtn.dataset.id)
  let cart = addToCart(id)
  //localStorage.removeItem('foodCart')
 saveFoodcartToStorage(cart)
  updateCartQuantity()
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



//user theme on last page visit
const userPreferedTheme = localStorage.getItem('usertheme')
if (userPreferedTheme) {
  html.setAttribute('data-theme', userPreferedTheme)
}

// theme changer
toggleBtn.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme')
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  html.setAttribute('data-theme', newTheme)
  savethemeToStorage(newTheme)
})

