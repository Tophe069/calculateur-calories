// Base de données des aliments
let alimentsDatabase = [
    {
        "nom": "Pomme",
        "categorie": "fruit",
        "valeurs": {
            "kcal": 52,
            "prot": 0.3,
            "gluc": 14,
            "lip": 0.2,
            "fibres": 2.4,
            "Ca": 6,
            "Fe": 0.1,
            "Mg": 5,
            "vitC": 4.6,
            "B12": 0,
            "D": 0
        }
    },
    {
        "nom": "Banane",
        "categorie": "fruit",
        "valeurs": {
            "kcal": 89,
            "prot": 1.1,
            "gluc": 23,
            "lip": 0.3,
            "fibres": 2.6,
            "Ca": 5,
            "Fe": 0.3,
            "Mg": 27,
            "vitC": 8.7,
            "B12": 0,
            "D": 0
        }
    },
    {
        "nom": "Orange",
        "categorie": "fruit",
        "valeurs": {
            "kcal": 47,
            "prot": 0.9,
            "gluc": 12,
            "lip": 0.1,
            "fibres": 2.4,
            "Ca": 40,
            "Fe": 0.1,
            "Mg": 10,
            "vitC": 53.2,
            "B12": 0,
            "D": 0
        }
    },
    {
        "nom": "Lait demi-écrémé",
        "categorie": "laitage",
        "valeurs": {
            "kcal": 50,
            "prot": 3.4,
            "gluc": 4.8,
            "lip": 1.5,
            "fibres": 0,
            "Ca": 120,
            "Fe": 0,
            "Mg": 10,
            "vitC": 0,
            "B12": 0.5,
            "D": 1
        }
    }
    // Ajoutez les autres aliments ici...
];

// Maintenant, ajoutez le reste de votre code JavaScript

// Fonction pour calculer les besoins caloriques quotidiens
function calculerBesoinsCaloriques(sexe, age, poids, taille, niveauActivite, objectif) {
    let tmb; // Taux métabolique de base
    
    if (sexe === 'homme') {
        tmb = 10 * poids + 6.25 * taille - 5 * age + 5;
    } else {
        tmb = 10 * poids + 6.25 * taille - 5 * age - 161;
    }
    
    // Facteur d'activité
    let facteurActivite;
    switch (niveauActivite) {
        case 'sedentaire':
            facteurActivite = 1.2;
            break;
        case 'leger':
            facteurActivite = 1.375;
            break;
        case 'modere':
            facteurActivite = 1.55;
            break;
        case 'actif':
            facteurActivite = 1.725;
            break;
        case 'tres-actif':
            facteurActivite = 1.9;
            break;
        default:
            facteurActivite = 1.2;
    }
    
    // Calcul des besoins caloriques quotidiens
    let besoinsCaloriques = tmb * facteurActivite;
    
    // Ajustement selon l'objectif
    switch (objectif) {
        case 'perte':
            besoinsCaloriques *= 0.8; // Déficit de 20%
            break;
        case 'prise':
            besoinsCaloriques *= 1.15; // Surplus de 15%
            break;
        // Cas de maintien: aucun ajustement nécessaire
    }
    
    return Math.round(besoinsCaloriques);
}

// Fonction pour filtrer les aliments par catégorie
function filtrerAlimentsParCategorie(categorie) {
    return alimentsDatabase.filter(aliment => aliment.categorie === categorie);
}

