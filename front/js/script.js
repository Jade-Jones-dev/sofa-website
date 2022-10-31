//fetch data from the backend api
fetch('http://localhost:3000/api/products')
.then(data => {
    return data.json();
})
.then(products => {
    insertProducts(products)
})

// TODO get the existing element on the page where I can insert cards (section class items)


function insertProducts(products){
    const mainEl = document.getElementById("items");
   products.forEach((product) => {
    		let cardEl = document.createElement("article");
				let imageEl = document.createElement("img");
				let nameEl = document.createElement("h3");
				let descriptionEl = document.createElement("div");

                cardEl.className = "article";
                cardEl.setAttribute('id', product._id)
                nameEl.className = "ProductName";
                imageEl.classList.add('img')
                descriptionEl.classname = "productDescription";

				nameEl.innerText = `${product.name}`;
				imageEl.setAttribute('src', product.imageUrl);
                imageEl.setAttribute("alt", product.altTxt);
				descriptionEl.innerText = `${product.description}`;

                cardEl.append(imageEl, nameEl, descriptionEl);
                mainEl.append(cardEl);

                
   });
}
// TODO iterate over the stuff
// get the current element in the array
// create a card and insert into homepage
// take the info and append it to card
// append card to section 







