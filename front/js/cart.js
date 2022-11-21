//fetch data from the backend api
fetch('http://localhost:3000/api/products')
.then(data => {
    return data.json();
})
.then(async (allProducts) => {
  const cart = get("products");
  const products = buildCompleteList(cart, allProducts);
  console.log(products)
  await createCartItems(products);
  calculateTotal(products);
  calculateTotalQuantity(products);
  listenForQtyChange(products)
  listenForDeletion(products)     
})

function listenForDeletion(products)
{
  products.forEach(product =>
  {
    const el = document.querySelector(`.cart__item[data-id="${product._id}"][data-color="${product.color}"] .deleteItem`);
    el.addEventListener('click', () =>
    {
      const products = get("products");
      const index = products.findIndex(a => a.id == product._id && a.color == product.color);
      products.splice(index, 1); 
      store('products', products)
      location.reload()
    })
  })
}

function listenForQtyChange(products)
{
  products.forEach(product =>
  {
    const el = document.querySelector(`.cart__item[data-id="${product._id}"][data-color="${product.color}"] .itemQuantity`);
    el.addEventListener('input', (e) =>
    {
      const newQty = e.target.value
      const products = get("products");
      const a = products.find(a => a.id == product._id && a.color == product.color);
      a.qty = Number(newQty);
      store('products', products)
      location.reload()
    })
  })  

}

// insert the elements on the page
function buildCompleteList(cart, allproducts)
{
  const list = [];

  cart.forEach(product => {
    const item = allproducts.find(a => a._id === product.id);
    const a = { ...item };

    a.color = product.color;
    a.qty = product.qty;
    
    list.push(a)
  })   
  
  return list;
}

// appends the products to the page
function createCartItems(list)
{
  const cartItems = document.getElementById("cart__items");

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
    deleteItemEl.className = "deleteItem";
    itemQuantityEl.className = "itemQuantity";
    itemQuantityEl.name = 'itemQuantity'

		imageEl.setAttribute("src", product.imageUrl);
		imageEl.setAttribute("alt", product.altTxt);
    articleEl.setAttribute("data-id", product._id);
		articleEl.setAttribute("data-color", product.color);
		nameEl.innerText = product.name;
		colorEl.innerHTML = product.color;
		priceEl.innerText = `${price(product.price)}`;
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

// calculates the total price
function calculateTotal(list){
  let total = 0
  list.forEach(product => {
    total += (product.price * product.qty)
  })
    const totalPriceEl = document.getElementById('totalPrice')
    totalPriceEl.innerHTML = price(total)
}

// calculates the number of items in the order
function calculateTotalQuantity(list){
  let totalQuantity = 0
  list.forEach(product =>{
    totalQuantity += product.qty
  })
  const totalQuantityEl = document.getElementById("totalQuantity");
  totalQuantityEl.innerHTML = totalQuantity
}

checkUserInput()
// create a function to check the data entered by user and display an error message
function checkUserInput(){

  let firstNameEl = document.getElementById("firstName");
  let lastNameEl = document.getElementById("lastName");
  let addressEl = document.getElementById("address");
  let cityEl = document.getElementById("city");
  let emailEl = document.getElementById("email");
  let orderEl = document.getElementById("order");

  let firstNameErrorEl = document.getElementById("firstNameErrorMsg");
	let lastNameErrorEl = document.getElementById("lastNameErrorMsg");
	let addressErrorEl = document.getElementById("addressErrorMsg");
	let cityErrorEl = document.getElementById("cityErrorMsg");
	let emailErrorEl = document.getElementById("emailErrorMsg");

  // check first name
  firstNameEl.addEventListener('input', ($event) =>{
    	if ($event.target.value.length < 3 || $event.target.value.length > 10) {
				firstNameErrorEl.innerText = "Name must be between 3 and 10 characters";
			} else {
				firstNameErrorEl.innerText = "";
			}
  })
  // check name
 lastNameEl.addEventListener("input", ($event) => {
		if ($event.target.value.length < 3 || $event.target.value.length > 10) {
			lastNameErrorEl.innerText = "Name must be between 3 and 10 characters";
			}
      else{
        lastNameErrorEl.innerText = ""
      }
		});

  //check address
  addressEl.addEventListener("input", ($event) => {
   let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
   if ($event.target.value.match(regex)){
    addressErrorEl.innerText = ""
   } else {
    addressErrorEl.innerText = " please include letters and numbers"
   }
  })
  // check city
  cityEl.addEventListener("input", ($event) => {
		if ($event.target.value.length < 3 || $event.target.value.length > 10) {
			cityErrorEl.innerText = "Name must be between 3 and 10 characters";
		} else {
			cityErrorEl.innerText = "";
		}
 });

  // check email
  emailEl.addEventListener("input", ($event) => {
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if ($event.target.value.match(regex)) {
				emailErrorEl.innerText = "";
		} else {
			emailErrorEl.innerText = " please enter a valid email address";
			}
		});

    orderEl.addEventListener("click", ($event) =>{
      $event.preventDefault()
      const post = {
        firstname:firstNameEl.value,
        lastname:lastNameEl.value,
        address:addressEl.value,
        city:cityEl.value,
        email:emailEl.value,
      }
    })

    function makeRequest(data){
      return new Promise
    }

}

// add event listener to submit button if checkUserInput = true the create contact object

// send object to back end
// details for email regx type="text" pattern=".+@.+\..+" 

// create a contact object from the info and the products
// send to the back end this stage is then done

/*
Collect and analyse the data entered by the user.
● Display an error message if necessary (such as if a user writes
“hello” in the email field).
● Create a contact object (based on the data from the form) and a
product table.

Issues to be aware of:
● Make sure you closely check the data entered by the user
● When using regex to check the data make sure that you have carried
out tests to ensure that regex is working properly
● Don’t forget to display an error message if necessary
Resources:
● Communicating with a web service via an API - How to Make a GET Request end POST Request in Javascript.
● This article on Regex should help you better understand how to check the data entered by a user. Regex can sometimes be difficult to write so feel free to research how to do this (e.g. “regular expressions javascript email”).
● You could take a look at the functional and technical specifications for the project to learn how to send a request to the API.

*/


