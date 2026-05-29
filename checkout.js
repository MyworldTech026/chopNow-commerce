import { savethemeToStorage } from "./utils.js"
import { getfullProductDetails, subTotal, Total } from './order_summary.js'
import { getCartfromStorage } from "./share-logic.js"
import { saveDetailsToStorage, getUserDetails, saveOrdertoStorage } from "./order_summary.js"
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm'
emailjs.init('qFwMk2ZhBJ-1842dX')


const cartQuantity = document.querySelector('.js-cart-count')
const subtotal = document.querySelector('.js-subtotal')
const total = document.querySelector('.js-total')
const f_name = document.querySelector('.js-firstname')
const L_name = document.querySelector('.js-lastname')
const E_mail = document.querySelector('.js-email')
const phoneNum = document.querySelector('.js-phone')
const H_address = document.querySelector('.js-address')
const city_name = document.querySelector('.js-city')
const H_state = document.querySelector('.js-state')
const delivery_note = document.querySelector('.js-note')
const placeOrderBtn = document.querySelector('.js-place-order')
const paymentOptions = document.querySelectorAll('.payment-option')
const fillallfieldAlert = document.querySelector('.js-fillallfield')
const cancelpayAlert = document.querySelector('.js-checkout-error')


function deliveryInfo() {
  const Fname = f_name.value
  const Lname = L_name.value
  const email = E_mail.value
  const phone = phoneNum.value
  const homeAdress = H_address.value
  const city = city_name.value
  const state = H_state.value
  const deliveryNote = delivery_note.value

  if (!Fname || !Lname || !email || !phone || !homeAdress || !city || !state) {
    fillallfieldAlert.classList.remove('hidden')
    setTimeout(() => {
      fillallfieldAlert.classList.add('hidden')
    }, 4000)
    return
  }
  let info = {
    Fname,
    Lname,
    email,
    phone,
    homeAdress,
    city,
    state,
    deliveryNote
  }
  fillallfieldAlert.classList.add('hidden')
  saveDetailsToStorage(info)
  clearField()
  return info
}

// clear userdetails field
function clearField() {
  f_name.value = ''
  L_name.value = ''
  E_mail.value = ''
  phoneNum.value = ''
  H_address.value = ''
  city_name.value = ''
  H_state.value = ''
  delivery_note.value = ''
}

//default payment method
let paymentMethod = 'paystack'

//select payment method
paymentOptions.forEach((option) => {
  option.addEventListener('click', (e) => {
    paymentOptions.forEach((opt) => {
      opt.classList.remove('active')
    })
    option.classList.add('active')
    const radio = option.querySelector('.payment-radio')
    paymentMethod = radio.value
  })
})


// trigger payment
placeOrderBtn.addEventListener('click', () => {
  const cart = getCartfromStorage()
  const info = deliveryInfo()
  if (info === undefined) return
  const email = info.email
  const name = `${info.Fname} ${info.Lname}`
  const phone = info.phone
  const homeAddress=info.homeAddress
  const city=info.city
  const state=info.state
  const deliveryNote=info.deliveryNote
  const total = Total()
  if (paymentMethod === 'paystack') {
    if (cart.length === 0) {
      cancelpayAlert.classList.remove('hidden')
      cancelpayAlert.textContent = `cart is empty,go back and add to your cart`
      setTimeout(() => {
        cancelpayAlert.classList.add('hidden')
      }, 3000)
      return
    }
    payWithPaystack(name, email, total, phone,homeAddress, city, state, deliveryNote )
  } 
  
  else if (paymentMethod === 'cash') {
      if(cart.length===0){
         cancelpayAlert.classList.remove('hidden')
      cancelpayAlert.textContent = `cart is empty,go back and add to your cart`
      setTimeout(() => {
        cancelpayAlert.classList.add('hidden')
      }, 3000)
      return
      }
      localStorage.setItem('chopnow-refId', JSON.stringify({
                reference: '#00000000',
                paymentMethod: paymentMethod,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
              }))

const address=buildAddress({ homeAddress, city, state, deliveryNote })
                const emails = {
                name: name,
                email: email,
                subject: `${name.toUpperCase()} PLACE AN ORDER`,
                message: `${address} <h2>${phone}</h2>${prepareEmailMessage()}`
              }
              saveOrdertoStorage(emails);
                sendMail(emails).then(()=>{
                   window.location.href=`confirmation.html`
                })
  }
})


function buildAddress({ homeAddress, city, state, deliveryNote }) {
  const parts = [
    homeAddress && `<h2>${homeAddress}</h2>`,
    city && `<div>${city}</div>`,
    state && `<div>${state}</div>`,
    deliveryNote && `<div>${deliveryNote}</div>`
  ].filter(Boolean);

  return parts.join('\n');
}