// Fonction pour générer des suggestions d'aliments en fonction des calories allouées
function genererSuggestionsAliments(typeRepas, calories) {
    const suggestions = [];
    let caloriesRestantes = calories;
    
    // Définir les catégories d'aliments appropriées pour chaque type de repas
    let categories;
    switch (typeRepas) {
        case 'petit-dejeuner':
            categories = ['fruit', 'laitage', 'féculent'];
            break;
        case 'dejeuner':
            categories = ['protéine', 'légume', 'féculent'];
            break;
        case 'diner':
            categories = ['protéine', 'légume', 'féculent'];
            break;
        case 'collation':
            categories = ['fruit', 'laitage', 'collation'];
            break;
        default:
            categories = ['fruit', 'légume', 'protéine', 'féculent', 'laitage'];
    }
    
    // Ajouter des aliments de chaque catégorie jusqu'à atteindre approximativement les calories cibles
    for (const categorie of categories) {
        const alimentsCategorie = filtrerAlimentsParCategorie(categorie);
        
        // Si pas d'aliments dans cette catégorie, passer à la suivante
        if (alimentsCategorie.length === 0) continue;
        
        // Choisir un aliment aléatoire de cette catégorie
        const alimentIndex = Math.floor(Math.random() * alimentsCategorie.length);
        const aliment = alimentsCategorie[alimentIndex];
        
        // Déterminer la portion en fonction des calories restantes
        let portion = Math.min(1, caloriesRestantes / aliment.valeurs.kcal);
        
        // Ajuster la portion pour qu'elle ait du sens (pas trop petite)
        if (portion < 0.3) portion = 0.3;
        
        // Calculer les calories réelles pour cette portion
        const caloriesAliment = Math.round(aliment.valeurs.kcal * portion);
        
        // Ajouter l'aliment aux suggestions
        suggestions.push({
            nom: aliment.nom,
            portion: portion,
            calories: caloriesAliment,
            aliment: aliment // Stocker l'objet aliment complet pour référence
        });
        
        // Mettre à jour les calories restantes
        caloriesRestantes -= caloriesAliment;
        
        // Si on a presque atteint l'objectif calorique, arrêter
        if (caloriesRestantes < 50) break;
    }
    
    return suggestions;
}

// Fonction principale pour générer les repas
function genererRepas() {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const sexe = document.getElementById('sexe').value;
    const age = parseInt(document.getElementById('age').value);
    const poids = parseFloat(document.getElementById('poids').value);
    const taille = parseInt(document.getElementById('taille').value);
    const niveauActivite = document.getElementById('niveau-activite').value;
    const objectif = document.getElementById('objectif').value;
    
    // Récupérer la répartition des calories
    const petitDejeunerPct = parseInt(document.getElementById('petit-dejeuner').value);
    const dejeunerPct = parseInt(document.getElementById('dejeuner').value);
    const dinerPct = parseInt(document.getElementById('diner').value);
    const collationPct = parseInt(document.getElementById('collation').value);
    
    // Vérifier que la somme des pourcentages est égale à 100%
    const somme = petitDejeunerPct + dejeunerPct + dinerPct + collationPct;
    if (somme !== 100) {
        alert('La somme des pourcentages doit être égale à 100%.');
        return;
    }
    
    // Calculer les besoins caloriques quotidiens
    const besoinsCaloriques = calculerBesoinsCaloriques(sexe, age, poids, taille, niveauActivite, objectif);
    
    // Répartir les calories entre les repas
    const caloriesPetitDej = Math.round((besoinsCaloriques * petitDejeunerPct) / 100);
    const caloriesDejeuner = Math.round((besoinsCaloriques * dejeunerPct) / 100);
    const caloriesDiner = Math.round((besoinsCaloriques * dinerPct) / 100);
    const caloriesCollation = Math.round((besoinsCaloriques * collationPct) / 100);
    
    // Générer les suggestions de repas
    const suggestionsPetitDej = genererSuggestionsAliments('petit-dejeuner', caloriesPetitDej);
    const suggestionsDejeuner = genererSuggestionsAliments('dejeuner', caloriesDejeuner);
    const suggestionsDiner = genererSuggestionsAliments('diner', caloriesDiner);
    const suggestionsCollation = genererSuggestionsAliments('collation', caloriesCollation);
    
    // Afficher les résultats
    afficherMenu(besoinsCaloriques, suggestionsPetitDej, suggestionsDejeuner, suggestionsDiner, suggestionsCollation);
}

