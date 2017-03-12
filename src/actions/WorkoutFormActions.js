import { UPDATE_WORKOUT_FORM, CLEAR_WORKOUT_FORM } from './types';

export const updateWorkoutForm = ({ prop, value }) => {
   return {
      type: UPDATE_WORKOUT_FORM,
      payload: { prop, value }
   };
};

export const clearWorkoutForm = () => {
   return {
      type: CLEAR_WORKOUT_FORM,
      payload: null
   };
};
