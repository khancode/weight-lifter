import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Input, Label, Text, ListItem,
   CheckBox, Container, Content, Footer, FooterTab,
   Button, H3, Icon } from 'native-base';

class WorkoutForm extends Component {

   constructor(props) {
      super(props);

      let uuid = null;
      let name = null;
      let exercisesSelected = null;
      let days = null;
      if (this.props.workout) {
         uuid = this.props.workout.uuid;
         name = this.props.workout.name;
         exercisesSelected = this.props.workout.exercisesSelected;
         days = this.props.workout.days;
      }

      this.state = {
         validation: {
            name: {
               isError: false,
               description: null
            },
            exercisesSelected: {
               isError: false,
               description: null
            },
            days: {
               isError: false,
               description: null
            }
         },
         uuid,
         name,
         exercisesSelected: exercisesSelected || {},
         days: days || {
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false
         }
      };

      this.handleOnChangeText = this.handleOnChangeText.bind(this);
      this.onSelectExercisesPress = this.onSelectExercisesPress.bind(this);
      this.setExercisesSelected = this.setExercisesSelected.bind(this);
      this.onCheckBoxPress = this.onCheckBoxPress.bind(this);
      this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
      this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
   }

   handleOnChangeText(value) {
      if (this.state.validation.name.isError) {
         const newState = Object.assign({}, this.state);
         newState.validation.name = {
            isError: false,
            description: null
         };
         this.setState(newState);
      }

      const newState = Object.assign({}, this.state);
      newState.name = value;
      this.setState(newState);
   }

   onSelectExercisesPress() {
      Actions.selectExercises(
         {
            setExercisesSelected: this.setExercisesSelected,
            exercisesSelected: this.state.exercisesSelected
         }
      );
   }

   setExercisesSelected(exercisesSelected) {
      if (this.state.validation.exercisesSelected.isError) {
         const newState = Object.assign({}, this.state);
         newState.validation.exercisesSelected = {
            isError: false,
            description: null
         };
         this.setState(newState);
      }

      this.setState({ exercisesSelected });
   }

   showExercises() {
      const { exercisesSelected } = this.state;

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
      const { days } = this.state;

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
      if (this.state.validation.days.isError) {
         const newState = Object.assign({}, this.state);
         newState.validation.days = {
            isError: false,
            description: null
         };
         this.setState(newState);
      }

      const newDays = Object.assign({}, this.state.days);

      newDays[day] = !newDays[day];

      const newState = Object.assign({}, this.state);
      newState.days = newDays;
      this.setState(newState);
   }

   onDeleteButtonPress() {
      const { uuid, name, exercisesSelected, days } = this.state;

      this.props.onDelete({ uuid, name, exercisesSelected, days });
   }

   onSaveButtonPress() {
      // Perform validation
      const { workouts } = this.props;
      const { uuid, name, exercisesSelected, days } = this.state;

      if (!name || name.length === 0) {
         const newState = Object.assign({}, this.state);
         newState.validation.name = {
            isError: true,
            description: 'Name cannot be empty'
         };
         this.setState(newState);
         return;
      }

      for (const i in workouts) {
         const workout = workouts[i];

         if ((!uuid || uuid !== workout.uuid) && (name === workout.name)) {
            const newState = Object.assign({}, this.state);
            newState.validation.name = {
               isError: true,
               description: 'Name already taken'
            };
            this.setState(newState);
            return;
         }
      }

      if (Object.keys(exercisesSelected).length === 0) {
         const newState = Object.assign({}, this.state);
         newState.validation.exercisesSelected = {
            isError: true,
            description: 'You must select at least one exercise'
         };
         this.setState(newState);
         return;
      }

      let noDaysSelected = true;
      for (const i in days) {
         const isDaySelected = days[i];
         if (isDaySelected) {
            noDaysSelected = false;
            break;
         }
      }
      if (noDaysSelected) {
         const newState = Object.assign({}, this.state);
         newState.validation.days = {
            isError: true,
            description: 'You must select at least one day'
         };
         this.setState(newState);
         return;
      }

      // Call function that was passed as prop from parent
      this.props.onSubmit({ uuid, name, exercisesSelected, days });
   }

   render() {
      const { validation } = this.state;

      return (
         <Container>
            <Content>
               <Form style={styles.container}>
                  <Item stackedLabel>
                     <Label>Workout Name</Label>
                     <Input
                        value={this.state.name}
                        onChangeText={value => this.handleOnChangeText(value)}
                     />
                  </Item>
                  {
                     validation.name.isError &&
                     <Text style={{ color: 'red', marginLeft: 14 }}>
                        {validation.name.description}
                     </Text>
                  }
                  <Item stackedLabel>
                     <Label>Exercises</Label>
                     <ListItem
                        button
                        onPress={this.onSelectExercisesPress}
                     >
                        <Text>Select Exercises</Text>
                        <Icon style={styles.arrowForwardIcon} name="arrow-forward" />
                     </ListItem>
                     {
                        validation.exercisesSelected.isError &&
                        <Text style={{ color: 'red' }}>
                           {validation.exercisesSelected.description}
                        </Text>
                     }
                     {this.showExercises()}
                  </Item>

                  <Item stackedLabel>
                     <Label>Workout Days</Label>
                     {
                        validation.days.isError &&
                        <Text style={{ color: 'red' }}>
                           {validation.days.description}
                        </Text>
                     }
                     {this.createDaysCheckBoxGroup()}
                  </Item>
               </Form>
            </Content>

            <Footer>
               <FooterTab>
                  {
                     this.props.onDelete &&
                     <Button onPress={this.onDeleteButtonPress} full danger>
                        <H3>Delete</H3>
                     </Button>
                  }
                  <Button
                     style={styles.saveButton}
                     onPress={this.onSaveButtonPress}
                     full
                     primary
                  >
                     <H3 style={styles.saveButtonText}>Save</H3>
                  </Button>
               </FooterTab>
            </Footer>
         </Container>
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
   saveButton: {
      backgroundColor: 'dodgerblue'
   },
   saveButtonText: {
      color: 'white'
   }
};

const mapStateToProps = (state) => {
   const { workouts } = state;

   return { workouts };
};

export default connect(mapStateToProps)(WorkoutForm);
