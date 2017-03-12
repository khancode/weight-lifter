import {
   UPDATE_WORKOUT_FORM,
   CLEAR_WORKOUT_FORM,
   CREATE_WORKOUT,
   UPDATE_WORKOUT
} from '../actions/types';

const INITIAL_STATE = {
   workoutName: null,
   exercisesSelected: {},
   days: {
      'Monday': false,
      'Tuesday': false,
      'Wednesday': false,
      'Thursday': false,
      'Friday': false,
      'Saturday': false,
      'Sunday': false
   }
};

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case UPDATE_WORKOUT_FORM:
         return { ...state, [action.payload.prop]: action.payload.value };
      case CREATE_WORKOUT:
      case UPDATE_WORKOUT:
      case CLEAR_WORKOUT_FORM:
         return INITIAL_STATE;
      default:
         return state;
   }
};
