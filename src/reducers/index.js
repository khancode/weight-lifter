import { combineReducers } from 'redux';
import WorkoutReducer from './WorkoutReducer';
import ExerciseReducer from './ExerciseReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import ExerciseFormReducer from './ExerciseFormReducer';

export default combineReducers({
   workouts: WorkoutReducer,
   exercises: ExerciseReducer,
   workoutForm: WorkoutFormReducer,
   exerciseForm: ExerciseFormReducer
});
