
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

function genererMenu(besoin) {
  const section = document.getElementById("generationMenu");
  section.classList.remove("hidden");

  const container = document.getElementById("menuGenere");
  container.innerHTML = '';

  let total = 0;
  let menu = [];

  for (const categorie in alimentsData) {
    for (const nom in alimentsData[categorie]) {
      if (total >= besoin) break;
      const alim = alimentsData[categorie][nom];
      total += alim.calories;
      menu.push(`${nom} (${alim.calories} kcal)`);
    }
    if (total >= besoin) break;
  }

  container.innerHTML = "<ul class='list-disc list-inside'>" + menu.map(m => `<li>${m}</li>`).join('') + "</ul>";
}

function exporterPDF() {
  const element = document.getElementById("menuGenere");
  html2pdf().from(element).save("menu.pdf");
}
