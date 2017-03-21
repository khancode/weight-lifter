import { AsyncStorage } from 'react-native';
import { GET_WORKOUTS, CREATE_WORKOUT, UPDATE_WORKOUT,
   DELETE_WORKOUT } from './types';

const STORAGE_KEY = 'WORKOUTS';

export const getWorkouts = () => {
   return async (dispatch) => {
      const asData = await AsyncStorage.getItem(STORAGE_KEY);

      const workouts = asData ? JSON.parse(asData) : [];

      dispatch({ type: GET_WORKOUTS, payload: workouts });
   };
}

export const createWorkout = (data) => {
   return async (dispatch) => {
      const asData = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      const updatedWorkouts = [];

      if (asData) {
         for (const i in asData) {
            updatedWorkouts.push(asData[i]);
         }
      }

      updatedWorkouts.push(data);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts), res2 => {
         dispatch({ type: CREATE_WORKOUT, payload: updatedWorkouts });
      });
   };
};

export const updateWorkout = (data) => {
   return async (dispatch) => {
      const asData = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      const updatedWorkouts = [];

      if (asData) {
         for (const i in asData) {
            if (asData[i].uuid === data.uuid) {
               updatedWorkouts.push(data);
            }
            else {
               updatedWorkouts.push(asData[i]);
            }
         }
      }

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts), res2 => {
         dispatch({ type: UPDATE_WORKOUT, payload: updatedWorkouts });
      });
   };
};

export const deleteWorkout = (data) => {
   return async (dispatch) => {
      const asData = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      const updatedWorkouts = [];

      if (asData) {
         for (const i in asData) {
            if (asData[i].uuid !== data.uuid) {
               updatedWorkouts.push(asData[i]);
            }
         }
      }

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts), res2 => {
         dispatch({ type: DELETE_WORKOUT, payload: updatedWorkouts });
      });
   };
};
