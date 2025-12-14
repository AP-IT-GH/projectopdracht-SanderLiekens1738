"use strict";
import productImport from "../assets/JSON/product.json" with { type: 'json' };

function showToast(message) {
  let existingToast = document.querySelector('.toast')
  if (existingToast) existingToast.remove()
  let toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.remove()
  }, 2000)
}

function attachRemoveListener(button, isWishlist = false) {
  button.addEventListener('click', function (event) {
    let buttonClicked = event.target
    if (isWishlist) {
      buttonClicked.parentElement.remove()
    } else {
      buttonClicked.parentElement.parentElement.remove()
    }
    updateCartTotal()
  })
}

let removeFromCart = document.getElementsByClassName('remove')
for (var i = 0; i < removeFromCart.length; i++) {
  attachRemoveListener(removeFromCart[i])
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cartList')[0]
  let cartRow = cartItemContainer.getElementsByClassName('item')
  let total = 0;
  let totalWithBTW = 0;
  for (var i = 0; i < cartRow.length; i++) {
    let cartRows = cartRow[i]
    let priceElement = cartRows.getElementsByClassName('totalPrice')[0]
    let quantityElement = cartRows.getElementsByClassName('quantityInput')[0]
    let price = parseFloat(priceElement.innerText.replace('€', '').replace(',', '.'))
    let quantity = parseInt(quantityElement.innerText)
    total = total + (price * quantity)
    totalWithBTW = totalWithBTW +((price * 1.21) * quantity)
  }
  total = Math.round(total * 100) /100
  document.getElementsByClassName("totalWithBTW")[0].innerText = "Totaal Inc.BTW: €" + totalWithBTW.toFixed(2)
  document.getElementsByClassName("total")[0].innerText = "Totaal: €" + total.toFixed(2)
}

function renderProducts() {
  const grid = document.querySelector('.productGrid')
  if (!grid) return
  let html = ''
  for (let i = 0; i < productImport.length; i++) {
    const p = productImport[i]
    html += `
      <article data-id="${p.id}">
        <div class="productButtons">
          <button class="wishlistButton">Wishlist</button>
          <button class="buyButton" data-id="${p.id}">Kopen</button>
        </div>
        <a href="${p.page}">
          <div class="${p.class} image"></div>
          <div class="overlay">
            <h3 class="shopItemName">${p.name}</h3><br>
            <p>${p.description}</p>
          </div>
        </a>
        <p class="productPrice">€${p.price.toFixed(2)}</p>
      </article>`
  }
  grid.innerHTML = html
}
renderProducts()
attachProductListeners()

function attachProductListeners() {
  for (var i = 0; i < productImport.length; i++) {
    const product = productImport[i]
    const buyButton = document.querySelector(`[data-id="${product.id}"] .buyButton`)
    const wishButton = document.querySelector(`[data-id="${product.id}"] .wishlistButton`)
    
    if (buyButton) {
      buyButton.addEventListener('click', function(event) {
        const title = product.name
        const price = product.price
        const imageSrc = product.image
        addItemToCart(title, price, imageSrc)
        showToast(title + ' toegevoegd aan winkelwagen!')
      })
    }
    
    if (wishButton) {
      wishButton.addEventListener('click', function(event) {
        const title = product.name 
        const imageSrc = product.image
        addToWishList(title, imageSrc)
        showToast(title + ' toegevoegd aan favorieten!')
      })
    }
  }
}

function addItemToCart(title, price, imageSrc) {
  let cartItems = document.getElementsByClassName('cartList')[0]
  let cartRows = cartItems.getElementsByClassName('item')
  
  let existingItem = null
  for (var i = 0; i < cartRows.length; i++) {
    let productName = cartRows[i].getElementsByClassName('productName')[0]
    if (productName.innerText === title) {
      existingItem = cartRows[i]
      break
    }
  }
  
  if (existingItem) {
    let quantityElement = existingItem.getElementsByClassName('quantityInput')[0]
    let currentQuantity = parseInt(quantityElement.innerText)
    quantityElement.innerText = currentQuantity + 1
  } else {
    let cartRow = document.createElement('div')
    cartRow.classList.add('item')
    cartRow.classList.add('item-added')
    let cartRowContents = `
          <div class="photo">
            <img src="${imageSrc}" alt="">
          </div>
          <div class="productName">${title}</div>
          <div class="totalPrice">€${price}</div>          
          <div class="quantity">
            <button class="minus"><</button>
            <p class="quantityInput">1</p>
            <button class="plus">></button>
            <button class="remove">verwijder</button>
          </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow)
    
    let removeButton = cartRow.querySelector('.remove')
    attachRemoveListener(removeButton)

    let minusButton = cartRow.querySelector('.minus')
    let plusButton = cartRow.querySelector('.plus')
    let quantityInput = cartRow.querySelector('.quantityInput')
    
    plusButton.addEventListener('click', function(event) {
      let currentNumber = parseInt(quantityInput.innerText)
      quantityInput.innerText = currentNumber + 1
      updateCartTotal()
    })
    
    minusButton.addEventListener('click', function(event) {
      let currentNumber = parseInt(quantityInput.innerText)
      if (currentNumber > 1) {
        quantityInput.innerText = currentNumber - 1
      } else {
        cartRow.remove()
      }
      updateCartTotal()
    })
  }
  updateCartTotal()
}

function addToWishList(title, imageSrc) {
  let wishlistItems = document.getElementsByClassName('wishlistItems')[0]
  let wishlistRow = wishlistItems.getElementsByClassName('item')
  let existingWishItem = null
  
  for (var i = 0; i < wishlistRow.length; i++) {
    let wishProductName = wishlistRow[i].getElementsByClassName('wishProductName')[0]
    if (wishProductName.innerText === title) {
      existingWishItem = wishlistRow[i]
      break
    }
  }
  
  if (!existingWishItem) {
    let wishRow = document.createElement('div')
    wishRow.classList.add('item')
    wishRow.classList.add('item-added')
    let wishRowContents = `
          <div class="photo">
            <img src="${imageSrc}" alt="">
          </div>
          <div class="wishProductName">${title}</div>
          <button class="remove">verwijder</button>`          
    wishRow.innerHTML = wishRowContents
    wishlistItems.appendChild(wishRow)
    
    let wishRemoveButton = wishRow.querySelector('.remove')
    attachRemoveListener(wishRemoveButton, true)
  }
}

let kopenButton = document.getElementsByClassName('kopen')[0]
if (kopenButton) {
  kopenButton.addEventListener('click', function(event) {
    let cartItems = document.getElementsByClassName('cartList')[0].getElementsByClassName('item')
    if (cartItems.length > 0) {
      showToast('Bestelling geplaatst!')
      document.getElementsByClassName('cartList')[0].innerHTML = ''
      updateCartTotal()
    } else {
      showToast('Winkelwagen is leeg!')
    }
  })
}