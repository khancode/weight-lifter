import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Input, Label, Text, ListItem,
   CheckBox, View, Icon } from 'native-base';
import { updateWorkoutForm } from '../actions';

class WorkoutForm extends Component {

   constructor() {
      super();

      this.onSelectExercisesPress = this.onSelectExercisesPress.bind(this);
      this.onCheckBoxPress = this.onCheckBoxPress.bind(this);
   }

   onSelectExercisesPress() {
      Actions.selectExercises();
   }

   showExercises() {
      const { exercisesSelected } = this.props;

      const exercises = [];
      for (const exercise in exercisesSelected) {
         exercises.push(
            <ListItem key={exercise} button>
               <Text>{exercise}</Text>
            </ListItem>
         );
      }

      return exercises;
   }

   createDaysCheckBoxGroup() {
      const { days } = this.props;

      const daysArr = [];
      for (const day in days) {
         const isDaySelected = days[day];

         daysArr.push(
            <ListItem key={day} onPress={() => this.onCheckBoxPress(day)}>
               <Text>{day}</Text>
               <CheckBox
                  style={styles.checkBox}
                  checked={isDaySelected}
                  onPress={() => this.onCheckBoxPress(day)}
               />
            </ListItem>
         );
      }

      return daysArr;
   }

   onCheckBoxPress(day) {
      const newDays = Object.assign({}, this.props.days);

      newDays[day] = !newDays[day];

      this.props.updateWorkoutForm({ prop: 'days', value: newDays });
   }

   render() {
      return (
         <View>
            <Form style={styles.container}>
               <Item stackedLabel>
                  <Label>Workout Name</Label>
                  <Input
                     value={this.props.workoutName}
                     onChangeText={value => this.props.updateWorkoutForm({ prop: 'workoutName', value })}
                   />
               </Item>
               <Item stackedLabel>
                  <Label>Exercises</Label>
                  <ListItem
                     button
                     onPress={this.onSelectExercisesPress}
                  >
                     <Text>Select Exercises</Text>
                     <Icon style={styles.arrowForwardIcon} name="arrow-forward" />
                  </ListItem>
                  {this.showExercises()}
               </Item>

               <Item stackedLabel>
                  <Label>Workout Days</Label>
                  {this.createDaysCheckBoxGroup()}
               </Item>
            </Form>
         </View>
      );
   }
}

const styles = {
   container: {
      marginRight: 15
   },
   arrowForwardIcon: {
      marginLeft: 7
   },
   checkBox: {
      marginLeft: 7
   },
   saveButtonText: {
      color: 'white'
   }
};

const mapStateToProps = (state) => {
   const { workoutName, exercisesSelected, days } = state.workoutForm;

   return { workoutName, exercisesSelected, days };
};

export default connect(mapStateToProps, { updateWorkoutForm })(WorkoutForm);
