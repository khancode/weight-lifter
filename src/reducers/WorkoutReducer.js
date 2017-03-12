import { GET_WORKOUTS, CREATE_WORKOUT, UPDATE_WORKOUT } from '../actions/types';

const INITIAL_STATE = [];

export default (state=INITIAL_STATE, action) => {
   switch (action.type) {
      case GET_WORKOUTS:
      case CREATE_WORKOUT:
      case UPDATE_WORKOUT:
         return action.payload;
      default:
         return state;
   }
};
