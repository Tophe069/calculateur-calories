// Stockage global des aliments et des repas générés
let alimentsDatabase = [];
let generatedMeals = {};
let totalNutrition = {};

// Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Charger la base de données des aliments
    fetchAliments();
    
    // Validation du formulaire
    document.getElementById('userForm').addEventListener('submit', handleFormSubmit);
    
    // Validation de la répartition des calories
    const repartitionInputs = document.querySelectorAll('.repartition-input');
    repartitionInputs.forEach(input => {
        input.addEventListener('change', validateRepartition);
    });
    
    // Initialiser le modal Bootstrap pour le remplacement d'ingrédient
    const replaceModal = new bootstrap.Modal(document.getElementById('replaceModal'));
});

// Fonction pour charger la base de données des aliments depuis le fichier JSON
async function fetchAliments() {
    try {
        const response = await fetch('base_aliments_tophe.json');
        alimentsDatabase = await response.json();
        console.log('Base de données d\'aliments chargée:', alimentsDatabase.length, 'aliments trouvés');
    } catch (error) {
        console.error('Erreur lors du chargement des aliments:', error);
        alert('Impossible de charger la base de données d\'aliments. Veuillez réessayer.');
    }
}

// Validation de la répartition des calories (somme = 100%)
function validateRepartition() {
    const petitDej = parseInt(document.getElementById('petit_dejeuner').value) || 0;
    const dejeuner = parseInt(document.getElementById('dejeuner').value) || 0;
    const diner = parseInt(document.getElementById('diner').value) || 0;
    const collation = parseInt(document.getElementById('collation').value) || 0;
    
    const total = petitDej + dejeuner + diner + collation;
    const alertElement = document.querySelector('.repartition-alert');
    
    if (total !== 100) {
        alertElement.style.display = 'block';
        alertElement.textContent = `La somme actuelle est de ${total}%. Ajustez pour obtenir 100%.`;
        document.getElementById('generateButton').disabled = true;
    } else {
        alertElement.style.display = 'none';
        document.getElementById('generateButton').disabled = false;
    }
}

// Gestion de la soumission du formulaire
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Vérifier que la base de données est chargée
    if (alimentsDatabase.length === 0) {
        alert("La base de données d'aliments n'est pas encore chargée. Veuillez patienter.");
        return;
    }
    
    // Récupérer les données du formulaire
    const userData = {
        sexe: document.getElementById('sexe').value,
        age: parseInt(document.getElementById('age').value),
        poids: parseFloat(document.getElementById('poids').value),
        taille: parseInt(document.getElementById('taille').value),
        activite: parseFloat(document.getElementById('activite').value),
        objectif: document.getElementById('objectif').value,
        repartition: {
            petitDejeuner: parseInt(document.getElementById('petit_dejeuner').value) / 100,
            dejeuner: parseInt(document.getElementById('dejeuner').value) / 100,
            diner: parseInt(document.getElementById('diner').value) / 100,
            collation: parseInt(document.getElementById('collation').value) / 100
        }
    };
    
    // Générer les repas
    generateMeals(userData);
}

// Calcul du métabolisme de base (Mifflin-St Jeor)
function calculateBMR(userData) {
    // Formule Mifflin-St Jeor
    let bmr;
    if (userData.sexe === 'homme') {
        bmr = (10 * userData.poids) + (6.25 * userData.taille) - (5 * userData.age) + 5;
    } else {
        bmr = (10 * userData.poids) + (6.25 * userData.taille) - (5 * userData.age) - 161;
    }
    
    // Ajustement selon le niveau d'activité
    let tdee = bmr * userData.activite;
    
    // Ajustement selon l'objectif
    switch (userData.objectif) {
        case 'perte':
            tdee = tdee * 0.8; // Réduction de 20%
            break;
        case 'sportif':
            tdee = tdee * 1.15; // Augmentation de 15%
            break;
        case 'maintien':
        default:
            // TDEE reste inchangé
            break;
    }
    
    return Math.round(tdee);
}

// Fonction principale pour générer les repas
function generateMeals(userData) {
    // Calculer les besoins caloriques totaux
    const dailyCalories = calculateBMR(userData);
    
    // Calculer les calories par repas
    const mealCalories = {
        petitDejeuner: Math.round(dailyCalories * userData.repartition.petitDejeuner),
        dejeuner: Math.round(dailyCalories * userData.repartition.dejeuner),
        diner: Math.round(dailyCalories * userData.repartition.diner),
        collation: Math.round(dailyCalories * userData.repartition.collation)
    };
    
    // Réinitialiser les repas générés et la nutrition totale
    generatedMeals = {
        petitDejeuner: [],
        dejeuner: [],
        diner: [],
        collation: []
    };
    
    totalNutrition = initializeNutritionTotals();
    
    // Générer chaque repas
    generatedMeals.petitDejeuner = generateBreakfast(mealCalories.petitDejeuner);
    generatedMeals.dejeuner = generateLunchDinner(mealCalories.dejeuner);
    generatedMeals.diner = generateLunchDinner(mealCalories.diner);
    generatedMeals.collation = generateSnack(mealCalories.collation);
    
    // Afficher les repas
    displayMeals(generatedMeals, mealCalories, dailyCalories);
    
    // Calculer et afficher le résumé nutritionnel
    calculateTotalNutrition();
    displayNutritionSummary(userData);
}

