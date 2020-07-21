//Page Index

function fillProducts(data) {                                    //Création de la fonction qui va permettre de remplir la page d'accueil (index) grâce aux données data de l'API

    const reponse = data;                                        //Déclaration de ma constante (variable non modifiable)

    for (let i = 0; i < reponse.length; i++) {                   //Je crée la boucle for pour remplir ma page avec tous les éléments que renvoie l'API

        const idTeddies = reponse[i]._id;                        //Déclaration des constantes pour stocker les données des produits
        const imgTeddies = reponse[i].imageUrl;
        const nameTeddies = reponse[i].name;
        const priceTeddies = reponse[i].price;
        const infoTeddies = reponse[i].description;
        const colorTeddies = reponse[i].colors;

        let div = document.createElement("div");                //Création d'une div id="teddies" 
        div.className = "teddies";
        document.getElementById("teddy").appendChild(div);

        let img = document.createElement("img");                //Création de la balise <img> dans la div id="teddies" afin d'insérer les images des produits
        img.src = imgTeddies;
        div.appendChild(img);

        let h2 = document.createElement("h2");                  //Création de la balise <h2> dans la div id="teddies" afin d'insérer les noms des produits
        h2.textContent = nameTeddies;
        div.appendChild(h2);

        let hr = document.createElement("hr");                  //Insertion d'un trait horizontal décoratif
        div.appendChild(hr)

        let p = document.createElement("p");
        p.textContent = priceTeddies / 100 + ".00 €";           //Création de la balise <p> dans la div id="teddies" afin d'insérer les prix des produits
        div.appendChild(p);

        let seeMore = document.createElement("button");         //Création d'un bouton dans la div id="teddies" afin d'afficher les produits en détails 
        seeMore.className = "see_more";
        seeMore.textContent = "Voir plus";
        div.appendChild(seeMore);

        seeMore.addEventListener("click", function (recupId) {  //Au clic, Fonction qui récupère les données de chaque ours en fonction de leur id 
            let id = idTeddies
            document.location.href = "produits.html?id=" + idTeddies
        })
    }
}

// Récupération des données de l'API
const url = "http://localhost:3000/api/teddies";                //Déclaration de ma constante de l'url de l'API

fetch(url)                                                      //Les requêtes fetch nous permettent de faire des promesses pour récupérer les données de l'API

    .then(response => response.json())                          //Je demande la réponse en JSON

    .then(function (data) {

        fillProducts(data)                                      //Appel de la fonction qui remplira ma page avec data (données)comme paramètre
        
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