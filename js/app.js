//Page Index

//Création de la fonction qui va permettre de créer des balises et d'insérer du contenu à l'intérieur
function fillProducts(data) {

    const reponse = data;

    for (let i = 0; i < reponse.length; i++) {

        const idTeddies = reponse[i]._id;
        const imgTeddies = reponse[i].imageUrl;
        const nameTeddies = reponse[i].name;
        const priceTeddies = reponse[i].price;
        const infoTeddies = reponse[i].description;
        const colorTeddies = reponse[i].colors;

        let div = document.createElement("div");//Création d'une div id="teddies"
        div.className = "teddies";
        document.getElementById("teddy").appendChild(div);

        let img = document.createElement("img");//Création de la balise <img> dans la div id="teddies" afin d'insérer les images des produits
        img.src = imgTeddies;
        div.appendChild(img);

        let h2 = document.createElement("h2");//Création de la balise <h2> dans la div id="teddies" afin d'insérer les noms des produits
        h2.textContent = nameTeddies;
        div.appendChild(h2);

        let hr = document.createElement("hr");//Insertion d'un trait horizontal décoratif
        div.appendChild(hr)

        let p = document.createElement("p");
        p.textContent = priceTeddies / 100 + ".00 €";//Création de la balise <p> dans la div id="teddies" afin d'insérer les prix des produits
        div.appendChild(p);

        let seeMore = document.createElement("button");//Création d'un bouton dans la div id="teddies" afin d'afficher les produits en détails 
        seeMore.className = "see_more";
        seeMore.textContent = "Voir plus";
        div.appendChild(seeMore);

        seeMore.addEventListener("click", function (recupId) {//Au clic, Fonction qui récupère les données de chaque ours en fonction de son id 
            let id = idTeddies
            document.location.href = "produits.html?id=" + idTeddies
        })
    }
}


// Récupération des données de l'API
const url = "http://localhost:3000/api/teddies";

fetch(url)

    .then(response => response.json())

    .then(function (data) {

        fillProducts(data)
        
    })

// Création du Menu burger "nav" pour la version responsive du site
let btn = document.querySelector('.toggle_btn');
let nav = document.querySelector('.nav');

btn.onclick = function () {
    nav.classList.toggle('nav_open');
}

btn.addEventListener('click', () => {
    btn.classList.toggle('nav_cross')
});