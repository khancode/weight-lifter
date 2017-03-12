import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, FooterTab, Button, H3 } from 'native-base';
import WorkoutForm from './WorkoutForm';
import { updateWorkoutForm, updateWorkout } from '../actions';

class EditWorkout extends Component {
   constructor(props) {
      super(props);

      this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
   }

   componentWillMount() {
      const { workout } = this.props;
      for (const prop in workout) {
         this.props.updateWorkoutForm({ prop, value: workout[prop] });
      }
   }

   componentWillUnmount() {
      this.props.afterComponentUnmounts();
   }

   onSaveButtonPress() {
      const { workoutName, exercisesSelected, days } = this.props;

      this.props.updateWorkout({ workoutName, exercisesSelected, days });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />
            <Content>
               <WorkoutForm />
            </Content>
            <Footer>
               <FooterTab>
                  <Button onPress={this.onSaveButtonPress} full primary>
                     <H3 style={styles.saveButtonText}>Save</H3>
                  </Button>
               </FooterTab>
            </Footer>
         </Container>
      );
   }
}

const styles = {
   saveButtonText: {
      color: 'white'
   }
};

const mapStateToProps = (state) => {
   const { workoutName, exercisesSelected, days } = state.workoutForm;

   return { workoutName, exercisesSelected, days };
};

export default connect(mapStateToProps, { updateWorkoutForm, updateWorkout })(EditWorkout);
