export function getCartfromStorage(){
  try{
  let cart = JSON.parse(localStorage.getItem('foodCart'))
  if(cart===null) return []
  return cart
  }
  catch(error){
   return []
  }
}

let cart=getCartfromStorage()

export function addToCart(id) {
  let existing = cart.find((item) => {
    return id === item.id
  })
  if (existing) {
    existing.quantity++
  } else {
    cart.push({
      id: id,
      quantity: 1
    })
  }
  //console.log(cart)
  return cart
}


export function inc_dec(classname, id) {
let cart=getCartfromStorage()
  if (classname === 'js-increase') {
    let existing = cart.find((item) => {
      return id === item.id
    })
    if (existing) {
      existing.quantity++
    }
  }
  else if (classname === 'js-decrease') {
    let existing = cart.find((item) => {
      return id === item.id
    })
    if (existing) {
     if(existing.quantity===1)return cart
     console.log(`penetrate`)
      existing.quantity--
    }
  }
  return cart
}


export function saveFoodcartToStorage(cart) {
  localStorage.setItem('foodCart', JSON.stringify(cart))
}
