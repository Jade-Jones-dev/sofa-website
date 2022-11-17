
* check documentation on project requirementd
* outline the next steps for order confirmation

* check documentation on project requirementd
* outline the next steps for order confirmation

https://www.w3resource.com/javascript/form/email-validation.php

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

https://www.w3resource.com/javascript/form/all-letters-field.php

function allLetter(inputtxt)
  {
   var letters = /^[A-Za-z]+$/;
   if(inputtxt.value.match(letters))
     {
      return true;
     }
   else
     {
     alert("message");
     return false;
     }
  }