// Fonction pour afficher le menu généré
function afficherMenu(besoinsCaloriques, suggestionsPetitDej, suggestionsDejeuner, suggestionsDiner, suggestionsCollation) {
    // Créer le conteneur pour le menu
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = ''; // Effacer le contenu précédent
    
    // Créer la section résumé nutritionnel
    const resumeSection = document.createElement('div');
    resumeSection.className = 'card nutrition-summary';
    resumeSection.innerHTML = `
        <h2>Résumé nutritionnel journalier</h2>
        <p>Besoins caloriques quotidiens: <strong>${besoinsCaloriques} calories</strong></p>
    `;
    menuContainer.appendChild(resumeSection);
    
    // Fonction pour créer une carte de repas
    function creerCarteRepas(titre, suggestions, classeCSS) {
        const totalCalories = suggestions.reduce((total, sugg) => total + sugg.calories, 0);
        
        const card = document.createElement('div');
        card.className = `meal-card ${classeCSS}`;
        
        let suggestionHTML = '';
        suggestions.forEach((sugg, index) => {
            suggestionHTML += `
                <div class="meal-item" data-index="${index}" data-type="${classeCSS}">
                    <span>${sugg.nom}</span>
                    <span class="meal-calories">${sugg.calories} cal</span>
                    <span class="replace-button" onclick="ouvrirModalRemplacement('${classeCSS}', ${index})">🔄</span>
                </div>
            `;
        });
        
        card.innerHTML = `
            <h3>${titre} (${totalCalories} calories)</h3>
            ${suggestionHTML}
        `;
        
        return card;
    }
    
    // Ajouter les cartes de repas
    menuContainer.appendChild(creerCarteRepas('Petit-déjeuner', suggestionsPetitDej, 'petit-dejeuner'));
    menuContainer.appendChild(creerCarteRepas('Déjeuner', suggestionsDejeuner, 'dejeuner'));
    menuContainer.appendChild(creerCarteRepas('Dîner', suggestionsDiner, 'diner'));
    
    // Ajouter la carte de collation seulement si des collations sont prévues
    if (suggestionsCollation.length > 0) {
        menuContainer.appendChild(creerCarteRepas('Collation', suggestionsCollation, 'collation'));
    }
}

// Variables globales pour le remplacement d'aliments
let typeRepasActuel = '';
let indexAlimentActuel = -1;

// Fonction pour ouvrir la fenêtre modale de remplacement d'aliment
function ouvrirModalRemplacement(typeRepas, index) {
    typeRepasActuel = typeRepas;
    indexAlimentActuel = index;
    
    const modal = document.getElementById('replacement-modal');
    const select = document.getElementById('replacement-select');
    
    // Effacer les options précédentes
    select.innerHTML = '';
    
    // Déterminer la catégorie appropriée pour ce type de repas
    let categorie;
    switch (typeRepas) {
        case 'petit-dejeuner':
            categorie = 'fruit';
            break;
        case 'dejeuner':
        case 'diner':
            categorie = 'protéine';
            break;
        case 'collation':
            categorie = 'collation';
            break;
        default:
            categorie = 'fruit';
    }
    
    // Filtrer les aliments par catégorie
    const alimentsFiltre = filtrerAlimentsParCategorie(categorie);
    
    // Ajouter les options au select
    alimentsFiltre.forEach(aliment => {
        const option = document.createElement('option');
        option.value = aliment.nom;
        option.textContent = `${aliment.nom} (${aliment.valeurs.kcal} cal)`;
        select.appendChild(option);
    });
    
    // Afficher la fenêtre modale
    modal.style.display = 'block';
}

// Fonction pour confirmer le remplacement d'un aliment
function confirmerRemplacement() {
    const select = document.getElementById('replacement-select');
    const nouvelAlimentNom = select.value;
    
    // Trouver le nouvel aliment
    const nouvelAliment = alimentsDatabase.find(aliment => aliment.nom === nouvelAlimentNom);
    
    if (!nouvelAliment) {
        alert('Aliment non trouvé.');
        return;
    }
    
    // Mettre à jour l'aliment dans les suggestions
    // Cette partie dépend de la structure de vos données et de votre logique d'affichage
    
    // Fermer la fenêtre modale
    document.getElementById('replacement-modal').style.display = 'none';
    
    // Régénérer le menu (vous devrez adapter cette partie)
    // genererRepas();
}

// Gestionnaire d'événements pour la soumission du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('meal-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            genererRepas();
        });
    }
    
    // Gestionnaire pour le bouton de confirmation de remplacement
    const confirmButton = document.getElementById('confirm-replacement');
    if (confirmButton) {
        confirmButton.addEventListener('click', confirmerRemplacement);
    }
    
    // Gestionnaire pour fermer la fenêtre modale
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            document.getElementById('replacement-modal').style.display = 'none';
        });
    }
});
