// === INITIALISATION DE L'APPLICATION ===
// Ce script charge la base d'aliments et prépare l'interface

let alimentsData = {};

// Chargement de aliments.json
fetch('aliments.json')
  .then(response => {
    if (!response.ok) throw new Error('Fichier aliments.json introuvable');
    return response.json();
  })
  .then(data => {
    alimentsData = data;
    console.log("Base d'aliments chargée :", alimentsData);
    afficherCategories();
  })
  .catch(error => {
    console.error("Erreur de chargement :", error);
    document.getElementById("app").innerHTML = `<p class="text-red-500">Erreur de chargement des données alimentaires.</p>`;
  });

// === FONCTIONS ===

// Affiche les catégories d'aliments dans l'interface
function afficherCategories() {
  const app = document.getElementById("app");
  app.innerHTML = '<h2 class="text-xl font-bold mb-4">Sélectionne une catégorie</h2><div id="categories" class="grid grid-cols-2 gap-4"></div>';

  const categoriesContainer = document.getElementById("categories");

  for (const categorie in alimentsData) {
    const btn = document.createElement("button");
    btn.textContent = categorie;
    btn.className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600";
    btn.onclick = () => afficherAliments(categorie);
    categoriesContainer.appendChild(btn);
  }
}

// Affiche les aliments d'une catégorie
function afficherAliments(categorie) {
  const app = document.getElementById("app");
  const aliments = alimentsData[categorie];

  app.innerHTML = `<h2 class="text-xl font-bold mb-4">${categorie}</h2><div id="listeAliments" class="grid grid-cols-1 gap-2"></div><button class="mt-4 text-sm text-blue-500" onclick="afficherCategories()">← Retour</button>`;

  const liste = document.getElementById("listeAliments");

  for (const nom in aliments) {
    const aliment = aliments[nom];

    const div = document.createElement("div");
    div.className = "border rounded p-2";

    div.innerHTML = `
      <h3 class="font-semibold">${nom}</h3>
      <p>Calories : ${aliment.calories} kcal</p>
      <p>Protéines : ${aliment.proteines} g</p>
      <p>Glucides : ${aliment.glucides} g</p>
      <p>Lipides : ${aliment.lipides} g</p>
    `;

    liste.appendChild(div);
  }
}
