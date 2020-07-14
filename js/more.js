// Ajout des données sur la page des produits
const paramUrl = new URLSearchParams(window.location.search)
let idTeddy = paramUrl.get("id")

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

    let idBear = data.id;
    let imgBear = data.imageUrl;
    let nameBear = data.name;
    let priceBear = data.price;
    let infosBear = data.description;
    let colorsBear = data.colors;

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

    let addBasket = document.createElement("button");
    addBasket.id = "add_basket";
    addBasket.textContent = "Ajouter au panier";
    div.appendChild(addBasket);
}

fetch("http://localhost:3000/api/teddies/" + idTeddy)

    .then(response => response.json())

    .then(function (data) {

        fillProductPage(data)
    })
