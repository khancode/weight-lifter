import { combineReducers } from 'redux';
import WorkoutReducer from './WorkoutReducer';
import ExerciseReducer from './ExerciseReducer';

export default combineReducers({
   workouts: WorkoutReducer,
   exercises: ExerciseReducer
});
