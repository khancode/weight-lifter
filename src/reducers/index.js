import { combineReducers } from 'redux';
import WorkoutReducer from './WorkoutReducer';
import ExerciseReducer from './ExerciseReducer';
import WorkoutFormReducer from './WorkoutFormReducer';

export default combineReducers({
   workouts: WorkoutReducer,
   exercises: ExerciseReducer,
   workoutForm: WorkoutFormReducer
});
