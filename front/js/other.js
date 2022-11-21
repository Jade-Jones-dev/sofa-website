checkUserInput()
// create a function to check the data entered by user and display an error message
function checkUserInput(){

  let firstNameEl = document.getElementById("firstName");
  let lastNameEl = document.getElementById("lastName");
  let addressEl = document.getElementById("address");
  let cityEl = document.getElementById("city");
  let emailEl = document.getElementById("email");
  let orderEl = document.getElementById("order");

  let firstNameErrorEl = document.getElementById("firstNameErrorMsg");
	let lastNameErrorEl = document.getElementById("lastNameErrorMsg");
	let addressErrorEl = document.getElementById("addressErrorMsg");
	let cityErrorEl = document.getElementById("cityErrorMsg");
	let emailErrorEl = document.getElementById("emailErrorMsg");

  // check first name
  firstNameEl.addEventListener('input', ($event) =>{
    	if ($event.target.value.length < 3 || $event.target.value.length > 10) {
				firstNameErrorEl.innerText = "Name must be between 3 and 10 characters";
			} else {
				firstNameErrorEl.innerText = "";
			}
  })
  // check name
 lastNameEl.addEventListener("input", ($event) => {
		if ($event.target.value.length < 3 || $event.target.value.length > 10) {
			lastNameErrorEl.innerText = "Name must be between 3 and 10 characters";
			}
      else{
        lastNameErrorEl.innerText = ""
      }
		});

  //check address
  addressEl.addEventListener("input", ($event) => {
   let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
   if ($event.target.value.match(regex)){
    addressErrorEl.innerText = ""
   } else {
    addressErrorEl.innerText = " please include letters and numbers"
   }
  })
  // check city
  cityEl.addEventListener("input", ($event) => {
		if ($event.target.value.length < 3 || $event.target.value.length > 10) {
			cityErrorEl.innerText = "Name must be between 3 and 10 characters";
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

    orderEl.addEventListener("click", ($event) =>{
      $event.preventDefault()
      if(!emailErrorEl.innerText === "" && !firstNameErrorEl.innerText === "" && !lastNameErrorEl.innerText === "" && addressErrorEl === "" && cityErrorEl.innerText === ""){
        alert("enter your details")
      }
      const post = {
        firstname:firstNameEl.value,
        lastname:lastNameEl.value,
        address:addressEl.value,
        city:cityEl.value,
        email:emailEl.value,
        // how to add products
      }
    // })
    })}

    // window.location.href = `confirmation.html?orderId=${orderId}`;