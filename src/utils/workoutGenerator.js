import exerciseDatabase from '../data/exercises';
import { bodyAreaOptions } from '../data/options';

export const generateWorkout = (preferences) => {
  // If no equipment selected, default to 'none' (mat only)
  const equipmentFilter = preferences.equipment.length > 0 
    ? preferences.equipment 
    : ['none'];
  
  // If no areas selected, include all areas
  const areasFilter = preferences.targetAreas.length > 0 
    ? preferences.targetAreas
    : bodyAreaOptions.map(area => area.id);
  
  // Filter exercises based on equipment, target areas, and difficulty
  let filteredExercises = exerciseDatabase.filter(exercise => {
    // Check if any of the user's equipment matches any of the exercise's required equipment
    const hasRequiredEquipment = exercise.equipment.some(eq => 
      equipmentFilter.includes(eq)
    );
    
    // Check if any of the exercise's target areas match user's selected areas
    const targetMatchesPreference = exercise.targetAreas.some(area => 
      areasFilter.includes(area)
    );
    
    // Check if exercise difficulty matches user's preference
    const difficultyMatches = preferences.difficultyLevel === 'all' || 
      exercise.difficulty === preferences.difficultyLevel;
    
    return hasRequiredEquipment && targetMatchesPreference && difficultyMatches;
  });
  
  // Handle health considerations
  if (preferences.healthConsiderations.length > 0) {
    // Don't completely filter out exercises, but tag them for later modification
    filteredExercises = filteredExercises.map(exercise => {
      const needsModification = preferences.healthConsiderations.some(
        consideration => exercise.modifications[consideration]
      );
      
      return {
        ...exercise,
        needsModification,
        relevantModifications: preferences.healthConsiderations
          .filter(c => exercise.modifications[c] && exercise.modifications[c] !== 'No specific modification needed')
          .map(c => ({
            condition: c,
            instruction: exercise.modifications[c]
          }))
      };
    });
  }
  
  // If no exercises match criteria, provide a fallback
  if (filteredExercises.length === 0) {
    return {
      exercises: [],
      totalDuration: 0,
      message: "No exercises match your criteria. Try selecting different equipment, target areas, or difficulty level."
    };
  }
  
  // Balance the workout to include exercises for all selected target areas
  const ensureTargetAreaCoverage = (exercises, targetAreas) => {
    const result = [...exercises];
    
    // Check if each target area has at least one exercise
    targetAreas.forEach(area => {
      const hasExerciseForArea = exercises.some(ex => 
        ex.targetAreas.includes(area)
      );
      
      // If not, try to find and add an exercise for this area
      if (!hasExerciseForArea) {
        const exerciseForArea = exerciseDatabase.find(ex => 
          ex.targetAreas.includes(area) && 
          ex.equipment.some(eq => equipmentFilter.includes(eq))
        );
        
        if (exerciseForArea) {
          result.push(exerciseForArea);
        }
      }
    });
    
    return result;
  };
  
  // Ensure all target areas have at least one exercise
  if (preferences.targetAreas.length > 0) {
    filteredExercises = ensureTargetAreaCoverage(filteredExercises, preferences.targetAreas);
  }
  
  // Sort exercises to create a balanced workout
  filteredExercises.sort((a, b) => {
    // Sort by difficulty level (beginner -> advanced)
    const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
    const difficultyDiff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    
    if (difficultyDiff !== 0) return difficultyDiff;
    
    // If same difficulty, randomize a bit
    return 0.5 - Math.random();
  });
  
  // Calculate how many exercises we need to fill the requested duration
  // Add 5 minutes for warm-up and cool-down
  const warmupCooldownTime = 5;
  const targetDuration = preferences.duration - warmupCooldownTime;
  
  let selectedExercises = [];
  let currentDuration = 0;
  
  // Add exercises until we reach or exceed the target duration
  while (currentDuration < targetDuration && filteredExercises.length > 0) {
    // Select exercise that best fits remaining time
    const idealExerciseIndex = filteredExercises.findIndex(ex => 
      currentDuration + ex.duration <= targetDuration
    );
    
    const exerciseIndex = idealExerciseIndex !== -1 
      ? idealExerciseIndex 
      : 0;
    
    const selectedExercise = filteredExercises[exerciseIndex];
    
    // Add rest time to exercise duration
    const exerciseDuration = selectedExercise.duration + (preferences.restTime / 60);
    
    // Add exercise to workout
    selectedExercises.push({
      ...selectedExercise,
      totalTime: exerciseDuration
    });
    
    // Update current duration
    currentDuration += exerciseDuration;
    
    // Remove selected exercise from available pool
    filteredExercises.splice(exerciseIndex, 1);
    
    // If we've run out of exercises but still have time, reuse exercises
    if (filteredExercises.length === 0 && currentDuration < targetDuration) {
      filteredExercises = [...selectedExercises];
    }
  }
  
  // Create workout object
  return {
    exercises: selectedExercises,
    totalDuration: currentDuration + warmupCooldownTime,
    warmup: {
      name: "Warm-up",
      description: "Begin with gentle movements to warm up your body. Focus on deep breathing, shoulder rolls, gentle spinal rotations, and small range-of-motion movements.",
      duration: 3
    },
    cooldown: {
      name: "Cool-down",
      description: "Finish with gentle stretches focusing on the areas you worked. Hold each stretch for 20-30 seconds while taking deep breaths.",
      duration: 2
    },
    restTime: preferences.restTime,
    preferences: { ...preferences }
  };
};