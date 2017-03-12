import {
   UPDATE_EXERCISE_FORM,
   CLEAR_EXERCISE_FORM,
   CREATE_EXERCISE,
   UPDATE_EXERCISE
} from '../actions/types';

const INITIAL_STATE = {
   name: null,
   radioGroup: {
      'Free Weight': true,
      'Barbell': false,
      'Dumbbell': false
   }
};

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case UPDATE_EXERCISE_FORM:
         return { ...state, [action.payload.prop]: action.payload.value };
      case CREATE_EXERCISE:
      case UPDATE_EXERCISE:
      case CLEAR_EXERCISE_FORM:
         return INITIAL_STATE;
      default:
         return state;
   }
};
