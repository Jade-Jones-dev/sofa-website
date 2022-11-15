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
    
}

/*
        let addEl = document.getElementById("cart__items");

        let articleEl = document.createElement('article')
        let imageEl = document.createElement('div')
        let cartEl = document.createElement('div')
        let cartDivEl = document.createElement('div')
        let nameEl = document.createElement('h2');
        let colorEl = document.createElement("p");
        let priceEl = document.createElement("p");

        articleEl.className = 'cart__item';
        imageEl.className = "cart__item__img";
        cartEl.className = "cart__item__content";
        cartDivEl.className = "cart__item__content__description";

        imageEl.setAttribute("src", product.imageUrl);
				imageEl.setAttribute("alt", product.altTxt);
        nameEl.innerText = product.name
        colorEl.innertext = product.color
        priceEl.innerText = product.price

        cartDivEl.append(nameEl, colorEl, priceEl)
        cartEl.append(cartDivEl)
        articleEl.append(imageEl, cartDivEl)
        addEl.append(cartEl)



        // check if i need this

        // let cartElContent = document.createElement('div');
        // let cartElContentQuantity = document.createElement("div");
        // let cartPEl = document.createElement("p");

*/

/*
             <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Name of the product</h2>
                    <p>Green</p>
                    <p>€42.00</p>
                  </div>

                  created up to here
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">


                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article> -->

*/
// steps for step 9
// add event listener to delte button
// add event listener to edit the quantity

// steps for step 10
// chreck details entered by user
// display an error message if necessary