// Initialiser l'objet pour les totaux nutritionnels
function initializeNutritionTotals() {
    return {
        kcal: 0,
        prot: 0,
        gluc: 0,
        lip: 0,
        fibres: 0,
        Ca: 0,
        Fe: 0,
        Mg: 0,
        vitC: 0,
        B12: 0,
        D: 0
    };
}

// Calculer la nutrition totale à partir des repas générés
function calculateTotalNutrition() {
    // Réinitialiser les totaux
    totalNutrition = initializeNutritionTotals();
    
    // Parcourir tous les repas et additionner les valeurs nutritionnelles
    for (const mealType in generatedMeals) {
        generatedMeals[mealType].forEach(item => {
            for (const nutrient in totalNutrition) {
                // Calculer la valeur nutritionnelle en fonction de la quantité
                totalNutrition[nutrient] += (item.aliment.valeurs[nutrient] * item.quantite) / 100;
            }
        });
    }
    
    // Arrondir les valeurs
    for (const nutrient in totalNutrition) {
        totalNutrition[nutrient] = Math.round(totalNutrition[nutrient] * 10) / 10;
    }
}

// Génération du petit-déjeuner
function generateBreakfast(calories) {
    // Structure: 1 fruit, 1 laitage, 1 boisson chaude
    const breakfast = [];
    
    // Filtrer les aliments par catégorie
    const fruits = alimentsDatabase.filter(a => a.categorie === 'fruit');
    const laitages = alimentsDatabase.filter(a => a.categorie === 'laitage');
    const boissons = alimentsDatabase.filter(a => a.categorie === 'boisson');
    
    // Répartition des calories: ~40% fruit, ~50% laitage, ~10% boisson
    const fruitCal = calories * 0.4;
    const laitageCal = calories * 0.5;
    const boissonCal = calories * 0.1;
    
    // Sélectionner les aliments aléatoirement
    const fruit = selectRandomFood(fruits);
    const laitage = selectRandomFood(laitages);
    const boisson = selectRandomFood(boissons);
    
    // Calculer les quantités en fonction des calories
    const fruitQty = calculateQuantity(fruit, fruitCal);
    const laitageQty = calculateQuantity(laitage, laitageCal);
    const boissonQty = calculateQuantity(boisson, boissonCal);
    
    // Ajouter les aliments au petit-déjeuner
    breakfast.push({ aliment: fruit, quantite: fruitQty });
    breakfast.push({ aliment: laitage, quantite: laitageQty });
    breakfast.push({ aliment: boisson, quantite: boissonQty });
    
    return breakfast;
}

// Génération du déjeuner ou dîner
function generateLunchDinner(calories) {
    // Structure: 1 légume, 1 féculent, 1 protéine
    const meal = [];
    
    // Filtrer les aliments par catégorie
    const legumes = alimentsDatabase.filter(a => a.categorie === 'légume');
    const feculents = alimentsDatabase.filter(a => a.categorie === 'féculent');
    const proteines = alimentsDatabase.filter(a => a.categorie === 'protéine');
    
    // Répartition des calories: ~25% légume, ~40% féculent, ~35% protéine
    const legumeCal = calories * 0.25;
    const feculentCal = calories * 0.4;
    const proteineCal = calories * 0.35;
    
    // Sélectionner les aliments aléatoirement
    const legume = selectRandomFood(legumes);
    const feculent = selectRandomFood(feculents);
    const proteine = selectRandomFood(proteines);
    
    // Calculer les quantités en fonction des calories
    const legumeQty = calculateQuantity(legume, legumeCal);
    const feculentQty = calculateQuantity(feculent, feculentCal);
    const proteineQty = calculateQuantity(proteine, proteineCal);
    
    // Ajouter les aliments au repas
    meal.push({ aliment: legume, quantite: legumeQty });
    meal.push({ aliment: feculent, quantite: feculentQty });
    meal.push({ aliment: proteine, quantite: proteineQty });
    
    return meal;
}

// Génération de la collation
function generateSnack(calories) {
    // Structure: 1 fruit OU 1 collation
    const snack = [];
    
    // Filtrer les aliments par catégorie
    const fruits = alimentsDatabase.filter(a => a.categorie === 'fruit');
    const collations = alimentsDatabase.filter(a => a.categorie === 'collation');
    
    // Sélectionner au hasard entre fruit ou collation
    const choixType = Math.random() > 0.5 ? 'fruit' : 'collation';
    
    let aliment;
    if (choixType === 'fruit') {
        aliment = selectRandomFood(fruits);
    } else {
        aliment = selectRandomFood(collations);
    }
    
    // Calculer la quantité en fonction des calories
    const quantite = calculateQuantity(aliment, calories);
    
    // Ajouter l'aliment à la collation
    snack.push({ aliment: aliment, quantite: quantite });
    
    return snack;
}

