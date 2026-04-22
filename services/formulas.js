// =================================================================================================
// Internal Dependencies
// =================================================================================================
import constants from "../constants";

// =================================================================================================
// API
// =================================================================================================
function targetWeight(targetBodyFatPercentage, leanMass, boneMass) {
    const nonfatMass = leanMass + boneMass;
    const nonfatMassFactor = 1 - targetBodyFatPercentage / 100;
    const targetWeight = nonfatMass / nonfatMassFactor;
    const roundedTargetWeight = Math.round(targetWeight);

    return roundedTargetWeight;
}

function tdee(rmr, activityLevel) {
    const tdee = rmr * activityLevel;
    const roundedTdee = Math.round(tdee);

    return roundedTdee;
}

function dailyCalories(plan, tdee) {
    let dailyCalorieModifier = 0;

    if (plan === "cut") {
        dailyCalorieModifier = 0 - constants.DAILY_CALORIE_SURPLUS_OR_DEFICIT;
    } else if (plan === "bulk") {
        dailyCalorieModifier = constants.DAILY_CALORIE_SURPLUS_OR_DEFICIT;
    }

    const dailyCalories = tdee + dailyCalorieModifier;
    const roundedDailyCalories = Math.round(dailyCalories);
    
    return roundedDailyCalories;
}

function proteinInGrams(leanMass) {
    const proteinInGrams = leanMass * constants.GRAMS_OF_PROTEIN_PER_POUND_OF_LEAN_MASS;
    const roundedProteinInGrams = Math.round(proteinInGrams);

    return roundedProteinInGrams;
}

function proteinPercentage(proteinInGrams, dailyCalories) {
    const proteinCalories = proteinInGrams * constants.CALORIES_PER_GRAM_OF_PROTEIN;
    const proteinPercentage = proteinCalories / dailyCalories * 100;
    const roundedProteinPercentage = Math.round(proteinPercentage);

    return roundedProteinPercentage;
}

function fatInGrams(targetWeight) {
    const fatInGrams = targetWeight * constants.GRAMS_OF_FAT_PER_POUND_OF_TARGET_WEIGHT;
    const roundedFatInGrams = Math.round(fatInGrams);

    return roundedFatInGrams;
}

function fatPercentage(fatInGrams, dailyCalories) {
    const fatCalories = fatInGrams * constants.CALORIES_PER_GRAM_OF_FAT;
    const fatPercentage = fatCalories / dailyCalories * 100;
    const roundedFatPercentage = Math.round(fatPercentage);

    return roundedFatPercentage;
}

function carbsPercentage(proteinPercentage, fatPercentage) {
    const carbsPercentage = 100 - proteinPercentage - fatPercentage;
    const roundedCarbsPercentage = Math.round(carbsPercentage);

    return roundedCarbsPercentage;
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
