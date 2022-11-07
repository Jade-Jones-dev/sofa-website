const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let value = params.id;
console.log(value) 

//fetch data from the backend api
fetch("http://localhost:3000/api/products/" + value)
	.then((data) => {
		return data.json();
	})
	.then((product) => {
		insertProductInfo(product);
	});

    function insertProductInfo(product) {
	let productImage = document.querySelector('.item__img')
    let productTitle = document.getElementById('title')
    let productPrice = document.getElementById('price')
    let productDescription = document.getElementById('description')

    productPrice.textContent = product.price
    productTitle.textContent = product.name
    productDescription.textContent = product.description
    productImage.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;

    let dropdownEl = document.getElementById('colors');
    let productColors = product.colors 

    productColors.forEach((color) => {
        let optionEl = document.createElement('option')
        optionEl.setAttribute('value', color)
        optionEl.textContent = color

        dropdownEl.append(optionEl)
        });
    }

// next steps- add event listener to button
// create function to check if options are available
// add to the cart