import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Button, Footer, FooterTab, H3 } from 'native-base';
import WorkoutForm from './WorkoutForm';
import { clearWorkoutForm, createWorkout } from '../actions';

class CreateWorkout extends Component {

   constructor() {
      super();

      this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
   }

   componentWillMount() {
      this.props.clearWorkoutForm();
   }

   onSaveButtonPress() {
      const { workoutName, exercisesSelected, days } = this.props;

      this.props.createWorkout({ workoutName, exercisesSelected, days });

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

export default connect(mapStateToProps, { clearWorkoutForm, createWorkout })(CreateWorkout);
