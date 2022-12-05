const firstNameEl = document.getElementById("firstName");
const lastNameEl = document.getElementById("lastName");
const addressEl = document.getElementById("address");
const cityEl = document.getElementById("city");
const emailEl = document.getElementById("email");
const orderEl = document.getElementById("order");
const itemQuantityEl = document.getElementsByClassName(".itemQuantity");

//fetch data from the backend api
fetch("http://localhost:3000/api/products")
	.then((data) => {
		return data.json();
	})
	.then(async (allProducts) => {
		const cart = get("products");
		const products = buildCompleteList(cart, allProducts);
		console.log(products);
		await createCartItems(products);
		calculateTotal(products);
		calculateTotalQuantity(products);
		listenForQtyChange(products);
		listenForDeletion(products);
		checkUserInput();
		listenForSubmission();
	});

// event listener to delete products from cart
function listenForDeletion(products) {
	products.forEach((product) => {
		const el = document.querySelector(
			`.cart__item[data-id="${product._id}"][data-color="${product.color}"] .deleteItem`
		);
		el.addEventListener("click", () => {
			const products = get("products");
			const index = products.findIndex(
				(a) => a.id == product._id && a.color == product.color
			);
			products.splice(index, 1);
			store("products", products);
			location.reload();
		});
	});
}

// event listener to update product quantities in cart
function listenForQtyChange(products) {
	products.forEach((product) => {
		const el = document.querySelector(
			`.cart__item[data-id="${product._id}"][data-color="${product.color}"] .itemQuantity`
		);

		el.addEventListener("input", (e) => {
			const newQty = e.target.value;
			const products = get("products");
			const a = products.find(
				(a) => a.id == product._id && a.color == product.color
			);
			// checking if the new quantity is less than 1
			if(newQty < 1){
				const index = products.findIndex(
					(a) => a.id == product._id && a.color == product.color
				);
				products.splice(index, 1);
			}
			else{
			a.qty = Number(newQty);
			}
			
			store("products", products);
			location.reload();
		});
	});
}

// insert the elements on the page
function buildCompleteList(cart, allproducts) {
	const list = [];

	cart.forEach((product) => {
		const item = allproducts.find((a) => a._id === product.id);
		const a = { ...item };
		a.color = product.color;
		a.qty = product.qty;
		list.push(a);
	});
	return list;
}

// appends the products to the page
function createCartItems(list) {
	const cartItems = document.getElementById("cart__items");

	list.forEach((product) => {
		let articleEl = document.createElement("article");
		let imageDivEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let cartEl = document.createElement("div");
		let cartDivEl = document.createElement("div");
		let nameEl = document.createElement("h2");
		let colorEl = document.createElement("p");
		let priceEl = document.createElement("p");
		let cartElContent = document.createElement("div");
		let cartElContentQuantity = document.createElement("div");
		let cartPEl = document.createElement("p");
		let deleteEl = document.createElement("div");
		let deleteItemEl = document.createElement("p");
		let itemQuantityEl = document.createElement("input");

		articleEl.className = "cart__item";
		imageDivEl.className = "cart__item__img";
		cartEl.className = "cart__item__content";
		cartDivEl.className = "cart__item__content__description";
		cartElContent.className = "cart__item__content__settings";
		cartElContentQuantity.className = "cart__item__content__settings__quantity";
		deleteEl.className = "cart__item__content__settings__delete";
		deleteItemEl.className = "deleteItem";
		itemQuantityEl.className = "itemQuantity";
		itemQuantityEl.name = "itemQuantity";

		imageEl.setAttribute("src", product.imageUrl);
		imageEl.setAttribute("alt", product.altTxt);
		articleEl.setAttribute("data-id", product._id);
		articleEl.setAttribute("data-color", product.color);
		nameEl.innerText = product.name;
		colorEl.innerHTML = product.color;
		priceEl.innerText = `${price(product.price)}`;
		cartPEl.innerHTML = `Quantity : `;
		deleteItemEl.innerHTML = `Delete`;
		itemQuantityEl.setAttribute("type", "number");
		itemQuantityEl.setAttribute("value", product.qty);
		itemQuantityEl.setAttribute("min", 1);
		itemQuantityEl.setAttribute("max", 100);

		deleteEl.append(deleteItemEl);
		cartElContentQuantity.append(cartPEl, itemQuantityEl);
		cartElContent.append(cartElContentQuantity, deleteEl);
		cartDivEl.append(nameEl, colorEl, priceEl, cartElContent);
		imageDivEl.append(imageEl);
		cartEl.append(cartDivEl);
		articleEl.append(imageDivEl, cartEl);
		cartItems.append(articleEl);
	});
}

