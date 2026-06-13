import { getCartfromStorage } from "./share-logic.js";
//import { menuItems } from '../data.js'

let menuItems=JSON.parse(localStorage.getItem('chopnowfullproductdata'))
//let cart=getCartfromStorage()


export function getfullProductDetails() {
  let cart = getCartfromStorage()
  let totalQuantity = []
  let productDetails=[]

  cart.forEach((item) => {
    const id = item.id

    let findItem = menuItems.find((product) => {
      return id === product.id
    })
    totalQuantity.push(findItem.price * item.quantity)
    productDetails.push(findItem)
  })
  return {totalQuantity,productDetails}
}


export function subTotal() {
  let subtotal = 0
  let listOfPrices = getfullProductDetails().totalQuantity
  listOfPrices.forEach((item) => {
    subtotal += item
  })

  return subtotal
}

export function Total() {
  let total = subTotal() + 1000 + 100
  return total
}

export function saveDetailsToStorage(info){
  localStorage.setItem('userInfo',JSON.stringify(info))
}

export function getUserDetails(){
  try{
  const userDetails=JSON.parse(localStorage.getItem('userInfo'))
  if(userDetails===null) return ''
  return userDetails
  }
  catch(error){
 return []
  }
}

export function estimatedDeliveryTime(){
  const productDetails=getfullProductDetails().productDetails
 
 let time= productDetails.map((time)=>{
  return parseInt(time.time)
  }).reduce((accum,number)=>{
    let total=accum+number
    return total
  },0)  
  if(productDetails.length===0) return
  time=time+40
  let hour=Math.floor(time/60)
  let min=time%60.
  const readableTimeFormats=`${hour===0?'':`${hour} hr`} ${min===0?'':`${min} mins`}`
 return readableTimeFormats
}

export function saveOrdertoStorage(order){
  localStorage.setItem('chopnow_order',JSON.stringify(order))
}
