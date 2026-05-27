import { Total,subTotal,getUserDetails,estimatedDeliveryTime } from "./order_summary.js"
import { getCartfromStorage } from "./share-logic.js"
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm'
emailjs.init('qFwMk2ZhBJ-1842dX')



const username=document.querySelector('.js-confirm-name')
const phonenum=document.querySelector('.js-confirm-phone')
const usermail=document.querySelector('.js-confirm-email')
const userAdress=document.querySelector('.js-confirm-address')
const userCity=document.querySelector('.js-confirm-city')
const userState=document.querySelector('.js-confirm-state')
const subtotal=document.querySelector('.js-confirm-subtotal')
const total=document.querySelector('.js-confirm-total')
const updateItemCount=document.querySelector('.js-confirmed-items')
const date=document.querySelector('.js-confirm-date')
const time=document.querySelector('.js-confirm-time')
const paymentmethod=document.querySelector('.js-confirm-payment')
const estimatedTimeDelivery=document.querySelector('.js-estimate-time')
const referenceId=document.querySelector('.js-order-id-value')
const printBtn=document.querySelector('.js-print-btn')
const paymentStatus=document.querySelector('.js-confirm-status')


estimatedTimeDelivery.textContent=estimatedDeliveryTime()

function displayUserInfo(){
  const userInfo=getUserDetails()
  const refId=JSON.parse(localStorage.getItem('chopnow-refId'))||''
  
  username.textContent=`${userInfo.Fname} ${userInfo.Lname}`
  phonenum.textContent=userInfo.phone
  usermail.textContent=userInfo.email
  userAdress.textContent=userInfo.homeAdress
  userCity.textContent=userInfo.city
  userState.textContent=userInfo.state
  date.textContent=refId.date
  time.textContent=refId.time
  paymentmethod.textContent=refId.paymentMethod
  ifCashOnDelivery()
  referenceId.textContent=refId.reference
}

displayUserInfo()


function orderSummary(){
  subtotal.textContent=subTotal()?`₦${subTotal()}`:`₦0.00`
  if(subTotal()){
   total.textContent=`₦${Total()}`
  }else{
    total.textContent=`₦0.00`
  }
 
}

orderSummary()


function numOfItems(){
  let cart=getCartfromStorage()
  updateItemCount.textContent=`${cart.length} items`
}
numOfItems()

printBtn.addEventListener('click',()=>{
  window.print()
})

function ifCashOnDelivery(){
   const refId=JSON.parse(localStorage.getItem('chopnow-refId'))||''
   if(refId.paymentMethod==='cash'){
    paymentStatus.textContent=`pay on delivery`
   }
}