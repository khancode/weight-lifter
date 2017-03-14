import { GET_EXERCISES, CREATE_EXERCISE, UPDATE_EXERCISE,
   DELETE_EXERCISE } from '../actions/types';

const INITIAL_STATE = [];

export default (state=INITIAL_STATE, action) => {
   switch (action.type) {
      case GET_EXERCISES:
      case CREATE_EXERCISE:
      case UPDATE_EXERCISE:
      case DELETE_EXERCISE:
         return action.payload;
      default:
         return state;
   }
};