// Fonction pour sélectionner un aliment aléatoire dans une liste
function selectRandomFood(foodList) {
    const randomIndex = Math.floor(Math.random() * foodList.length);
    return foodList[randomIndex];
}

// Calculer la quantité d'un aliment en fonction des calories cibles
function calculateQuantity(food, targetCalories) {
    // Calculer la quantité nécessaire pour atteindre les calories cibles
    // Formule: (calories cibles / calories pour 100g) * 100
    const quantity = (targetCalories / food.valeurs.kcal) * 100;
    
    // Limiter à un minimum de 10g et arrondir au 5g près
    return Math.max(10, Math.round(quantity / 5) * 5);
}

// Afficher les repas générés dans l'interface
function displayMeals(meals, mealCalories, dailyCalories) {
    // Afficher les conteneurs de repas
    document.getElementById('mealsContainer').style.display = 'block';
    document.querySelector('.initial-message').style.display = 'none';
    
    // Afficher le total de calories
    document.getElementById('caloriesTotal').textContent = `${dailyCalories} kcal/jour`;
    
    // Afficher chaque repas
    displayMealSection('petitDejContainer', 'Petit-déjeuner', meals.petitDejeuner, mealCalories.petitDejeuner, 'petit-dejeuner');
    displayMealSection('dejeunerContainer', 'Déjeuner', meals.dejeuner, mealCalories.dejeuner, 'dejeuner');
    displayMealSection('dinerContainer', 'Dîner', meals.diner, mealCalories.diner, 'diner');
    
    // Afficher la collation si elle existe
    if (meals.collation.length > 0) {
        displayMealSection('collationContainer', 'Collation', meals.collation, mealCalories.collation, 'collation');
    } else {
        document.getElementById('collationContainer').innerHTML = '';
    }
}

// Afficher une section de repas spécifique
function displayMealSection(containerId, title, foodItems, targetCalories, mealClass) {
    const container = document.getElementById(containerId);
    
    // Calculer les calories réelles du repas
    let actualCalories = 0;
    foodItems.forEach(item => {
        actualCalories += (item.aliment.valeurs.kcal * item.quantite) / 100;
    });
    actualCalories = Math.round(actualCalories);
    
    // Créer le titre et l'en-tête de la section
    let html = `
        <div class="card shadow-sm meal-card ${mealClass}">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="h5 mb-0">${title}</h4>
                <span class="badge bg-primary">${actualCalories} kcal</span>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Aliment</th>
                                <th>Quantité</th>
                                <th>Calories</th>
                                <th>Protéines</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    // Ajouter chaque aliment à la table
    foodItems.forEach((item, index) => {
        const calories = Math.round((item.aliment.valeurs.kcal * item.quantite) / 100);
        const proteins = Math.round((item.aliment.valeurs.prot * item.quantite) / 100 * 10) / 10;
        
        html += `
            <tr>
                <td>${item.aliment.nom}</td>
                <td>${item.quantite} g</td>
                <td>${calories} kcal</td>
                <td>${proteins} g</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary replace-btn" 
                            data-meal="${mealClass}" 
                            data-index="${index}">
                        <i class="bi bi-arrow-repeat"></i> Remplacer
                    </button>
                </td>
            </tr>
        `;
    });
    
    // Fermer la table et la carte
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Mettre à jour le contenu du conteneur
    container.innerHTML = html;
    
    // Ajouter les écouteurs d'événements pour les boutons de remplacement
    const replaceButtons = container.querySelectorAll('.replace-btn');
    replaceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const mealType = e.target.closest('.replace-btn').dataset.meal;
            const itemIndex = e.target.closest('.replace-btn').dataset.index;
            showReplacementOptions(mealType, itemIndex);
        });
    });
}

// Afficher les options de remplacement d'un aliment
function showReplacementOptions(mealType, itemIndex) {
    // Récupérer l'aliment actuel
    let currentItem;
    switch (mealType) {
        case 'petit-dejeuner':
            currentItem = generatedMeals.petitDejeuner[itemIndex];
            break;
        case 'dejeuner':
            currentItem = generatedMeals.dejeuner[itemIndex];
            break;
        case 'diner':
            currentItem = generatedMeals.diner[itemIndex];
            break;
        case 'collation':
            currentItem = generatedMeals.collation[itemIndex];
            break;
    }
    
    // Si on ne trouve pas l'élément, sortir
    if (!currentItem) return;
    
    // Récupérer la catégorie et les calories actuelles
    const categorie = currentItem.aliment.categorie;
    const currentCalories