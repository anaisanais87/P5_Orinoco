//Page Index
function fillProducts(data) {

    const reponse = data;

    for (let i = 0; i < reponse.length; i++) {

        const idTeddies = reponse[i]._id;
        const imgTeddies = reponse[i].imageUrl;
        const nameTeddies = reponse[i].name;
        const priceTeddies = reponse[i].price;
        const infoTeddies = reponse[i].description;
        const colorTeddies = reponse[i].colors;

        let div = document.createElement("div");
        div.className = "teddies";
        document.getElementById("teddy").appendChild(div);

        let img = document.createElement("img");
        img.src = imgTeddies;
        div.appendChild(img);

        let h2 = document.createElement("h2");
        h2.textContent = nameTeddies;
        div.appendChild(h2);

        let hr = document.createElement("hr");
        div.appendChild(hr)

        let p = document.createElement("p");
        p.textContent = priceTeddies / 100 + ".00 €";
        div.appendChild(p);

        let seeMore = document.createElement("button");
        seeMore.className = "see_more";
        seeMore.textContent = "Voir plus";
        div.appendChild(seeMore);

        seeMore.addEventListener("click", function (recupId) {
            let id = idTeddies
            document.location.href = "produits.html?id=" + idTeddies
        })
    }
}

function createButton(conteneur) {
    
}

const url = "http://localhost:3000/api/teddies";

fetch(url)

    .then(response => response.json())

    .then(function (data) {

        fillProducts(data)
        
    })

// Menu burger "nav" 
let btn = document.querySelector('.toggle_btn');
let nav = document.querySelector('.nav');

btn.onclick = function () {
    nav.classList.toggle('nav_open');
}

btn.addEventListener('click', () => {
    btn.classList.toggle('nav_cross')
});