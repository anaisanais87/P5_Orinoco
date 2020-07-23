let cart = JSON.parse(localStorage.getItem('cart'));             //Données récupérées dans le LocalStorage

function createHeader() {                                        //Création de la fonction qui décrira chaque partie du tableau
    let table = document.createElement("table");                 // Création du tableau qui recevra les éléments de l'en-tête
    table.id = "order";
    document.getElementById("cart").appendChild(table);

    let article = document.createElement("th");                  // Création d'une cellule pour l'élément produit
    article.id = "article_cart";
    article.textContent = "Produit";
    table.appendChild(article);

    // let nameArticle = document.createElement("th");              // Création d'une cellule pour l'élément nom
    // nameArticle.id = "name_cart";
    // nameArticle.textContent = "Nom";
    // table.appendChild(nameArticle);

    let colorArticle = document.createElement("th");            // Création d'une cellule pour l'élément couleur
    colorArticle.id = "color_cart";
    colorArticle.textContent = "Couleur";
    table.appendChild(colorArticle);

    let quantityArticle = document.createElement("th");         // Création d'une cellule pour l'élément quantité
    quantityArticle.id = "quantity_cart";
    quantityArticle.textContent = "Qté";
    table.appendChild(quantityArticle);

    let priceArticle = document.createElement("th");            // Création d'une cellule pour l'élément prix unitaire
    priceArticle.id = "price_cart";
    priceArticle.textContent = "Prix";
    table.appendChild(priceArticle);

    // let priceTotalArticle = document.createElement("th");       // Création d'une cellule pour l'élément prix total du produit
    // priceTotalArticle.id = "price_total_cart";
    // priceTotalArticle.textContent = "Prix total";
    // table.appendChild(priceTotalArticle);
}

function createCart() {                                          //Fonction qui va créer le panier

    createHeader()                                               //Appel de la fonction qui créer l'en-tête avec la description des éléments du tableau

    if (cart !== null) {                                         //SI le panier est différent de null, les élément ci-dessous seront crées
        cart.forEach(function (eltSelected) {                    //La fonction délectionne chaque élément du tableau cart

            let div1 = document.createElement("div");            // Création de la div #cart_array
            div1.id = "cart_array";
            document.getElementById("cart").appendChild(div1);

            let div = document.createElement("table");           // Création du tableau qui recevra les éléments du panier
            div.id = "array";
            document.getElementById("cart_array").appendChild(div);

            let imgBear = document.createElement("img");        // Création et insertion des images
            imgBear.classList.add('img_array');
            imgBear.setAttribute('src', eltSelected.img);
            div.appendChild(imgBear);

            let nameBear = document.createElement("td");        // Création d'une cellule pour l'élément name
            nameBear.classList.add('name_array');
            nameBear.textContent = eltSelected.name;
            div.appendChild(nameBear);

            let colorBear = document.createElement("td");      // Création d'une cellule pour l'élément color
            colorBear.classList.add('color_array');
            colorBear.textContent = eltSelected.color;
            div.appendChild(colorBear);

            let quantityBear = document.createElement("td");   // Création d'une cellule pour l'élément quantity
            quantityBear.textContent = eltSelected.quantity;
            div.appendChild(quantityBear);

            let priceBearUnit = document.createElement("td");  // Création d'une cellule pour l'élément prix unitaire
            priceBearUnit.textContent = eltSelected.price / 100 + " €";
            div.appendChild(priceBearUnit);

            // let priceBear = document.createElement("td");     // Création d'une cellule pour l'élément price*quantity
            // let priceWithQuantity = (eltSelected.quantity * eltSelected.price) / 100; //Création de la variable qui calculera le prix unitaire multiplier par la quantité
            // priceBear.textContent = priceWithQuantity + " €";
            // div.appendChild(priceBear);

        });

    } else {                                                 //Dans le cas où le panier est égal à null, le code ci-dessous s'exécutera
        let p = document.createElement("p");                 //Création d'un paragraphe qui indiquera à l'utilisateur que le panier est vide
        p.textContent = "Votre panier est vide !";
        p.id = "cart_empty"
        // p.style.textAlign = "center";
        // p.style.fontSize = "20px";
        // p.style.fontWeight = "bold";
        document.getElementById("cart").appendChild(p);
        document.getElementById("order").style.display = "none"; //Supression de l'en-tête quand le panier est vide
    }
}

