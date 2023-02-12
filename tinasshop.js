"use strict";


//MENYN UPPE

//meny
const listEl = document.getElementById("Meny");
const menyKnappEl = document.getElementById("menyKnapp");

function taFramKnapp() {
    listEl.classList.toggle("show");
}
menyKnappEl.addEventListener('click', taFramKnapp);



// ORDERFORMULÄR   ta fram och gömma med klick::::::::::::::::::::::::::::::::::::::::::::::::::::::

const orderformularEl = document.getElementById("orderformular");
const ytterligareknappEl = document.getElementById("ytterligareknapp");

var visaorderformular = function () {
    taFrammedknapp();
    Next();
}


var Next = function () {
    // alert("This is Next Function");  
    orderformularEl.classList.toggle("hide");
}

function taFrammedknapp() {
    orderformularEl.classList.toggle("show");
}





function openNav() {
    document.getElementById("myNav").style.height = "100%";
    showCart()

}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}






//HTML element  LOGGA IN

const nameEL = document.getElementById("username");
const addressEL = document.getElementById("address");
const postalEL = document.getElementById("postalno");
const cityEL = document.getElementById("city");
const mailEL = document.getElementById("email");
const freightEL = document.getElementById("freightterms");


//****************testar kontroll av inmatade värden 
function formValidation() {

    if (allLetternameEL(nameEL)) {
        if (allLetteraddressEL(addressEL)) {
            if (allLetterpostalEL(postalEL)) {
                if (allLettercityEL(cityEL)) {
                    if (ValidateEmail(mailEL)) {
                        if (freightselect(freightEL)) {
                        }
                    }
                }
            }
        }
        return false;
    }



    function allLetternameEL(nameEL) {
        if (nameEL.value.length == 0) {
            alert('Namn saknas');
            nameEL.focus();
            return false;
        }
        else {
            return true;
        }
    }



    function allLetteraddressEL(addressEL) {
        if (addressEL.value.length == 0) {
            alert('adress saknas');
            addressEL.focus();
            return false;
        }
        else {
            return true;
        }
    }


    function allLetterpostalEL(postalEL) {
        if (postalEL.value.length == 0) {
            alert('postnr saknas');
            postalEL.focus();
            return false;
        }
        else {
            return true;
        }
    }

    function allLettercityEL(cityEL) {
        if (cityEL.value.length == 0) {
            alert('city saknas');
            cityEL.focus();
            return false
        }
        else {
            return true;
        }
    }



    function ValidateEmail(mailEL) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailEL.value.match(mailformat)) {
            return true;
        }
        else {
            alert("email saknas");
            mailEL.focus();
            return false;
        }
    }


    function freightselect(freightEL) {
        if (freightEL.value == "") {
            alert('gör ett val');
            freightEL.focus();
            return false;
        }
        else {
            // return true;
            //lägger till nedan
            alert('Fint, nu kan du handla!');

            //testar att lägga in detta:
            // Hämta datan från input-elementen i formuläret
            let username = nameEL.value;
            let address = addressEL.value;
            let postalno = postalEL.value;
            let city = cityEL.value;
            let email = mailEL.value;
            let freightterms = freightEL.value;

            // Skapa ett objekt med värdena från forumläret
            let object = {
                name: username,
                adr: address,
                postno: postalno,
                ci: city,
                mail: email,
                fterms: freightterms
            }

            // Konvertera objektet till JSON, lagra i variabel
            let json = JSON.stringify(object);

            // Spara json-datan i localstorage-variabeln "output"
            localStorage.setItem("output", json);


            //fram till hit
            window.location.reload()
            return true;
        }
    }
}



const loginbuttonEl = document.getElementById("loginbutton");
const logoutEl = document.getElementById("clear");

const h1El = document.getElementById("inlogningsnamn");




// Funktion för att rensa hela localstorage
function clear() {
    localStorage.clear();
    location.reload();
}



// Kontrollera om localstorage-variabeln output finns
if (localStorage.output) {
    let json = localStorage.getItem("output");
    let object = JSON.parse(json);
    let name = object.name;
    h1El.innerHTML = name;
}


loginbuttonEl.addEventListener("click", formValidation);
logoutEl.addEventListener("click", clear);


const h3kundvagnEl = document.getElementById("h3kundvagn");
const antalprodukterEl = document.getElementById("antalprodukter");

const handlabuttonEl = document.getElementById("handlaallaprodukter");
handlabuttonEl.addEventListener("click", shopProductFromCart);





let cartObject = JSON.parse(localStorage.getItem("items")) || [];


let counter = 0;
for (const obj of cartObject) {
    counter++;
}
console.log(counter);
antalprodukterEl.innerHTML = counter;



function addToCartWithObject(id, title, price) {   //localStorage
    console.log(id, title, price);

    // Skapa ett objekt med värdena 
    cartObject.push({
        id,
        title,
        price

    });

    console.log(cartObject);

    localStorage.setItem("items", JSON.stringify(cartObject));


    let counter = 0;
    for (const obj of cartObject) {
        counter++;
    }
    console.log(counter);
    antalprodukterEl.innerHTML = counter;


}


