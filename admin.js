"use strict";


//meny
const listEl = document.getElementById("Meny");
const menyKnappEl = document.getElementById("menyKnapp");

function taFramKnapp() {
    listEl.classList.toggle("show");
}
menyKnappEl.addEventListener('click', taFramKnapp);


//här ligger all ändrainfo......
//HTML element  ÄNDRA ORDER

const namechangeEL = document.getElementById("usernamechange");
const addresschangeEL = document.getElementById("addresschange");
const postalchangeEL = document.getElementById("postalnochange");
const citychangeEL = document.getElementById("citychange");
const mailchangeEL = document.getElementById("emailchange");
const freightchangeEL = document.getElementById("freighttermschange");
const productIDEL = document.getElementById("productidchange");
const firestoreIDEL = document.getElementById("firestoreID");
let firestoreID;

const updatebuttonEl = document.getElementById("uppdatera");
updatebuttonEl.addEventListener("click",changeOrderwithinput)


//HÄMTAR ALLT I FIRESTORE************************************************************************* 

fetch("https://firestore.googleapis.com/v1/projects/tinasshop-aeabd/databases/(default)/documents/tshop")
    .then(res => res.json())
    .then(data => printFirestore(data));

function printFirestore(data) {
    const arrayname = data.documents;
    console.log(arrayname);


    const firestoreEl = document.getElementById("firestore");
    let out = "";
    for (let product of arrayname) {
        out += `
         <tr>
            <td>${product.fields.productid.arrayValue.values.map(value => value.stringValue)}</td>   
            <td>${product.fields.username.stringValue}</td>
            <td>${product.fields.address.stringValue}</td>
            <td>${product.fields.postalno.stringValue}</td>
            <td>${product.fields.city.stringValue}</td> 
            <td>${product.fields.email.stringValue}</td>
            <td>${product.fields.freightterms.stringValue}</td>

           
            <td><input type="button" value="Ta bort order" id="deletebutton" onclick="deleteOrder('${product.name}')"></td>
            
            <td><input type="button" value="Ändra i order" id="changebutton" onclick="updateOrder('${product.name}', '${product.fields.username.stringValue}', 
            '${product.fields.address.stringValue}', '${product.fields.postalno.stringValue}', '${product.fields.city.stringValue}', '${product.fields.email.stringValue}' , 
            '${product.fields.freightterms.stringValue}' , '${product.fields.productid.arrayValue.values.map(value => value.stringValue)}')"></td>
         </tr>
      `;
    }

    firestoreEl.innerHTML = out;
    
}



function updateOrder(firestoreID, username, address, postalno, city, email, freightterms, productid){
    const namechangeEL = document.getElementById("usernamechange");
    const addresschangeEL = document.getElementById("addresschange");
    const postalchangeEL = document.getElementById("postalnochange");
    const citychangeEL = document.getElementById("citychange");
    const mailchangeEL = document.getElementById("emailchange");
    const freightchangeEL = document.getElementById("freighttermschange");
    const productIDEL = document.getElementById("productidchange");
    const firestoreIDEL = document.getElementById("firestoreID");
    //let id = firestoreID;


    namechangeEL.value = username;
    addresschangeEL.value = address;
    postalchangeEL.value = postalno;
    citychangeEL.value =  city;
    mailchangeEL.value = email;
    freightchangeEL.value = freightterms;
    productIDEL.value = productid;
    firestoreIDEL.value = firestoreID;

    console.log(username, address, postalno, city, email, freightterms, productid);
   
}



     
function changeOrderwithinput() {  


    const updatednamechange = namechangeEL.value;
    const updatedaddresschange = addresschangeEL.value; 
    const updatedostalchange = postalchangeEL.value; 
    const updatedcitychange = citychangeEL.value;
    const updatedmailchange = mailchangeEL.value;
    const updatedfreightchange = freightchangeEL.value; 
    const updatedproductID = productIDEL.value; 
    const updatedfirestoreID = firestoreIDEL.value;

    if(!updatednamechange || !updatedaddresschange || !updatedostalchange || !updatedcitychange || !updatedmailchange ||!updatedfreightchange){
        alert("Vänligen fyll i alla fält");
        return;
    }
    

    var arr = [updatedproductID];
    // array of strings

    var nums = arr.map(function(str) {
       // using map() to convert array of strings to numbers

       return parseInt(str); });
       console.log(nums);


    const idproducts = arr.map(item => {
        return {
            "stringValue": item    
        }
    });
    console.log(idproducts);

    //sätt samman användarens värden till JSON objekt

    let body = JSON.stringify({
        "fields": {

            "username": {
                "stringValue": updatednamechange
            },
            "email": {
                "stringValue": updatedmailchange
            },
            "address": {
                "stringValue": updatedaddresschange
            },
            "postalno": {
                "stringValue": updatedostalchange
            },
            "city": {
                "stringValue": updatedcitychange
            },
            "productid": {
                "arrayValue": {
                    "values":  idproducts                          
                }
            },
            "freightterms": {
                "stringValue": updatedfreightchange
            }
        }
    })

    //skicka fetch-anrop med PATCH metoden för att uppdatera en order
    fetch("https://firestore.googleapis.com/v1/" + updatedfirestoreID, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(res => res.json())  
        .then(data => console.log(data));

    // Ladda om sidan
    //location.reload();
    setTimeout(function() { window.location=window.location;},2000);
}






//delete********************************************************************************************************

function deleteOrder(firestoreID) {
    let id = firestoreID;

    fetch("https://firestore.googleapis.com/v1/" + id, {
        method: 'DELETE'
    })
        .then(res => res.json())  
        .then(data => console.log(data));

    
    setTimeout(function() { window.location=window.location;},2000);
}

    //***************************************************************

