//Confirmation de commande
let resultPrice = JSON.parse(localStorage.getItem('resultPrice'));     //Données récupérées dans le LocalStorage

let h2 = document.createElement("h2");                                 //Création de la balise <h2> dans la div confirm afin de remercier l'utilisateur pour sa commande
h2.textContent = "Merci pour votre achat !";
document.getElementById("confirm").appendChild(h2);

let p = document.createElement("p");                                   //Création d'un paragraphe <p> pour indiquer l'identifiant de commande et le prix total
p.textContent = " Nous avons le plaisir de vous informer que votre commande #E5698P7 d'un montant de " + resultPrice + " € a bien été enregistrée !";
document.getElementById("confirm").appendChild(p);

let returnHome = document.createElement("button");                     //Création d'un bouton pour retourner sur la page d'accueil
returnHome.id = "return_order";
returnHome.textContent = "Retour à l'accueil";
document.getElementById("confirm").appendChild(returnHome);

returnHome.addEventListener("click", function () {                     //Au clic, Fonction qui renvoi l'utilisateur sur la page d'accueil
    window.location.href = "index.html";
});