function showCart() {  

    let cartObject = JSON.parse(localStorage.getItem("items"));
    console.log(cartObject);


    for (let index = 0; index < cartObject.length; index++) {
        console.log(cartObject[index]);
    }


    const kundvagnidEl = document.getElementById("kundvagnid");

    kundvagnidEl.innerHTML = "";  // för att tömma varukorgen först och sen addera alla produkterna igen, så att inga dubletter kommer.
    for (let product of cartObject) {
        console.log(cartObject.indexOf(product), product);
        kundvagnidEl.innerHTML += `
    
    <ul>
    <li>${"Produktnamn: " + cartObject.indexOf(product), product.title}</li>
        <li> ${"Product id: " + cartObject.indexOf(product), product.id} </li>
        <li> ${"Pris: " + cartObject.indexOf(product), product.price} </li>
    </ul>
    <input type="button" value="Ta bort order" id="deletebutton" onclick="deleteProductInArray
      ('${cartObject.indexOf(product)}')">
      <br><br> 
 `
    }


    let counter = 0;
    for (const obj of cartObject) {
        counter++;
    }
    console.log(counter);
    antalprodukterEl.innerHTML = counter;
}



function deleteProductInArray(index) {
    console.log(index);

    cartObject.splice(index, 1);

    localStorage.setItem("items", JSON.stringify(cartObject));


    let counter = 0;
    for (const obj of cartObject) {
        counter++;
    }
    console.log(counter);
    antalprodukterEl.innerHTML = counter;

    console.log(cartObject);

    // location.reload()
    setTimeout(function () { window.location = window.location; }, 2000);
}



function shopProductFromCart() {

    if (localStorage.output) {

        let json = localStorage.getItem("output");
        let object = JSON.parse(json);
        console.log(json);
        console.log(object);
        let username = object.name;
        let address = object.adr;
        let postalno = object.postno;
        let city = object.ci;
        let email = object.mail;
        let freightterms = object.fterms;


        let cartObject = JSON.parse(localStorage.getItem("items")) || [];

        const idproducts = cartObject.map(item => {
            return {
                "stringValue": item.id
            }
        });


        let body = JSON.stringify({
            "fields": {

                "username": {
                    "stringValue": username
                },
                "email": {
                    "stringValue": email
                },
                "address": {
                    "stringValue": address
                },
                "postalno": {
                    "stringValue": postalno
                },
                "productid": {
                    "arrayValue": {
                        "values": idproducts
                    }
                },
                "city": {
                    "stringValue": city
                },
                "freightterms": {
                    "stringValue": freightterms
                }
            }
        })


        //skicka fetch-anrop med POST metoden
        fetch("https://firestore.googleapis.com/v1/projects/tinasshop-aeabd/databases/(default)/documents/tshop", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())  //tar emot status och andra saker som kommer från anropet, typ att det jag gjort är ok.
            .then(data => console.log(data));

        localStorage.removeItem("items");

    }
    setTimeout(function () { window.location = window.location; }, 2000);
    //window.location.reload()

}





//HÄMTA OCH RENDERA UT SMYCKEN ********************************************************************
const produkterEl = document.getElementById("produkter");
const showJewellerybuttoneL = document.getElementById("showJewellerybutton");



// SMYCKEN ta fram och gömma med klick::::::::::::::::::::::::::::::::::::::::::::::::::::::


var visaSmycken = function () {

    taFrammedknappsmycken();


    fetch('https://fakestoreapi.com/products/category/jewelery')
        .then(result => result.json())
        .then(data => printSmyckensec(data));

    Nexts();
}
var Nexts = function () {
    produkterEl.classList.toggle("hide");
}

function taFrammedknappsmycken() {
    produkterEl.classList.toggle("show");
}


function printSmyckensec(data) {

    const placeholder = document.getElementById("smyckensec");

    console.log(data);
    const arrayname = data;


    let out = "";
    for (let product of arrayname) {
        out += `
            <br>
            <br>
            <h2>${product.title}</h2>
            <br>
            <img src=  ${product.image} + width='140' height='130'  style='border-radius: 40px;'>  
            <br>
            <p>${product.description}</p>
            <p> <b> ${product.price} kr </b> </p> 
            <hr>
            
            <input type="button" value="Lägg i varukorg" id="addbutton" onclick="addToCartWithObject 
            ('${product.id}',
            '${product.title.replace("'", "")}',
            '${product.price}'
            )">
            
            <br>
      `;
    }

    placeholder.innerHTML = out;

}



// electronics ta fram och gömma med klick::::::::::::::::::::::::::::::::::::::::::::::::::::::

const produkterEEl = document.getElementById("produkterE");


