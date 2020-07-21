// Ajout des données sur la page des produits

const paramUrl = new URLSearchParams(window.location.search);      //URLSearchParams définit des méthodes pour travailler avec la requête (les paramètres GET) d’une URL.
let idTeddy    = paramUrl.get("id");                               // Je stocke dans une variable l'id du produit sélectionné

let cart            = [];                                          //Déclaration de variables
let currentColor    = "";
let currentQuantity = 1;

function displayPrice(prix, conteneur) {                           //Fonction qui affichera le prix de chaque produit 
    let p = document.createElement("p");
    p.id = "price";
    p.textContent = "Prix unitaire: " + prix / 100 + ".00 €";
    conteneur.appendChild(p);
}

function selectColor(conteneur) {                                  //Fonction qui affichera le menu déroulant qui permettra à l'utilisateur de choisir la couleur du produit 
    let form = document.createElement("form");
    form.id = "perso"
    conteneur.appendChild(form);

    let label = document.createElement("label");
    label.textContent = "Couleur : ";
    form.appendChild(label);

    let select = document.createElement("select");
    select.id = "color";
    document.getElementById("perso").appendChild(select);
}

function createColorList(couleur) {                               //Fonction qui va créer une boucle afin afficher toutes les couleurs des ours contenues dans l'API
    for (let i = 0; i < couleur.length; i++) {

        let option = document.createElement("option");
        option.textContent = couleur[i];
        document.getElementById("color").appendChild(option);
    }
}

function selectQuantity(conteneur) {                              //Fonction qui affichera le menu déroulant qui permettra à l'utilisateur de choisir la quantité de produit voulue

    let form = document.createElement("form");
    form.id = "number"
    conteneur.appendChild(form);

    let label = document.createElement("label");
    label.textContent = "Quantité : ";
    form.appendChild(label);

    let select = document.createElement("select");
    select.id = "quantity"
    document.getElementById("number").appendChild(select);
}

function createQuantityList(quantité) {                          //Fonction qui va créer une boucle afin afficher le choix des quantités (de 1 à 10)
    for (let i = 0; i < 10; i++) {

        let option = document.createElement("option");
        option.textContent = i + 1;
        document.getElementById("quantity").appendChild(option);
    }
}

function fillProductPage(data) {                                //Fonction qui va remplir la page des produits en détail

    const idBear     = data.id;                                 //Déclaration des constantes pour stocker les données des produits
    const imgBear    = data.imageUrl;
    const nameBear   = data.name;
    const priceBear  = data.price;
    const infosBear  = data.description;
    const colorsBear = data.colors;

    let div = document.createElement("div");                    // Création de la div .bear
    div.className = "bear";
    document.getElementById("teddy_infos").appendChild(div);

    let img = document.createElement("img");                    //Création de la balise <img> dans la div bear afin d'insérer les images des produits
    img.src = imgBear;
    div.appendChild(img);

    let h2 = document.createElement("h2");                      //Création de la balise <h2> dans la div bear afin d'insérer les noms des produits
    h2.textContent = nameBear;
    div.appendChild(h2);

    div.appendChild(document.createElement("hr"));              //Création de la balise <hr> pour intégrer un trait horizontal décoratif

    let p2 = document.createElement("p");                       //Création d'un paragraphe <p> dans la div bear afin d'insérer la description des produits
    p2.textContent = infosBear;
    div.appendChild(p2);

    div.appendChild(document.createElement("hr"));

    displayPrice(priceBear, div)                                //Appel des fonctions qui rempliront ma page des produits

    selectColor(div)

    createColorList(colorsBear)

    selectQuantity(div)

    createQuantityList()

    let addToCart = document.createElement("button");           //Je crée un bouton
    addToCart.addEventListener("click", addToBasket);           //Je crée un évènement au clic sur mon bouton

    function addToBasket() {
                                                                //Création de la fonction qui va permettre d'ajouter des produits au panier
        let sel = document.getElementById("color");             //Variables qui vont permettre la prise en compte du choix des couleurs et de la quantité dans l'ajout au panier 
        let sel2 = document.getElementById("quantity");
        currentColor = sel.options[sel.selectedIndex].innerHTML;
        currentQuantity = sel2.options[sel2.selectedIndex].innerHTML;

        let cart = JSON.parse(localStorage.getItem('cart'));    //Les données stockées dans le localStorage n'ont pas de délai d'expiration

        let newCart = {                                         //Je crée un objet qu'on va stocker ds le localStorage avec les infos donnés par l'utilisateur recuperer juste au dessus
            'id': idBear,
            'color': currentColor,
            'quantity': currentQuantity,
            'price': priceBear,
            'img': imgBear,
            'name': nameBear,
        };

        alert("Article ajouté à votre panier !")                //Je crée un message d'alerte pour que l'utilisateur ait la confirmation que son article a bien été ajouté au panier
        
        if (cart === null) {                                    //SI le panier est vide donc null, je crée un tableau vide
            cart = [];
        }
        
        cart.push(newCart);                                     //Grâce à la méthode push, j'ajoute dans le cart les propriétés de l'objet newCart

        localStorage.setItem('cart', JSON.stringify(cart));     //???????
        // window.location.href = ".html";
        }

        addToCart.id = "add_cart";
        addToCart.textContent = "Ajouter au panier";
        div.appendChild(addToCart);
    }

    fetch("http://localhost:3000/api/teddies/" + idTeddy)       //Récupéreration des données de l'API en fonction de id du produit

        .then(response => response.json())

        .then(function (data) {

            fillProductPage(data)
        })