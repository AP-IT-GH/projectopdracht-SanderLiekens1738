
//voorlopig werkt het nog niet want ik nog niet echt weet wat ik juist moet doen om dit te laten werken.
//zal wat verder moeten researchen hierover en zal het later nog eens proberen.
const buyButtons = document.querySelectorAll('.buy-button');
const wishlistButtons = document.querySelectorAll('.wishlist-button');
const buyProductCard = buyButtons.closest("buy")
const wishListButtons = wishlistButtons.closest("wishlist")

//buy
buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log("Button clicked!");
  });
});

//wishlist
wishlistButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log("Button clicked!");
  });
});
console.log(productCard);
