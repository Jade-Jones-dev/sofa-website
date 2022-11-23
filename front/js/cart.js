const firstNameEl = document.getElementById("firstName");
const lastNameEl = document.getElementById("lastName");
const addressEl = document.getElementById("address");
const cityEl = document.getElementById("city");
const emailEl = document.getElementById("email");
const orderEl = document.getElementById("order");

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
	});

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
			a.qty = Number(newQty);
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

checkUserInput();
function checkUserInput() {
	let firstNameErrorEl = document.getElementById("firstNameErrorMsg");
	let lastNameErrorEl = document.getElementById("lastNameErrorMsg");
	let addressErrorEl = document.getElementById("addressErrorMsg");
	let cityErrorEl = document.getElementById("cityErrorMsg");
	let emailErrorEl = document.getElementById("emailErrorMsg");

	firstNameEl.addEventListener("input", ($event) => {
		if ($event.target.value.length < 3 || $event.target.value.length > 10) {
			firstNameErrorEl.innerText =
				"First name must be between 3 and 10 characters";
		} else {
			firstNameErrorEl.innerText = "";
		}
	});
	// check name
	lastNameEl.addEventListener("input", ($event) => {
		if ($event.target.value.length < 3 || $event.target.value.length > 10) {
			lastNameErrorEl.innerText =
				"Last name must be between 3 and 10 characters";
		} else {
			lastNameErrorEl.innerText = "";
		}
	});

	//check address
	addressEl.addEventListener("input", ($event) => {
		let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
		if ($event.target.value.match(regex)) {
			addressErrorEl.innerText = "";
		} else {
			addressErrorEl.innerText = " please include letters and numbers";
		}
	});
	// check city
	cityEl.addEventListener("input", ($event) => {
		if ($event.target.value.length < 3 || $event.target.value.length > 10) {
			cityErrorEl.innerText = "City must be between 3 and 10 characters";
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

	orderEl.addEventListener("click", ($event)=> {
    $event.preventDefault();
     
    if (
			firstNameEl.value  &&
			lastNameEl.value  &&
			firstNameEl.value &&
			addressEl.value  &&
			cityEl.value  &&
			emailEl.value 
		) {
      const cartList = get("products");
			let productList = new Array()
      cartList.forEach((product) =>{
        let productID = product.id
        productList.push(productID)
        console.log(productList)
      })
       const contact = {
					firstName: firstNameEl.value,
					lastName: lastNameEl.value,
					address: addressEl.value,
					city: cityEl.value,
					email: emailEl.value,
				};
      const newData = {
        contact, productList
      }
      console.log(newData)

      const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newData),
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
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			alert("you need to fill in your details");
		}
  })
}

function makeRequest(data) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
    const api = "http://localhost:3000/api/products/";
		request.open("POST", api + "/order/");
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 201) {
					resolve(JSON.parse(request.response));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
		request.setRequestHeader("Content-Type", "application/json");
		request.send(JSON.stringify(data));
	});
}

async function submitFormData(data){
  try{
    const requestPromise = makeRequest(data);
    const response = await requestPromise;
    const orderEl = document.getElementById("orderId")
    orderEl.textContent = response.orderId
  } catch(errorResponse){ 
    console.log(errorResponse)
  }
}