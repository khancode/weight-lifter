import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import MainMenu from './components/MainMenu';
import StartWorkout from './components/StartWorkout';
import ManageWorkouts from './components/ManageWorkouts';
import CreateWorkout from './components/CreateWorkout';
import EditWorkout from './components/EditWorkout';
import ManageExercises from './components/ManageExercises';
import CreateExercise from './components/CreateExercise';
import EditExercise from './components/EditExercise';
import SelectExercises from './components/SelectExercises';

const RouterComponent = () => {
   return (
      <Router>
         <Scene key="mainMenu" component={MainMenu} title="Weight Lifter" />
         <Scene key="startWorkout" component={StartWorkout} title="Start Workout" />
         <Scene
            key="manageWorkouts"
            component={ManageWorkouts}
            title="Manage Workouts"
            rightTitle="Add"
            onRight={() => Actions.createWorkout()}
         />
         <Scene key="createWorkout" component={CreateWorkout} title="Create Workout" />
         <Scene key="editWorkout" component={EditWorkout} title="Edit Workout" />
         <Scene
            key="manageExercises"
            component={ManageExercises}
            title="Manage Exercises"
            rightTitle="Add"
            onRight={() => Actions.createExercise()}
         />
         <Scene key="createExercise" component={CreateExercise} title="Create Exercise" />
         <Scene key="editExercise" component={EditExercise} title="Edit Exercise" />
         <Scene key="selectExercises" component={SelectExercises} title="Select Exercises" />
      </Router>
   );
};

export default RouterComponent;
