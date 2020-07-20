// Ajout des données sur la page des produits

const paramUrl = new URLSearchParams(window.location.search);
let idTeddy = paramUrl.get("id");                               // Je stocke dans une variable l'id du produit sélectionné

let cart = [];
let currentColor = "";
let currentQuantity = 1;

function displayPrice(prix, conteneur) {
    let p = document.createElement("p");
    p.id = "price";
    p.textContent = "Prix unitaire: " + prix / 100 + ".00 €";
    conteneur.appendChild(p);
}

function selectColor(conteneur) {
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

function createColorList(couleur) {
    for (let i = 0; i < couleur.length; i++) {

        let option = document.createElement("option");
        option.textContent = couleur[i];
        document.getElementById("color").appendChild(option);
    }
}

function selectQuantity(conteneur) {

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

function createQuantityList(quantité) {
    for (let i = 0; i < 10; i++) {

        let option = document.createElement("option");
        option.textContent = i + 1;
        document.getElementById("quantity").appendChild(option);
    }
}

function fillProductPage(data) {

    const idBear     = data.id;
    const imgBear    = data.imageUrl;
    const nameBear   = data.name;
    const priceBear  = data.price;
    const infosBear  = data.description;
    const colorsBear = data.colors;

    let div = document.createElement("div");
    div.className = "bear";
    document.getElementById("teddy_infos").appendChild(div);

    let img = document.createElement("img");
    img.src = imgBear;
    div.appendChild(img);

    let h2 = document.createElement("h2");
    h2.textContent = nameBear;
    div.appendChild(h2);

    div.appendChild(document.createElement("hr"));

    let p2 = document.createElement("p");
    p2.textContent = infosBear;
    div.appendChild(p2);

    div.appendChild(document.createElement("hr"));

    displayPrice(priceBear, div)

    selectColor(div)

    createColorList(colorsBear)

    selectQuantity(div)

    createQuantityList()

    var addToCart = document.createElement("button");
    addToCart.addEventListener("click", addToBasket);                     // crea evnt click btn 

    function addToBasket() {

        var sel = document.getElementById("color");
        var sel2 = document.getElementById("quantity");
        currentColor = sel.options[sel.selectedIndex].innerHTML;
        currentQuantity = sel2.options[sel2.selectedIndex].innerHTML;

        //Json parse pour pouvoir plus facilement travailler avec ce qu'on reçoit du localStorage
        let cart = JSON.parse(localStorage.getItem('cart'));

        //on créer un objet qu'on va stocker ds le localStorage avec les infos donnés par l'utilisateur recuperer juste au dessus

        let newCart = {
            'id': idBear,
            'color': currentColor,
            'quantity': currentQuantity,
            'price': priceBear,
            'img': imgBear,
            'name': nameBear,
        };

        alert("Article ajouté à votre panier !")
        
        // si encore rien ds le panier, le panier est vide donc null, si il est null il faut creer un tableau vide
        if (cart === null) {
            cart = [];
        }
        //on ajoute dans le cart l'objet qui porte les infos utiles 
        cart.push(newCart);

        // on écrase l'ancienne valeur du panier, mais comme on l'a recupérer avt et qu'avec push on ajoute qqch sans ecraser les valeurs deja presente, on ne perds pas d'info
        localStorage.setItem('cart', JSON.stringify(cart));
        // window.location.href = ".html";
        }

        // addToCart.addEventListener("click", function (event) {
        //     var sel = document.getElementById("color");
        //     var sel2 = document.getElementById("quantity");
        //     currentColor = sel.options[sel.selectedIndex].innerHTML;
        //     currentQuantity = sel2.options[sel2.selectedIndex].innerHTML;

        //     cart = [...cart, {
        //         name: data.name,
        //         price: data.price,
        //         color: currentColor,
        //         quantity: currentQuantity
        //     }];

        //     localStorage.setItem("cart", JSON.stringify(cart))

        // })
        addToCart.id = "add_cart";
        addToCart.textContent = "Ajouter au panier";
        div.appendChild(addToCart);
    }

    fetch("http://localhost:3000/api/teddies/" + idTeddy)

        .then(response => response.json())

        .then(function (data) {

            fillProductPage(data)
        })