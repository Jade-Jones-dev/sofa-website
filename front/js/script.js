//fetch data from the backend api
fetch('http://localhost:3000/api/products')
.then(data => {
    return data.json();
})
.then(products => {
    insertProducts(products)
})

// create card for each element for home page
function insertProducts(products){
    const mainEl = document.getElementById("items");
   products.forEach((product) => {
    //create the elements
    let aEl = document.createElement("a")
    let cardEl = document.createElement("article");
	let imageEl = document.createElement("img");
	let nameEl = document.createElement("h3");
	let descriptionEl = document.createElement("p");
    // give classes
    cardEl.className = "article";
    nameEl.className = "ProductName";
    imageEl.classList.add('img');
    descriptionEl.classname = "productDescription";
    // set inner text and attributes
	nameEl.innerText = `${product.name}`;
    aEl.setAttribute('href', 'product.html?id=' + product._id);
	imageEl.setAttribute('src', product.imageUrl);
    imageEl.setAttribute("alt", product.altTxt);
	descriptionEl.innerText = `${product.description}`;
    // append the card and a tag to the main element
    cardEl.append(imageEl, nameEl, descriptionEl);
    aEl.append(cardEl)
    mainEl.append(aEl);
    });
}








