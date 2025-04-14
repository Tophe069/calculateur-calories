// === Données ===
let alimentsData = {};
let menuActuel = [];

// === Chargement des données ===
fetch('aliments.json')
  .then(response => response.json())
  .then(data => {
    alimentsData = data;
    afficherCategories();
  })
  .catch(error => {
    console.error("Erreur de chargement :", error);
    document.getElementById("app").innerHTML = `<p class="text-red-500">Erreur de chargement des données alimentaires.</p>`;
  });

// === Affichage des catégories ===
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

  afficherResumeMenu();
}

// === Affichage des aliments d'une catégorie ===
function afficherAliments(categorie) {
  const app = document.getElementById("app");
  const aliments = alimentsData[categorie];

  app.innerHTML = `<h2 class="text-xl font-bold mb-4">${categorie}</h2><div id="listeAliments" class="grid grid-cols-1 gap-2"></div><button class="mt-4 text-sm text-blue-500" onclick="afficherCategories()">← Retour</button>`;

  const liste = document.getElementById("listeAliments");

  for (const nom in aliments) {
    const aliment = aliments[nom];

    const div = document.createElement("div");
    div.className = "border rounded p-2 flex justify-between items-center";

    const infos = `
      <div>
        <h3 class="font-semibold">${nom}</h3>
        <p>Calories : ${aliment.calories} kcal</p>
        <p>Protéines : ${aliment.proteines} g</p>
        <p>Glucides : ${aliment.glucides} g</p>
        <p>Lipides : ${aliment.lipides} g</p>
      </div>`;

    const bouton = `<button onclick='ajouterAliment("${categorie}", "${nom}")' class="ml-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Ajouter</button>`;

    div.innerHTML = infos + bouton;
    liste.appendChild(div);
  }
}

// === Ajouter un aliment au menu ===
function ajouterAliment(categorie, nom) {
  const aliment = alimentsData[categorie][nom];
  menuActuel.push({ nom, ...aliment });
  afficherCategories(); // Recharge avec résumé mis à jour
}

// === Affichage du résumé nutritionnel ===
function afficherResumeMenu() {
  if (menuActuel.length === 0) return;

  const app = document.getElementById("app");
  const resume = document.createElement("div");
  resume.className = "mt-6 p-4 bg-gray-100 rounded";

  let total = { calories: 0, proteines: 0, glucides: 0, lipides: 0 };

  menuActuel.forEach(item => {
    total.calories += item.calories;
    total.proteines += item.proteines;
    total.glucides += item.glucides;
    total.lipides += item.lipides;
  });

  resume.innerHTML = `
    <h2 class="text-lg font-bold mb-2">Résumé du menu</h2>
    <ul class="mb-2 list-disc list-inside">
      ${menuActuel.map(item => `<li>${item.nom} (${item.calories} kcal)</li>`).join('')}
    </ul>
    <p><strong>Total :</strong></p>
    <p>Calories : ${total.calories.toFixed(0)} kcal</p>
    <p>Protéines : ${total.proteines.toFixed(1)} g</p>
    <p>Glucides : ${total.glucides.toFixed(1)} g</p>
    <p>Lipides : ${total.lipides.toFixed(1)} g</p>
  `;

  app.appendChild(resume);
}
