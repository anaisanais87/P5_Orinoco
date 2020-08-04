let btnReturn = document.createElement("button");                 //Création d'un bouton afin de revenir à la page d'accueil
btnReturn.className = "btn_return";
btnReturn.textContent = "Retour";
document.getElementById("return_home").appendChild(btnReturn);

btnReturn.addEventListener("click", function () {                 //Au clic, Fonction qui renvoie à la page d'accueil
    document.location.href = "index.html";
})


const cart = JSON.parse(localStorage.getItem('cart'));           //Données récupérées dans le LocalStorage

function createHeader() {                                        //Création de la fonction qui décrira chaque partie du tableau
    let table = document.createElement("table");                 // Création du tableau qui recevra les éléments de l'en-tête
    table.id = "order";
    document.getElementById("cart").appendChild(table);

    let article = document.createElement("th");                  // Création d'une cellule pour l'élément produit
    article.id = "article_cart";
    article.textContent = "Produit";
    table.appendChild(article);

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
}

function createCart() {                                          //Fonction qui va créer le panier

    createHeader()                                               //Appel de la fonction qui créer l'en-tête avec la description des éléments du tableau

    if (cart !== null) {                                         //SI le panier est différent de null, les élément ci-dessous seront crées
        cart.forEach(function (eltSelected) {                    //La fonction sélectionne chaque élément du tableau cart

            let div1 = document.createElement("div");            // Création de la div #cart_array
            div1.id = "cart_array";
            document.getElementById("cart").appendChild(div1);

            let div = document.createElement("table");           // Création du tableau qui recevra les éléments du panier
            div.className = "array";
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
        });

    } else {                                                     //Dans le cas où le panier est égal à null, le code ci-dessous s'exécutera
        let p = document.createElement("p");                     //Création d'un paragraphe qui indiquera à l'utilisateur que le panier est vide
        p.textContent = "Votre panier est vide !";
        p.id = "cart_empty"
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
            localStorage.setItem('resultPrice', JSON.stringify(resultPrice));  //Résultat stocké dans le localStorage
        }

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

function returnProductIds() {                                      //Fonction qui récupère les id des articles qui sont dans le panier

    let ids=[];                                                    //Déclaration de la variable ids qui sera un tableau

        for (let products of cart) {                               //Boucle for...of qui permet de parcourir tous les éléments de cart
            ids.push(products.id)
        }
        return ids                                                 //Fonction qui renvoie les id des articles du panier
}

// //Formulaire

// // //Bouton pour valider la commande
let submitOrder = document.createElement("input");                 //Création d'un bouton pour valider la commande
submitOrder.id = "valid_order";
submitOrder.type = "submit"
submitOrder.value = "Valider la commande";
document.getElementById("form").appendChild(submitOrder);

const regexText   = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/; //Création des constantes des regex pour la validation du formulaire
const regexEmail  = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const regexAdress = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}/;

function validOrder(name, firstname, email, address, city) { //Fonction qui, quand le formulaire sera valide, envoyer l'objet contact et le tableau des produits au serveur

    let productId = returnProductIds();                      //productId sera le retour de la fonction returnProductIds qui renvoie id des articles du panier sous forme de tableau
    let dataForm = {                                         //Déclaration de la variable dataForm qui aura comme objets contact et products
        "contact": {
                "lastName"  : name,
                "firstName" : firstname,
                "email"     : email,
                "address"   : address,
                "city"      : city
        }, 
        "products" : productId
    }

    fetch('http://localhost:3000/api/teddies/order', {      //Méthode fetch pour POST les objets contact et products au serveur
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(dataForm),                     //Stringify convertit une valeur JavaScript en chaîne JSON
    })

    .then(response => response.json())                      //Retour de la réponse attendue en JSON
    .then(function (data) {
    
        let orderId = data.orderId;                         //Je veux récupérer id de commande grâce aux données data retournées 
        localStorage.setItem('orderId', JSON.stringify(orderId));    //La valeur de orderId est stockée grâce à setItem et converti en JSON grâce à JSON.stringify
        document.location.href = "confirmation.html?id=" + orderId   //Ouverture de la page de confirmation de commande

    })
}

function validate() {                                               //Création de la fonction qui permet de valider le formulaire

    let emailForm     = document.getElementById("email").value;     //Déclaration des variables qui font référence aux champs du formulaire
    let lastNameForm  = document.getElementById("lastName").value;
    let firstNameForm = document.getElementById("firstName").value;
    let addressForm   = document.getElementById("address").value;
    let cityForm      = document.getElementById("city").value;

    let formSubmit = true;

    if (!regexEmail.test(emailForm)) {                                     //SI la valeur de l'adresse email est différente de la regexEmail alors:

        var messageError = "Format saisi invalide !";           
        document.getElementById("error_mail").textContent = messageError;  //Un message d'erreur s'affiche 
        formSubmit = false;                                                //Et la valeur formSubmit renvoie false

    }

    if (!regexText.test(lastNameForm))                                     //Je répète l'opération avec toutes les valeurs de tous les champs
        document.getElementById("error_name").textContent = messageError;

    if (!regexText.test(firstNameForm))
        document.getElementById("error_firstName").textContent = messageError;

    if (!regexAdress.test(addressForm))
        document.getElementById("error_address").textContent = messageError;

    if (!regexText.test(cityForm))
        document.getElementById("error_city").textContent = messageError;

    if (formSubmit === true) {                                              //Lorsque formSubmit renvoie true, le formulaire est rempli correctement

        validOrder(lastNameForm, firstNameForm, emailForm, addressForm, cityForm); //La commande peut être validée en envoyant l'objet contact au serveur
    }
}

let submitCart = document.getElementById("valid_order");
submitCart.addEventListener("click", validate);                             //Au clic la fonction validate est appelée