var visaElectronics = function () {
    taFrammedknappElectronics();

    fetch('https://fakestoreapi.com/products/category/electronics')
        .then(result => result.json())
        .then(data => printElectronics(data));

    NextsE();

}

var NextsE = function () {
    produkterEEl.classList.toggle("hide");
}

function taFrammedknappElectronics() {
    produkterEEl.classList.toggle("show");
}


function printElectronics(data) {

    const placeholder = document.getElementById("smyckensec");

    console.log(data);
    const arrayname = data;


    let out = "";
    for (let product of arrayname) {
        out += `
            <br>
            <br>
            <h2>${product.title}</h2>
            <br>
            <img src=  ${product.image} + width='140' height='130'  style='border-radius: 40px;'>  
            <br>
            <p>${product.description}</p>
            <p> <b> ${product.price} kr </b> </p> 
            <hr>
            
            <input type="button" value="Lägg i varukorg" id="addbutton" onclick="addToCartWithObject 
            ('${product.id}',
            '${product.title.replace("'", "")}',
            '${product.price}'
            )">
            
            <br>
      `;
    }

    placeholder.innerHTML = out;

}



// menkläder ta fram och gömma med klick::::::::::::::::::::::::::::::::::::::::::::::::::::::

const produkterMenEl = document.getElementById("produkterMen");


var visaMen = function () {
    taFrammedknappMen();

    fetch("https://fakestoreapi.com/products/category/men's clothing")
        .then(result => result.json())
        .then(data => printMen(data));

    NextM();

}

var NextM = function () {
    produkterMenEl.classList.toggle("hide");
}

function taFrammedknappMen() {
    produkterMenEl.classList.toggle("show");
}



function printMen(data) {

    const placeholder = document.getElementById("smyckensec");

    console.log(data);
    const arrayname = data;


    let out = "";
    for (let product of arrayname) {
        out += `
            <br>
            <br>
            <h2>${product.title}</h2>
            <br>
            <img src=  ${product.image} + width='140' height='130'  style='border-radius: 40px;'>  
            <br>
            <p>${product.description}</p>
            <p> <b> ${product.price} kr </b> </p> 
            <hr>
            
            <input type="button" value="Lägg i varukorg" id="addbutton" onclick="addToCartWithObject 
            ('${product.id}',
            '${product.title.replace("'", "")}',
            '${product.price}'
            )">
            
            <br>
      `;
    }

    placeholder.innerHTML = out;

}


// Kvinnokläder ta fram och gömma med klick::::::::::::::::::::::::::::::::::::::::::::::::::::::

const produkterWomEl = document.getElementById("produkterWom");


var visaWom = function () {
    taFrammedknappWom();

    fetch("https://fakestoreapi.com/products/category/women's clothing")
        .then(result => result.json())
        .then(data => printWom(data));

    NextW();

}

var NextW = function () {
    produkterWomEl.classList.toggle("hide");
}

function taFrammedknappWom() {
    produkterWomEl.classList.toggle("show");
}



function printWom(data) {

    const placeholder = document.getElementById("smyckensec");

    console.log(data);
    const arrayname = data;


    let out = "";
    for (let product of arrayname) {
        out += `
            <br>
            <br>
            <h2>${product.title}</h2>
            <br>
            <img src=  ${product.image} + width='140' height='130'  style='border-radius: 40px;'>  
            <br>
            <p>${product.description}</p>
            <p> <b> ${product.price} kr </b> </p> 
            <hr>
            
            <input type="button" value="Lägg i varukorg" id="addbutton" onclick="addToCartWithObject 
            ('${product.id}',
            '${product.title.replace("'", "")}',
            '${product.price}'
            )">
            
            <br>
      `;
    }

    placeholder.innerHTML = out;

}




//HÄMTA OCH RENDERA UT ALLA PRODUKTERNA   till gömd lista******************************************************************** 

function openNav2() {

    fetch("https://fakestoreapi.com/products")
        .then(result => result.json())
        //.then(json=>console.log(json));
        .then(data2 => showAllProductsList(data2));



    document.getElementById("myNav2").style.height = "100%";
    //showAllProductsList(data2)



    function showAllProductsList(data2) {
        console.log(data2);
        const arrayname = data2;

        const placeholder = document.getElementById("data-output2");
        let out = "";
        for (let product of arrayname) {
            out += `
                 <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td> <img src=  ${product.image} + width='140' height='130'  style='border-radius: 40px;'>  </td>  
                    
                    <td>${product.description}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td> 
        
                    <td>${product.rating.count}</td>
                    <td>${product.rating.rate}</td>
                   
                    <td>
                    <input type="button" value="Lägg i varukorg" id="addbutton" onclick="addToCartWithObject 
                    ('${product.id}',
                    '${product.title.replace("'", "")}',
                    '${product.price}'
                    )">
                    </td>
                   
                 </tr>
              `;
        }

        placeholder.innerHTML = out;

    }

}

function closeNav2() {
    document.getElementById("myNav2").style.height = "0%";
}














