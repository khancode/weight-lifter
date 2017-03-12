import { AsyncStorage } from 'react-native';
import { GET_EXERCISES, CREATE_EXERCISE, UPDATE_EXERCISE } from './types';

const STORAGE_KEY = 'EXERCISES';

export const getExercises = () => {
   return async (dispatch) => {
      const asData = await AsyncStorage.getItem(STORAGE_KEY);

      const exercises = asData ? JSON.parse(asData) : [];

      dispatch({ type: GET_EXERCISES, payload: exercises });
   };
}

export const createExercise = (data) => {
   return async (dispatch) => {
      const asData = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      const updatedExercises = [];

      if (asData) {
         for (const i in asData) {
            updatedExercises.push(asData[i]);
         }
      }

      updatedExercises.push(data);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExercises), res2 => {
         dispatch({ type: CREATE_EXERCISE, payload: updatedExercises });
      });
   };
};

export const updateExercise = (data) => {
   return async (dispatch) => {
      const asData = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      const updatedExercises = [];

      if (asData) {
         for (const i in asData) {
            if (asData[i].name === data.name) {
               updatedExercises.push(data);
            }
            else {
               updatedExercises.push(asData[i]);
            }
         }
      }

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExercises), res2 => {
         dispatch({ type: UPDATE_EXERCISE, payload: updatedExercises });
      });
   };
};
