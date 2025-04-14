
let alimentsData = {};

fetch("aliments.json")
  .then(res => res.json())
  .then(data => alimentsData = data);

function calculerBesoins() {
  const sexe = document.getElementById("sexe").value;
  const age = parseFloat(document.getElementById("age").value);
  const poids = parseFloat(document.getElementById("poids").value);
  const taille = parseFloat(document.getElementById("taille").value);
  const activite = parseFloat(document.getElementById("activite").value);
  const objectif = parseFloat(document.getElementById("objectif").value);

  if (isNaN(age) || isNaN(poids) || isNaN(taille)) {
    alert("Merci de remplir tous les champs du profil.");
    return;
  }

  const tmb = sexe === "homme"
    ? 10 * poids + 6.25 * taille - 5 * age + 5
    : 10 * poids + 6.25 * taille - 5 * age - 161;

  const besoinTotal = Math.round(tmb * activite + objectif);
  document.getElementById("besoinCalorique").textContent = "Besoin calorique estimé : " + besoinTotal + " kcal";

  genererMenu(besoinTotal);
}

function genererMenu(besoinTotal) {
  const objectifs = {
    "Petit-déjeuner": besoinTotal * 0.25,
    "Déjeuner": besoinTotal * 0.35,
    "Dîner": besoinTotal * 0.30,
    "Collation": besoinTotal * 0.10
  };

  let menu = {
    "Petit-déjeuner": [],
    "Déjeuner": [],
    "Dîner": [],
    "Collation": []
  };

  let totalParRepas = {
    "Petit-déjeuner": 0,
    "Déjeuner": 0,
    "Dîner": 0,
    "Collation": 0
  };

  const categories = Object.keys(alimentsData);
  let catIndex = 0;

  for (const repas in objectifs) {
    while (totalParRepas[repas] < objectifs[repas] && catIndex < categories.length) {
      const cat = categories[catIndex];
      for (const nom in alimentsData[cat]) {
        const a = alimentsData[cat][nom];
        if (totalParRepas[repas] + a.calories <= objectifs[repas]) {
          totalParRepas[repas] += a.calories;
          menu[repas].push(`${nom} (${a.calories} kcal)`);
        }
        if (totalParRepas[repas] >= objectifs[repas]) break;
      }
      catIndex++;
    }
  }

  afficherMenuRepas(menu);
}

function afficherMenuRepas(menu) {
  const section = document.getElementById("generationMenu");
  section.classList.remove("hidden");

  const container = document.getElementById("menuGenere");
  container.innerHTML = '';

  const emojis = {
    "Petit-déjeuner": "🥐",
    "Déjeuner": "🍛",
    "Dîner": "🍲",
    "Collation": "🍪"
  };

  for (const repas in menu) {
    const bloc = document.createElement("div");
    bloc.className = "mb-4 p-4 border rounded bg-gray-50";

    bloc.innerHTML = `<h3 class="text-lg font-semibold mb-2">${emojis[repas]} ${repas}</h3>
      <ul class="list-disc list-inside text-sm">
        ${menu[repas].map(item => `<li>${item}</li>`).join("")}
      </ul>`;

    container.appendChild(bloc);
  }
}

function exporterPDF() {
  const element = document.getElementById("menuGenere");
  html2pdf().from(element).save("menu.pdf");
}
