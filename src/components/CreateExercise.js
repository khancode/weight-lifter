import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header } from 'native-base';
import uuid from 'uuid';
import ExerciseForm from './ExerciseForm';
import { clearExerciseForm, createExercise } from '../actions';

class CreateExercise extends Component {

   constructor() {
      super();

      this.onSubmit = this.onSubmit.bind(this);
   }

   componentWillMount() {
      this.props.clearExerciseForm();
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

const mapStateToProps = (state) => {
   const { name, radioGroup } = state.exerciseForm;

   return { name, radioGroup };
};

export default connect(mapStateToProps, { clearExerciseForm, createExercise })(CreateExercise);