// calculates the total price
function calculateTotal(list) {
	let total = 0;
	list.forEach((product) => {
		total += product.price * product.qty;
	});
	const totalPriceEl = document.getElementById("totalPrice");
	totalPriceEl.innerHTML = price(total);
}

// calculates the number of items in the order
function calculateTotalQuantity(list) {
	let totalQuantity = 0;
	list.forEach((product) => {
		totalQuantity += product.qty;
	});
	const totalQuantityEl = document.getElementById("totalQuantity");
	totalQuantityEl.innerHTML = totalQuantity;
}

// validating user input
function checkUserInput() {
	let firstNameErrorEl = document.getElementById("firstNameErrorMsg");
	let lastNameErrorEl = document.getElementById("lastNameErrorMsg");
	let addressErrorEl = document.getElementById("addressErrorMsg");
	let cityErrorEl = document.getElementById("cityErrorMsg");
	let emailErrorEl = document.getElementById("emailErrorMsg");

	firstNameEl.addEventListener("input", ($event) => {
		hideError(firstNameErrorEl)
		if (!isFirstNameValid($event.target.value)) {
			showError(
				firstNameErrorEl,
				"First name must be between 3 and 10 characters"
			);
		} 
	});
// check name
	lastNameEl.addEventListener("input", ($event) => {
		hideError(lastNameErrorEl);
		if (!isLastNameValid($event.target.value)) {
			showError(
				lastNameErrorEl,
				"Last name must be between 3 and 10 characters"
			);
		} 
	});
//check address
	addressEl.addEventListener("input", ($event) => {
		hideError(addressErrorEl);
		if (!isAddressValid($event.target.value)) {
			showError(addressErrorEl, " please include letters and numbers");
		}
	});
// check city
	cityEl.addEventListener("input", ($event) => {
		hideError(cityErrorEl);
		if (!isCityValid($event.target.value)) {
			showError(cityErrorEl, "City must be between 3 and 10 characters");
		} 
	});

// check email
	emailEl.addEventListener("input", ($event) => {
		hideError(emailErrorEl)
		if (!isEmailValid($event.target.value)) {
			showError(emailErrorEl, " please enter a valid email address");
		}
	});

	
}

// event listener for when form is submitted
function listenForSubmission(){
	orderEl.addEventListener("click", ($event) => {
	$event.preventDefault();
	// const isCartEmpty = !has("products");
	const isFormValid =
		isFirstNameValid(firstNameEl.value) &&
		isLastNameValid(lastNameEl.value) &&
		isCityValid(cityEl.value) &&
		isAddressValid(addressEl.value) &&
		isEmailValid(emailEl.value)

	 const products = get("products");
	 
	 if (!isFormValid || products.length < 1) {
		alert("Please check your details and that you have items in your cart");
		return;
	}
		{
	const productIds = get("products").map((a) => a.id);
		
	const contact = {
		firstName: firstNameEl.value,
		lastName: lastNameEl.value,
		address: addressEl.value,
		city: cityEl.value,
		email: emailEl.value,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			contact: contact,
			products: productIds,
			}),
		};
		fetch("http://localhost:3000/api/products/order/", options)
			.then((data) => {
				if (!data.ok) {
					throw Error(data.status);
				}
				return data.json();
				})
			.then((newData) => {
				console.log(newData);
				const orderId = newData.orderId;
				location.href = "confirmation.html?orderId=" + orderId
			});
		}
	});
}

// display error message
function showError(el, message){
	el.innerText = message
}

//hide error message
function hideError(el){
	el.innerText = ""
}

function isFirstNameValid(value){
	value = value.trim(' ')
	if (value.length > 3 && value.length < 10){
		return true;
	}	
	return false;
}

// check if length of first name correct
function isLastNameValid(value) {
	value = value.trim(' ')
	if (value.length > 3 && value.length < 10) {
		return true;
	}
	return false;
}

// check if address contains letters and numbers
function isAddressValid(value) {
	value = value.trim(' ');
	let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
	if (value.match(regex)){
		return true;
	}
	return false;
}

// check if city is valid
function isCityValid(value) {
	value = value.trim(' ');
	if (value.length > 3 && value.length < 10) {
		return true;
	}
	return false;
}

// check if the email address is a valid email
function isEmailValid(value) {
	let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (value.match(regex)) {
		return true;
	}
	return false;
}