createCart()                                    //Appel de la fonction qui va créer le panier quand l'utilisateur mettra des choses à l'intérieur

function calculPriceTotal() {                   //Fonction qui va permettre de calculer le prix total du panier

    let resultPrice = 0;                        //Je déclare ma variable 
    if (cart !== null) {                        //SI le panier est différent de null, 

        for (let article of cart) {                                            //Je crée la boucle for...of qui permet de parcourir tous les éléments de cart
            let priceWithQuantity = (article.price * article.quantity) / 100;  //Création de la variable qui calculera le prix unitaire multiplier par la quantité
            resultPrice += priceWithQuantity;                                  //L'opérateur += permet d'ajouter la valeur de l'opérande droit à la variable resultPrice
            localStorage.setItem('resultPrice', JSON.stringify(resultPrice));     //???????
        }
    }

    if (resultPrice !== 0) {                                                    //SI le prix total du panier est différent de 0, les élément ci-dessous seront crées
        let priceTotal = document.createElement("th");                          // Création d'une cellule th
        priceTotal.id = "price_total";                                          // Je donne un nom d'id
        priceTotal.textContent = "Prix total : " + resultPrice + "€"            // Je rajoute le prix total dans le contenu de ma cellule
        document.getElementById("cart_array").appendChild(priceTotal);          // Insertion du nouvel élément
    }
}


calculPriceTotal();                                                //Appel de la fonction qui va calculer et afficher le montant total du panier

// Création du bouton qui effacera le panier au clic
let div = document.createElement("div");                           //Création d'une div 
div.id = "remove_cart";                                            //Je donne un nom d'id à ma div
document.getElementById("cart_array").appendChild(div);            //J'insère ma div dans la div conteneur #cart_array

let removeCart = document.createElement("button");                 //Création d'un bouton
removeCart.id = "clear_cart";
removeCart.textContent = "Supprimer le panier";                    //J'insère du texte à mon bouton
document.getElementById("remove_cart").appendChild(removeCart);    //J'insère mon bouton dans la div #remove_cart
removeCart.addEventListener('click', () => {                       //Je crée un évènement au clic sur mon bouton
    if (confirm("Voulez-vous vraiment supprimer votre panier?")) { //Je crée une boîte de dialogue pour confirmer ou non la supression du panier
        localStorage.clear();                                      //Si l'utilisateur clique OK le localStorage et donc le panier se vident
        location.reload()                                          //La page se recharge automatiquement lorsque le panier se vide
    } else {                                                       //L'utilisateur peut cliquer sur ANNULER pour revenir sur la page du panier sans annuler son panier

    }
});

// //Formulaire

// // //Bouton pour valider la commande
let submitOrder = document.createElement("input");                  //Création d'un bouton pour valider la commande
submitOrder.id = "valid_order";
submitOrder.type = "submit"
submitOrder.value = "Valider la commande";
document.getElementById("form").appendChild(submitOrder);

const regexText = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const regexAdress = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}/;

function validOrder(name, firstname, mail, address, city) {
    let dataForm = {
        "Name": name,
        "firstName": firstname,
        "Mail": mail,
        "Address": address,
        "City": city
    };

    fetch('http://localhost:3000/api/teddies/order', dataForm, {
        method: 'post',
    });

    setTimeout(function () { window.location.href = "confirmation.html"; }, 1000);
}

function validate() {

    let mailForm = document.getElementById("mail").value;
    let nameForm = document.getElementById("name").value;
    let firstNameForm = document.getElementById("firstName").value;
    let addressForm = document.getElementById("address").value;
    let cityForm = document.getElementById("city").value;

    let testSubmit = true;

    if (!regexEmail.test(mailForm)) {

        var messageError = "Format saisi invalide !";
        document.getElementById("error_mail").textContent = messageError;
        testSubmit = false;

    }

    if (!regexText.test(nameForm))
        document.getElementById("error_name").textContent = messageError;

    if (!regexText.test(firstNameForm))
        document.getElementById("error_firstName").textContent = messageError;

    if (!regexAdress.test(addressForm))
        document.getElementById("error_address").textContent = messageError;

    if (!regexText.test(cityForm))
        document.getElementById("error_city").textContent = messageError;

    if (testSubmit === true) {

        validOrder(nameForm, firstNameForm, mailForm, addressForm, cityForm);
    }
}

let submitCart = document.getElementById("valid_order");
submitCart.addEventListener("click", validate); 