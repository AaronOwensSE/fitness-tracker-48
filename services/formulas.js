// =================================================================================================
// Internal Dependencies
// =================================================================================================
import constants from "../constants";

// =================================================================================================
// API
// =================================================================================================
function targetWeight(targetBodyFatPercentage, targetLeanMass, boneMass) {
    const nonfatMass = targetLeanMass + boneMass;
    const nonfatMassFactor = 1 - targetBodyFatPercentage / 100;
    const targetWeight = nonfatMass / nonfatMassFactor;
    const roundedTargetWeight = Math.round(targetWeight);

    return roundedTargetWeight;
}

function totalDailyEnergyExpenditure(restingMetabolicRate, activityLevel) {
    const totalDailyEnergyExpenditure = restingMetabolicRate * activityLevel;
    const roundedTotalDailyEnergyExpenditure = Math.round(totalDailyEnergyExpenditure);

    return roundedTotalDailyEnergyExpenditure;
}

function dailyCaloriesForCut(bodyWeight, totalDailyEnergyExpenditure) {
    const dailyCaloriesModifier =
        bodyWeight
        * constants.DAILY_BODY_WEIGHT_CUT_PERCENTAGE
        * constants.CALORIES_PER_POUND_OF_FAT;
    
    const dailyCaloriesForCut = totalDailyEnergyExpenditure - dailyCaloriesModifier;
    const roundedDailyCaloriesForCut = Math.round(dailyCaloriesForCut);

    return roundedDailyCaloriesForCut;
}

function dailyCaloriesForBulk(bodyWeight, totalDailyEnergyExpenditure) {
    const dailyCaloriesModifier =
        bodyWeight
        * constants.DAILY_BODY_WEIGHT_BULK_PERCENTAGE
        * constants.CALORIES_PER_POUND_OF_FAT;
    
    const dailyCaloriesForBulk = totalDailyEnergyExpenditure + dailyCaloriesModifier;
    const roundedDailyCaloriesForBulk = Math.round(dailyCaloriesForBulk);

    return roundedDailyCaloriesForBulk;
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
    totalDailyEnergyExpenditure,
    dailyCaloriesForCut,
    dailyCaloriesForBulk,
    proteinInGrams,
    proteinPercentage,
    fatInGrams,
    fatPercentage,
    carbsPercentage
};

export default formulas;
