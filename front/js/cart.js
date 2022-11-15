const cartItems = document.getElementById("cart__items");
//fetch data from the backend api
fetch('http://localhost:3000/api/products')
.then(data => {
    return data.json();
})
.then(allProducts => {
    const cart = JSON.parse(localStorage.getItem("products"));
    const products = buildCompleteList(cart, allProducts)
    
})
// insert the elements on the page
function buildCompleteList(cart, Allproducts){
    
    const list = [];
    cart.forEach(product => {
        const item = Allproducts.find(a => a._id === product.id);
        item.color = product.color;
        item.qty = product.qty;
        list.push(item)

        })




        // check if i need this

        // let cartElContent = document.createElement('div');
        // let cartElContentQuantity = document.createElement("div");
        // let cartPEl = document.createElement("p");
   
    console.log(list)
}

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
