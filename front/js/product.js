const id = getID();
const addButton = document.getElementById("addToCart");
let product;

//fetch data from the backend api
fetch("https://sofa-backend.onrender.com/api/products/" + id)
	.then((data) => data.json())
	.then((product) => {
		display(product);
		ListenForCartAddition(product);
	});

// display the product on the page
function display(product) {
	let productImage = document.querySelector(".item__img");
	let productTitle = document.getElementById("title");
	let productPrice = document.getElementById("price");
	let productDescription = document.getElementById("description");

	productPrice.textContent = price(product.price);
	productTitle.textContent = product.name;
	productTitle.value = product._id;
	productDescription.textContent = product.description;
	productImage.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;

	// create the options for the colors
	let dropdownEl = document.getElementById("colors");
	let productColors = product.colors;

	productColors.forEach((color) => {
		let optionEl = document.createElement("option");
		optionEl.setAttribute("value", color);
		optionEl.textContent = color;
		dropdownEl.append(optionEl);
	});
}

//function to add products to cart
function ListenForCartAddition(product) {
	addButton.addEventListener("click", () => {
		const qty = Number(document.getElementById("quantity").value);
		const color = document.getElementById("colors").value;
		//check if quantity and color are valid
		if (qty < 1 || qty > 100) {
			alert("Please choose a quantity between 1 and 100");
			return;
		}
		if (color == "") {
			alert("Please select a color");
			return;
		}
		//check if cart is empty
		const isCartEmpty = !has("products");

		if (isCartEmpty) {
			const products = [{ id: product._id, color: color, qty: Number(qty) }];

			store("products", products);
			alert("Your product has been added to your basket. Now redirecting you to the home page");
			location.href = "index.html";
			return;
		}

		const products = get("products");
		const existingProduct = products.find(
			(a) => a.id === getID() && a.color === color
		);
		if (existingProduct) {
			existingProduct.qty = Number(existingProduct.qty) + Number(qty);
			store("products", products);
			alert(`Your product has been added to your basket. Now redirecting to home page`);
			location.href = "index.html";
			return;
		}

		products.push({ id: product._id, color: color, qty: Number(qty) });
		store("products", products);
		alert(`Your product has been added to your basket. Now redirecting to home page`);
		location.href = "index.html";
		return;
	});
}

// get the information from home page
function getID() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});
	return params.id;
}




