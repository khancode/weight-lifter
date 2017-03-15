import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header } from 'native-base';
import uuid from 'uuid';
import ExerciseForm from './ExerciseForm';
import { createExercise } from '../actions';

class CreateExercise extends Component {

   constructor() {
      super();

      this.onSubmit = this.onSubmit.bind(this);
   }

   onSubmit({ name, radioGroup }) {
      this.props.createExercise({ uuid: uuid.v4(), name, radioGroup });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />
            <ExerciseForm onSubmit={this.onSubmit} />
         </Container>
      );
   }
}

export default connect(null, { createExercise })(CreateExercise);
