// Base de données des aliments (remplacez ceci par le chargement du fichier JSON)
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
  },
  {
    "nom": "Yaourt nature",
    "categorie": "laitage",
    "valeurs": {
      "kcal": 61,
      "prot": 3.5,
      "gluc": 4.7,
      "lip": 3.3,
      "fibres": 0,
      "Ca": 110,
      "Fe": 0.1,
      "Mg": 11,
      "vitC": 0,
      "B12": 0.75,
      "D": 0.1
    }
  },
  {
    "nom": "Café noir",
    "categorie": "boisson",
    "valeurs": {
      "kcal": 2,
      "prot": 0.3,
      "gluc": 0,
      "lip": 0.1,
      "fibres": 0,
      "Ca": 5,
      "Fe": 0.1,
      "Mg": 7,
      "vitC": 0,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Thé vert",
    "categorie": "boisson",
    "valeurs": {
      "kcal": 1,
      "prot": 0,
      "gluc": 0.2,
      "lip": 0,
      "fibres": 0,
      "Ca": 3,
      "Fe": 0.3,
      "Mg": 1,
      "vitC": 0.1,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Riz blanc cuit",
    "categorie": "féculent",
    "valeurs": {
      "kcal": 130,
      "prot": 2.4,
      "gluc": 28,
      "lip": 0.3,
      "fibres": 0.4,
      "Ca": 10,
      "Fe": 1.2,
      "Mg": 12,
      "vitC": 0,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Pâtes cuites",
    "categorie": "féculent",
    "valeurs": {
      "kcal": 131,
      "prot": 5,
      "gluc": 25,
      "lip": 1.1,
      "fibres": 1.3,
      "Ca": 7,
      "Fe": 0.6,
      "Mg": 18,
      "vitC": 0,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Pain complet",
    "categorie": "féculent",
    "valeurs": {
      "kcal": 247,
      "prot": 8.3,
      "gluc": 41,
      "lip": 3.4,
      "fibres": 7,
      "Ca": 107,
      "Fe": 2.7,
      "Mg": 74,
      "vitC": 0,
      "B12": 0.2,
      "D": 0
    }
  },
  {
    "nom": "Brocoli",
    "categorie": "légume",
    "valeurs": {
      "kcal": 34,
      "prot": 2.8,
      "gluc": 7,
      "lip": 0.4,
      "fibres": 2.6,
      "Ca": 47,
      "Fe": 0.7,
      "Mg": 21,
      "vitC": 89.2,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Épinards",
    "categorie": "légume",
    "valeurs": {
      "kcal": 23,
      "prot": 2.9,
      "gluc": 3.6,
      "lip": 0.4,
      "fibres": 2.2,
      "Ca": 99,
      "Fe": 2.7,
      "Mg": 79,
      "vitC": 28.1,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Carotte",
    "categorie": "légume",
    "valeurs": {
      "kcal": 41,
      "prot": 0.9,
      "gluc": 10,
      "lip": 0.2,
      "fibres": 2.8,
      "Ca": 33,
      "Fe": 0.3,
      "Mg": 12,
      "vitC": 5.9,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Poulet grillé",
    "categorie": "protéine",
    "valeurs": {
      "kcal": 165,
      "prot": 31,
      "gluc": 0,
      "lip": 3.6,
      "fibres": 0,
      "Ca": 15,
      "Fe": 1,
      "Mg": 34,
      "vitC": 0,
      "B12": 0.3,
      "D": 0
    }
  },
  {
    "nom": "Saumon grillé",
    "categorie": "protéine",
    "valeurs": {
      "kcal": 208,
      "prot": 20,
      "gluc": 0,
      "lip": 13,
      "fibres": 0,
      "Ca": 9,
      "Fe": 0.5,
      "Mg": 29,
      "vitC": 0,
      "B12": 3.2,
      "D": 11
    }
  },
  {
    "nom": "Œuf entier",
    "categorie": "protéine",
    "valeurs": {
      "kcal": 155,
      "prot": 13,
      "gluc": 1.1,
      "lip": 11,
      "fibres": 0,
      "Ca": 50,
      "Fe": 1.2,
      "Mg": 10,
      "vitC": 0,
      "B12": 1.1,
      "D": 2
    }
  },
  {
    "nom": "Avocat",
    "categorie": "légume",
    "valeurs": {
      "kcal": 160,
      "prot": 2,
      "gluc": 9,
      "lip": 15,
      "fibres": 7,
      "Ca": 12,
      "Fe": 0.6,
      "Mg": 29,
      "vitC": 10,
      "B12": 0,
      "D": 0
    }
  },
  {
    "nom": "Chocolat noir 70%",
    "categorie": "collation",
    "valeurs": {
      "kcal": 546,
      "prot": 4.9,
      "gluc": 46,
      "lip": 31,
      "fibres": 11,
      "Ca": 73,
      "Fe": 11.9,
      "Mg": 146,
      "vitC": 0,
      "B12": 0,
      "D": 0
    }
  }
];

// Variables globales pour stocker les données générées
let generatedMeals = {};
let totalNutrition = {};
let currentMealToReplace = null;
let currentIndexToReplace = null;
let replaceModal = null;

// Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Essayer de charger le fichier JSON (si disponible)
    try {
        fetch('base_aliments_tophe.json')
            .then(response => response.json())
            .then(data => {
                alimentsDatabase = data;
                console.log('Base de données d\'aliments chargée:', alimentsDatabase.length, 'aliments trouvés');
            })
            .catch(error => {
                console.warn('Utilisation de la base de données intégrée:', error);
            });
    } catch (error) {
        console.warn('Utilisation de la base de données intégrée');
    }
    
    // Validation du formulaire
    document.getElementById('userForm').addEventListener('submit', handleFormSubmit);
    
    // Validation de la répartition des calories
    const repartitionInputs = document.querySelectorAll('.repartition-input');
    repartitionInputs.forEach(input => {
        input.addEventListener('input', validateRepartition);
    });
    
    // Initialiser le modal Bootstrap pour le remplacement d'ingrédient
    replaceModal = new bootstrap.Modal(document.getElementById('replaceModal'));
});

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
    const fruit = selectRandomFoo