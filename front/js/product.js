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

    addButton.addEventListener("click", () => {
					formCheck();
				});
    }

// next steps- add event listener to button
const addButton = document.getElementById('addToCart')
const productQuantity = document.getElementById('quantity')



// create function to check if options are available
function formCheck() {
    if ( productQuantity.value < 1 ){
        alert('Please choose a quantity')
    }

    let colorsDropdown = document.getElementById('colors')

   if (colorsDropdown.value == ''){
        alert('Please select a color')
    }
}

function cartCheck(){
    if (localStorage.getItem("product") !== null) {
			console.log(`cart is available`);
		} else {
			console.log(`no cart details found`);
		}
}

//  display the product- done
//// add an event listener - done
// check whether quantity is valid - done
// check whether color is valid - done


// check whether yhere are products in local storage- need to read up on tthis https://blog.logrocket.com/localstorage-javascript-complete-guide/
// if yes
    //  does the selected product and color already exist? if yes add the color and quntity
    // if (localStorage.getItem("email") !== null) {
	// 		console.log(`Email address exists`);
	// 	} else {
	// 		console.log(`Email address not found`);
	// 	}
    // https://attacomsian.com/blog/web-storage-api-local-storage-session-storage
// if no create an array