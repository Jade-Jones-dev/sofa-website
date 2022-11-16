const cartItems = document.getElementById("cart__items");
const list = [];
//fetch data from the backend api
fetch('http://localhost:3000/api/products')
.then(data => {
    return data.json();
})
.then(allProducts => {
    const cart = JSON.parse(localStorage.getItem("products"));
    const products = buildCompleteList(cart, allProducts);
    // console.log(products);
     
})
// insert the elements on the page
function buildCompleteList(cart, Allproducts){
    cart.forEach(product => {
        const item = Allproducts.find(a => a._id === product.id);
        item.color = product.color;
        item.qty = product.qty;
        list.push(item)
        })   
    console.log(list);
    createCartItems(list);
    calculateTotal(list);
    calculateTotalQuantity(list);
   
}

 
function createCartItems(list){
  list.forEach((product) => {
		let articleEl = document.createElement("article");
		let imageDivEl = document.createElement("div");
    let imageEl = document.createElement('img')
		let cartEl = document.createElement("div");
		let cartDivEl = document.createElement("div");
		let nameEl = document.createElement("h2");
		let colorEl = document.createElement("p");
		let priceEl = document.createElement("p");
    let cartElContent = document.createElement("div");
		let cartElContentQuantity = document.createElement("div");
		let cartPEl = document.createElement("p");
    let deleteEl = document.createElement('div');
    let deleteItemEl = document.createElement('p');
    let itemQuantityEl = document.createElement('input')

		articleEl.className = "cart__item";
		imageDivEl.className = "cart__item__img";
		cartEl.className = "cart__item__content";
		cartDivEl.className = "cart__item__content__description";
    cartElContent.className = "cart__item__content__settings";
		cartElContentQuantity.className = "cart__item__content__settings__quantity";
    deleteEl.className = "cart__item__content__settings__delete";
    itemQuantityEl.className = "itemQuantity";
    itemQuantityEl.name = 'itemQuantity'

		imageEl.setAttribute("src", product.imageUrl);
		imageEl.setAttribute("alt", product.altTxt);
    articleEl.setAttribute("data-id", product._id);
		articleEl.setAttribute("data-color", product.color);
		nameEl.innerText = product.name;
		colorEl.innerHTML = product.color;
		priceEl.innerText = `€${product.price}`;
		cartPEl.innerHTML = `Quantity : `;
    deleteItemEl.innerHTML = `Delete`;
    itemQuantityEl.setAttribute('type', "number")
    itemQuantityEl.setAttribute('value', product.qty);
    itemQuantityEl.setAttribute('min', 1);
    itemQuantityEl.setAttribute('max', 100);


    deleteEl.append(deleteItemEl)
    cartElContentQuantity.append(cartPEl, itemQuantityEl)
    cartElContent.append(cartElContentQuantity, deleteEl);
		cartDivEl.append(nameEl, colorEl, priceEl, cartElContent);
    imageDivEl.append(imageEl)
		cartEl.append(cartDivEl);
		articleEl.append(imageDivEl, cartEl);
		cartItems.append(articleEl); 
	})
}



function calculateTotal(list){
  let total = 0
  list.forEach(product => {
    total += (product.price * product.qty)
  })
    const totalPriceEl = document.getElementById('totalPrice')
    totalPriceEl.innerHTML = total
}

function calculateTotalQuantity(list){
  let totalQuantity = 0
  list.forEach(product =>{
    totalQuantity += product.qty
  })
  const totalQuantityEl = document.getElementById("totalQuantity");
  totalQuantityEl.innerHTML = totalQuantity
}
// steps for step 9
// display the total
// add event listener to delte button
// add event listener to edit the quantity

// steps for step 10
// chreck details entered by user
// display an error message if necessary
