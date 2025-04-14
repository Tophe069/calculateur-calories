
let alimentsData = {};

fetch("aliments.json")
  .then(res => res.json())
  .then(data => alimentsData = data);


window.addEventListener("DOMContentLoaded", () => {
  const champs = ["sexe", "age", "poids", "taille", "activite", "objectif"];
  champs.forEach(id => {
    if (localStorage.getItem(id)) {
      document.getElementById(id).value = localStorage.getItem(id);
    }
  });
});

function calculerBesoins() {
  const champs = ["sexe", "age", "poids", "taille", "activite", "objectif"];
  champs.forEach(id => {
    const value = document.getElementById(id).value;
    localStorage.setItem(id, value);
  });

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

  const alimentsFlat = [];
  for (const cat in alimentsData) {
    for (const nom in alimentsData[cat]) {
      alimentsFlat.push({ nom, ...alimentsData[cat][nom] });
    }
  }

  let used = new Set();

  for (const repas in objectifs) {
    for (let i = 0; i < alimentsFlat.length; i++) {
      const item = alimentsFlat[i];
      if (used.has(item.nom)) continue;
      if (totalParRepas[repas] + item.calories <= objectifs[repas]) {
        totalParRepas[repas] += item.calories;
        menu[repas].push(item);
        used.add(item.nom);
      }
      if (totalParRepas[repas] >= objectifs[repas]) break;
    }
  }

  afficherMenuRepas(menu, totalParRepas);
}

function afficherMenuRepas(menu, totals) {
  const section = document.getElementById("generationMenu");
  section.classList.remove("hidden");

  const container = document.getElementById("menuGenere");
  container.innerHTML = '';

  const emojis = {
    "Petit-déjeuner": "🥐",
    "Déjeuner": "🍛",
    "Dîner": "🍲",
    "Collation": "🥤"
  };

  for (const repas in menu) {
    const bloc = document.createElement("div");
    bloc.className = "mb-4 p-4 border rounded bg-gray-50";

    
let totalMacros = { kcal: 0, proteines: 0, glucides: 0, lipides: 0 };
menu[repas].forEach(item => {
  totalMacros.kcal += item.calories;
  totalMacros.proteines += item.proteines;
  totalMacros.glucides += item.glucides;
  totalMacros.lipides += item.lipides;
});
bloc.innerHTML = `<h3 class="text-lg font-semibold mb-2">${emojis[repas]} ${repas} — ${totalMacros.kcal.toFixed(0)} kcal</h3>
<ul class="list-disc list-inside text-sm mb-2">
  ${menu[repas].map(item => `<li>${item.nom} (${item.calories} kcal)</li>`).join("")}
</ul>
<p class="text-xs text-gray-600 italic">
  Protéines : ${totalMacros.proteines.toFixed(1)} g • Glucides : ${totalMacros.glucides.toFixed(1)} g • Lipides : ${totalMacros.lipides.toFixed(1)} g
</p>`;

      <ul class="list-disc list-inside text-sm">
        ${menu[repas].map(item => `<li>${item.nom} (${item.calories} kcal)</li>`).join("")}
      </ul>`;

    container.appendChild(bloc);
  }
}

function exporterPDF() {
  const element = document.getElementById("menuGenere");
  html2pdf().from(element).save("menu.pdf");
}
