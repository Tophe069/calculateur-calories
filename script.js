let alimentsData = {};
let menuActuel = [];

fetch('aliments.json')
  .then(response => response.json())
  .then(data => {
    alimentsData = data;
    afficherCategories();
    remplirCategoriesSelect();
  })
  .catch(error => {
    console.error("Erreur de chargement :", error);
    document.getElementById("app").innerHTML = `<p class="text-red-500">Erreur de chargement des données alimentaires.</p>`;
  });

function afficherCategories() {
  const app = document.getElementById("app");
  const existingForm = app.querySelector('div.p-4.bg-blue-50');
  app.innerHTML = '';
  if (existingForm) app.appendChild(existingForm);

  const categoriesContainer = document.createElement("div");
  categoriesContainer.className = "grid grid-cols-2 gap-4 mb-4";

  for (const categorie in alimentsData) {
    const btn = document.createElement("button");
    btn.textContent = categorie;
    btn.className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600";
    btn.onclick = () => afficherAliments(categorie);
    categoriesContainer.appendChild(btn);
  }

  app.appendChild(categoriesContainer);
  afficherResumeMenu();
}

function afficherAliments(categorie) {
  const app = document.getElementById("app");
  const existingForm = app.querySelector('div.p-4.bg-blue-50');
  app.innerHTML = '';
  if (existingForm) app.appendChild(existingForm);

  const aliments = alimentsData[categorie];

  const titre = document.createElement("h2");
  titre.className = "text-xl font-bold mb-4";
  titre.textContent = categorie;
  app.appendChild(titre);

  const liste = document.createElement("div");
  liste.className = "grid grid-cols-1 gap-2";
  app.appendChild(liste);

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

  const retour = document.createElement("button");
  retour.textContent = "← Retour";
  retour.className = "mt-4 text-sm text-blue-500";
  retour.onclick = afficherCategories;
  app.appendChild(retour);
}

function ajouterAliment(categorie, nom) {
  const aliment = alimentsData[categorie][nom];
  menuActuel.push({ nom, ...aliment });
  afficherCategories();
}

function afficherResumeMenu() {
  if (menuActuel.length === 0) return;

  const app = document.getElementById("app");
  const resume = document.createElement("div");
  resume.className = "mt-6 p-4 bg-gray-100 rounded";

  let total = { calories: 0, proteines: 0, glucides: 0, lipides: 0 };

  resume.innerHTML = `
    <h2 class="text-lg font-bold mb-2">Résumé du menu</h2>
    <ul class="mb-2 space-y-1">
      ${menuActuel.map((item, index) => {
        total.calories += item.calories;
        total.proteines += item.proteines;
        total.glucides += item.glucides;
        total.lipides += item.lipides;
        return `
          <li class="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>${item.nom} (${item.calories.toFixed(0)} kcal)</span>
            <button onclick="supprimerAliment(${index})" class="text-red-500 hover:text-red-700 font-bold">X</button>
          </li>
        `;
      }).join('')}
    </ul>
    <p><strong>Total :</strong></p>
    <p>Calories : ${total.calories.toFixed(0)} kcal</p>
    <p>Protéines : ${total.proteines.toFixed(1)} g</p>
    <p>Glucides : ${total.glucides.toFixed(1)} g</p>
    <p>Lipides : ${total.lipides.toFixed(1)} g</p>
  `;

  app.appendChild(resume);
}

function supprimerAliment(index) {
  menuActuel.splice(index, 1);
  afficherCategories();
}

function remplirCategoriesSelect() {
  const select = document.getElementById("categorieSelect");
  if (!select) return;
  select.innerHTML = '<option value="">-- Choisir une catégorie --</option>';
  for (const cat in alimentsData) {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  }
}

function remplirAlimentsSelect() {
  const cat = document.getElementById("categorieSelect").value;
  const select = document.getElementById("alimentSelect");
  if (!cat || !alimentsData[cat]) {
    select.innerHTML = '<option value="">Veuillez sélectionner une catégorie</option>';
    return;
  }
  const aliments = alimentsData[cat];
  select.innerHTML = '';
  for (const nom in aliments) {
    const opt = document.createElement("option");
    opt.value = nom;
    opt.textContent = nom;
    select.appendChild(opt);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const catSelect = document.getElementById("categorieSelect");
  if (catSelect) catSelect.addEventListener("change", remplirAlimentsSelect);
});

function ajouterAlimentFormulaire() {
  const cat = document.getElementById("categorieSelect").value;
  const nom = document.getElementById("alimentSelect").value;
  const qte = parseFloat(document.getElementById("quantiteInput").value);

  if (!cat || !nom || isNaN(qte) || qte <= 0) return alert("Remplis tous les champs correctement");

  const aliment = alimentsData[cat][nom];
  const alimentAjoute = {
    nom: nom,
    calories: (aliment.calories * qte) / 100,
    proteines: (aliment.proteines * qte) / 100,
    glucides: (aliment.glucides * qte) / 100,
    lipides: (aliment.lipides * qte) / 100
  };

  menuActuel.push(alimentAjoute);
  afficherCategories();
}
