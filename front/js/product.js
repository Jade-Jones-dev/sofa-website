const id = getID();
let product;

//fetch data from the backend api
fetch("http://localhost:3000/api/products/" + id)
	.then((data) => data.json())
	.then((product) => {
		display(product);
		ListenForCartAddition(product);
	});

function display(product) {
	let productImage = document.querySelector(".item__img");
	let productTitle = document.getElementById("title");
	let productPrice = document.getElementById("price");
	let productDescription = document.getElementById("description");

	productPrice.textContent = product.price;
	productTitle.textContent = product.name;
	productTitle.value = product._id;
	productDescription.textContent = product.description;
	productImage.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;

	let dropdownEl = document.getElementById("colors");
	let productColors = product.colors;

	productColors.forEach((color) => {
		let optionEl = document.createElement("option");
		optionEl.setAttribute("value", color);
		optionEl.textContent = color;

		dropdownEl.append(optionEl);
	});
}

function ListenForCartAddition(product) {
	const addButton = document.getElementById('addToCart')
	addButton.addEventListener("click", () => {
		const qty = Number(document.getElementById("quantity").value);
		const color = document.getElementById("colors").value;

		if (qty < 1 || qty > 100) {
			alert("Please choose a quantity between 1 and 100");
			return;
		}
		if (color == "") {
			alert("Please select a color");
			return;
		}

		const isCartEmpty = !localStorage.getItem("products");

		if (isCartEmpty) {
			const products = [{ id: product._id, color: color, qty: Number(qty) }];

			localStorage.setItem("products", JSON.stringify(products));
			alert(
				"Your product has been added to your basket. Now redirecting you to the home page"
			);
			location.href = "index.html";
			return;
		}

		const products = JSON.parse(localStorage.getItem("products"));
		const existingProduct = products.find(
			(a) => a.id === getID() && a.color === color
		);
		if (existingProduct) {
			existingProduct.qty = Number(existingProduct.qty) + Number(qty);
			localStorage.setItem("products", JSON.stringify(products));
			alert(
				`Your product has been added to your basket. Now redirecting to home page`
			);
			return;
		}

		products.push({ id: product._id, color: color, qty: Number(qty) });
		localStorage.setItem("products", JSON.stringify(products));
		alert(
			`Your product has been added to your basket. Now redirecting to home page`
		);
		return;
	});
}

function getID() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});

	return params.id;
}

// next steps- add event listener to button
// const addButton = document.getElementById("addToCart");
// const productQuantity = document.getElementById("quantity");

// // create function to check if options are available
// function formCheck() {
// 	let colorsDropdown = document.getElementById("colors");
// 	if (productQuantity.value < 1) {
// 		alert("Please choose a quantity");
// 	}
// 	if (colorsDropdown.value == "") {
// 		alert("Please select a color");
// 	}
// }

//checking if there are previous details in local storage if not add teh product to local storage
// function cartCheck(product) {
// 	let cart = [];
// 	colorsDropdown = document.getElementById("colors");
// 	let productQuantity = document.getElementById("quantity");
// 	productTitle = document.getElementById("title");
// 	if (localStorage.getItem("product") !== null) {
// 		cart.push(productTitle.value, colorsDropdown.value, productQuantity.value);
// 		window.localStorage.setItem("product", JSON.stringify(cart));
// 	} else {
// 		console.log(localStorage);
// 	}

// }

//should I create an array of objects?

// how to check items in localstorage? Do I just check the cart array??
// next step how to check if the items in local storage already contain the product I am trying to add?

//  display the product- done
//// add an event listener - done
// check whether quantity is valid - done
// check whether color is valid - done
// check whether yhere are products in local storage- need to read up on tthis https://blog.logrocket.com/localstorage-javascript-complete-guide/ - done
// https://stackoverflow.com/questions/5410820/how-can-i-show-all-the-localstorage-saved-variables
// if yes
//  does the selected product and color already exist? if yes add the color and quntity
// https://attacomsian.com/blog/web-storage-api-local-storage-session-storage
// if no create an array - done