// prepares emails body
function prepareEmailMessage() {
  const total = Total()
  let body = ''
  const productdetails = getfullProductDetails().productDetails
  const cart = getCartfromStorage()
  productdetails.forEach((detail) => {
    const id = detail.id
    const finds = cart.find((Quantity) => {
      return id === Quantity.id
    })
    body +=
      `
 <h1>SELLING PRICE PER UNIT:${detail.price}</h1>
   <div>
  <p>Quantity of ${finds.quantity}</p>
  <h3>name:${detail.name}</h3>
  <p>desc:${detail.desc}</p>
  <p>Total price:${detail.price * finds.quantity}</p>
  <p>category:${detail.category}</p>
  <p>id:${detail.id}</p>
  </div>
 `
  })
  return `${body}<h2 style="color:gold;">Total=${total}<h2> <h1>payment method: ${paymentMethod==='paystack'?`${paymentMethod}`:'pay on delivery'}</h1>`
}



//payment with paystack
// function payWithPaystack(name, email, total, phone,homeAddress, city, state, deliveryNote ) {
//   const handler = PaystackPop.setup({
//     key: `pk_test_bcfffaed2cef31a8becd4700c16c89fd54bbb92e`,
//     email: email,
//     amount: total * 100,
//     currency: 'NGN',

//     callback: function (response) {
//       localStorage.setItem('chopnow-refId', JSON.stringify({
//         reference: response.reference,
//         paymentMethod: paymentMethod,
//         date: new Date().toLocaleDateString()
//       }))
       const address=buildAddress({ homeAddress, city, state, deliveryNote })
//       // prepare the email info into an object
//       const emails = {
//         name: name,
//         email: email,
//         subject: `${name.toUpperCase()} PLACE AN ORDER`,
//         message: `${address} <h2>${phone}</h2>${prepareEmailMessage()}`
//       }
//       saveOrdertoStorage(emails);
//       sendMail(emails).then(() => {
//         console.log(`hello`)
//         window.location.href = `../pages/confirmation.html`
//       }).catch((error) => {
//         if (error) {
//           console.log(error)
//           sendMail(emails)
//         }
//       })

//     },

//     onClose: function () {
//       cancelpayAlert.classList.remove('hidden')
//       cancelpayAlert.textContent = `payment cancelled`
//       setTimeout(() => {
//         cancelpayAlert.classList.add('hidden')
//       }, 3000)
//     }
//   })

//   cancelpayAlert.classList.add('hidden')
//   handler.openIframe()
// }


function payWithPaystack(name, email, total, phone,homeAddress, city, state, deliveryNote ) {
  const paystack = new PaystackPop()
  paystack.newTransaction({
    key: `pk_test_bcfffaed2cef31a8becd4700c16c89fd54bbb92e`,
      email: email,
        amount: total * 100,
          currency: 'NGN',
           onSuccess: async (response)=> {
              localStorage.setItem('chopnow-refId', JSON.stringify({
                reference: response.reference,
                paymentMethod: paymentMethod,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
              }))
const address=buildAddress({ homeAddress, city, state, deliveryNote })
              // prepare the email info into an object
              const emails = {
                name: name,
                email: email,
                subject: `${name.toUpperCase()} PLACE AN ORDER`,
                message: `${address} <h2>${phone}</h2>${prepareEmailMessage()}`
              }
              saveOrdertoStorage(emails);
              try{
                await sendMail(emails)
              }
              finally{
                window.location.href=`confirmation.html`
              }
            },

    onCancel: ()=> {
      cancelpayAlert.classList.remove('hidden')
      cancelpayAlert.textContent = `payment cancelled`
      setTimeout(() => {
        cancelpayAlert.classList.add('hidden')
      }, 3000)
    }
  })
}



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



// calculate total item bought and display if for the user to see
function orderSummary() {
  subtotal.textContent = subTotal() ? `₦${subTotal()}` : `₦0.00`
  if (subTotal()) {
    total.textContent = `₦${Total()}`
  } else {
    total.textContent = `₦0.00`
  }

}

orderSummary()


//auto fill user details
function autoUserInfo() {
  const userInfo = getUserDetails()
  f_name.value = userInfo.Fname
  L_name.value = userInfo.Lname
  E_mail.value = userInfo.email
  phoneNum.value = userInfo.phone
  H_address.value = userInfo.homeAdress
  city_name.value = userInfo.city
  H_state.value = userInfo.state
}
autoUserInfo()




async function sendMail(emails) {
  const serviceId = `service_sby1mer`
  const templateId = `template_kgcbojk`
  try {
    await emailjs.send(serviceId, templateId, emails)
  }
  catch (error) {
  console.log(`failed to send email but order saved to database`)
  }
}

// async function sendmail(emails){
//   let retries=3
//   for(let i=0; i<retries;i++){
//     try{
//      await  emailjs.send(serviceId, templateId, emails) 
//      console.log(emails)
//      return
//     }
//     catch(error){
//     console.log(`email attempt ${i+1} failed,retrying`)
//     await new Promise(resolve=>setTimeout(resolve,2000))
//     }
//   }
//   console.log(`email failed after 3 atempt, but order is save to database`)
// }


const html = document.documentElement
const toggleBtn = document.querySelector('.js-theme-toggle')

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
