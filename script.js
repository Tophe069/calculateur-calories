// Chargement de la base de données des aliments depuis un JSON

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

// Variables globales pour stocker les données des repas
let suggestionsPetitDej = [];
let suggestionsDejeuner = [];
let suggestionsDiner = [];
let suggestionsCollation = [];
let besoinsCaloriques = 0;

// Variables globales pour le remplacement d'aliments
let typeRepasActuel = '';
let indexAlimentActuel = -1;

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
    // Si une seule catégorie est spécifiée comme chaîne
    if (typeof categorie === 'string') {
        return alimentsDatabase.filter(aliment => aliment.categorie === categorie);
    }
    // Si un tableau de catégories est fourni
    else if (Array.isArray(categorie)) {
        return alimentsDatabase.filter(aliment => categorie.includes(aliment.categorie));
    }
    // Si rien ne correspond, retourner tous les aliments
    return alimentsDatabase;
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
    
    // Pour chaque catégorie, ajouter un aliment aux suggestions
    for (const categorie of categories) {
        // Récupérer les aliments de cette catégorie
        const alimentsCategorie = filtrerAlimentsParCategorie(categorie);
        
        // Si pas d'aliments dans cette catégorie, essayer une catégorie plus générale
        if (alimentsCategorie.length === 0) {
            console.log(`Aucun aliment trouvé dans la catégorie ${categorie}, utilisation d'une catégorie alternative`);
            continue;
        }
        
        // Choisir un aliment aléatoire de cette catégorie
        const aliment = alimentsCategorie[Math.floor(Math.random() * alimentsCategorie.length)];
        ajouterAlimentAuxSuggestions(aliment);
    }
    
    // Fonction locale pour ajouter un aliment aux suggestions
    function ajouterAlimentAuxSuggestions(aliment) {
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
    }
    
    // Si aucune suggestion n'a été trouvée, ajouter au moins un aliment
    if (suggestions.length === 0) {
        const aleatoire = alimentsDatabase[Math.floor(Math.random() * alimentsDatabase.length)];
        ajouterAlimentAuxSuggestions(aleatoire);
    }
    
    return suggestions;
}

// Fonction principale pour générer les repas
function genererRepas() {
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
    besoinsCaloriques = calculerBesoinsCaloriques(sexe, age, poids, taille, niveauActivite
