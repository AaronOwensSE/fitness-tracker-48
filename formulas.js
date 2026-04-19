// Internal Dependencies
import constants from "./constants";

// API
function targetWeight(targetBodyFatPercentage, leanMass, boneMass) {
    const nonfatMass = leanMass + boneMass;
    const nonfatMassFactor = 1 - targetBodyFatPercentage / 100;
    const targetWeight = nonfatMass / nonfatMassFactor;

    return targetWeight;
}

function tdee(rmr, activityLevel) {
    const tdee = rmr * activityLevel;

    return tdee;
}

function dailyCalories(plan, tdee) {
    let dailyCalorieModifier = 0;

    if (plan == "cut") {
        dailyCalorieModifier = 0 - constants.DAILY_CALORIE_SURPLUS_OR_DEFICIT;
    } else if (plan == "bulk") {
        dailyCalorieModifier = constants.DAILY_CALORIE_SURPLUS_OR_DEFICIT;
    }

    const dailyCalories = tdee + dailyCalorieModifier;
    
    return dailyCalories;
}

function proteinInGrams(leanMass) {
    const proteinInGrams = leanMass * constants.GRAMS_OF_PROTEIN_PER_POUND_OF_LEAN_MASS;

    return proteinInGrams;
}

function proteinPercentage(proteinInGrams, dailyCalories) {
    const proteinCalories = proteinInGrams * constants.CALORIES_PER_GRAM_OF_PROTEIN;
    const proteinPercentage = proteinCalories / dailyCalories * 100;

    return proteinPercentage;
}

function fatInGrams(targetWeight) {
    const fatInGrams = targetWeight * constants.GRAMS_OF_FAT_PER_POUND_OF_TARGET_WEIGHT;

    return fatInGrams;
}

function fatPercentage(fatInGrams, dailyCalories) {
    const fatCalories = fatInGrams * constants.CALORIES_PER_GRAM_OF_FAT;
    const fatPercentage = fatCalories / dailyCalories * 100;

    return fatPercentage;
}

function carbsPercentage(proteinPercentage, fatPercentage) {
    const carbsPercentage = 100 - proteinPercentage - fatPercentage;

    return carbsPercentage;
}

const formulas = {
    targetWeight,
    tdee,
    dailyCalories,
    proteinInGrams,
    proteinPercentage,
    fatInGrams,
    fatPercentage,
    carbsPercentage
};

export default formulas;
