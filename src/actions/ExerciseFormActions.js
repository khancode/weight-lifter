import { UPDATE_EXERCISE_FORM, CLEAR_EXERCISE_FORM } from './types';

export const updateExerciseForm = ({ prop, value }) => {
   return {
      type: UPDATE_EXERCISE_FORM,
      payload: { prop, value }
   };
};

export const clearExerciseForm = () => {
   return {
      type: CLEAR_EXERCISE_FORM,
      payload: null
   };
};
