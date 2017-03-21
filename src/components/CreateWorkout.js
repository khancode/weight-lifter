import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header } from 'native-base';
import uuid from 'uuid';
import WorkoutForm from './WorkoutForm';
import { createWorkout } from '../actions';

class CreateWorkout extends Component {

   constructor() {
      super();

      this.onSubmit = this.onSubmit.bind(this);
   }

   onSubmit({ name, exercisesSelected, days }) {
      this.props.createWorkout({ uuid: uuid.v4(), name, exercisesSelected, days });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />
            <WorkoutForm onSubmit={this.onSubmit} />
         </Container>
      );
   }
}

export default connect(null, { createWorkout })(CreateWorkout);
