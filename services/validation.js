// =================================================================================================
// Internal Dependencies
// =================================================================================================
import constants from "../constants.js";

// =================================================================================================
// API
// =================================================================================================
function inputsAreValid({
    bodyWeight,
    restingMetabolicRate,
    leanMass,
    boneMass,
    targetLeanMass,
    targetBodyFatPercentage,
    activityLevel
}) {
    return isValidBodyWeight(bodyWeight)
        && isValidRestingMetabolicRate(restingMetabolicRate)
        && isValidLeanMass(leanMass)
        && isValidBoneMass(boneMass)
        && isValidTargetLeanMass(targetLeanMass)
        && isValidTargetBodyFatPercentage(targetBodyFatPercentage)
        && isValidActivityLevel(activityLevel);
}

function isValidBodyWeight(bodyWeight) {
    return typeof bodyWeight === "number"
        && bodyWeight >= constants.MIN_BODY_WEIGHT
        && bodyWeight <= constants.MAX_BODY_WEIGHT;
}

function isValidRestingMetabolicRate(restingMetabolicRate) {
    return typeof restingMetabolicRate === "number"
        && restingMetabolicRate >= constants.MIN_RESTING_METABOLIC_RATE
        && restingMetabolicRate <= constants.MAX_RESTING_METABOLIC_RATE;
}

function isValidLeanMass(leanMass) {
    return typeof leanMass === "number"
        && leanMass >= constants.MIN_LEAN_MASS
        && leanMass <= constants.MAX_LEAN_MASS;
}

function isValidBoneMass(boneMass) {
    return typeof boneMass === "number"
        && boneMass >= constants.MIN_BONE_MASS
        && boneMass <= constants.MAX_BONE_MASS;
}

function isValidTargetLeanMass(targetLeanMass) {
    return typeof targetLeanMass === "number"
        && targetLeanMass >= constants.MIN_TARGET_LEAN_MASS
        && targetLeanMass <= constants.MAX_TARGET_LEAN_MASS;
}

function isValidTargetBodyFatPercentage(targetBodyFatPercentage) {
    return typeof targetBodyFatPercentage === "number"
        && targetBodyFatPercentage >= constants.MIN_TARGET_BODY_FAT_PERCENTAGE
        && targetBodyFatPercentage <= constants.MAX_TARGET_BODY_FAT_PERCENTAGE;
}

function isValidActivityLevel(activityLevel) {
    return typeof activityLevel === "number"
        && activityLevel >= constants.MIN_ACTIVITY_LEVEL
        && activityLevel <= constants.MAX_ACTIVITY_LEVEL;
}

function isValidPersonalRecord({ name, weight }) {
    return isValidPersonalRecordName(name)
        && isValidPersonalRecordWeight(weight);
}

function isValidPersonalRecordName(name) {
    return typeof name === "string"
        && name.length >= constants.MIN_PERSONAL_RECORD_NAME_LENGTH
        && name.length <= constants.MAX_PERSONAL_RECORD_NAME_LENGTH;
}

function isValidPersonalRecordWeight(weight) {
    return typeof weight === "number"
        && weight >= constants.MIN_PERSONAL_RECORD_WEIGHT
        && weight <= constants.MAX_PERSONAL_RECORD_WEIGHT;
}

function isValidWorkoutName(name) {
    return typeof name === "string"
        && name.length >= constants.MIN_WORKOUT_NAME_LENGTH
        && name.length <= constants.MAX_WORKOUT_NAME_LENGTH;
}

function isValidExercise({ name, weight, sets, reps }) {
    return isValidExerciseName(name)
        && isValidExerciseWeight(weight)
        && areValidExerciseSets(sets)
        && areValidExerciseReps(reps);
}

function isValidExerciseName(name) {
    return typeof name === "string"
        && name.length >= constants.MIN_EXERCISE_NAME_LENGTH
        && name.length <= constants.MAX_EXERCISE_NAME_LENGTH;
}

function isValidExerciseWeight(weight) {
    return typeof weight === "number"
        && weight >= constants.MIN_EXERCISE_WEIGHT
        && weight <= constants.MAX_EXERCISE_WEIGHT;
}

function areValidExerciseSets(sets) {
    return typeof sets === "number"
        && sets >= constants.MIN_EXERCISE_SETS
        && sets <= constants.MAX_EXERCISE_SETS;
}

function areValidExerciseReps(reps) {
    return typeof reps === "number"
        && reps >= constants.MIN_EXERCISE_REPS
        && reps <= constants.MAX_EXERCISE_REPS;
}

const validation = {
    inputsAreValid,
    isValidBodyWeight,
    isValidRestingMetabolicRate,
    isValidLeanMass,
    isValidBoneMass,
    isValidTargetLeanMass,
    isValidTargetBodyFatPercentage,
    isValidActivityLevel,

    isValidPersonalRecord,
    isValidPersonalRecordName,
    isValidPersonalRecordWeight,

    isValidWorkoutName,

    isValidExercise,
    isValidExerciseName,
    isValidExerciseWeight,
    areValidExerciseSets,
    areValidExerciseReps
};

export default validation;
