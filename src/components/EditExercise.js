import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header } from 'native-base';
import ExerciseForm from './ExerciseForm';
import { deleteExercise, updateExercise } from '../actions';

class EditExercise extends Component {
   constructor(props) {
      super(props);

      this.onDelete = this.onDelete.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   componentWillUnmount() {
      this.props.afterComponentUnmounts();
   }

   onDelete({ uuid, name, radioGroup }) {
      this.props.deleteExercise({ uuid, name, radioGroup });

      Actions.pop();
   }

   onSubmit({ uuid, name, radioGroup }) {
      this.props.updateExercise({ uuid, name, radioGroup });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />
            <ExerciseForm
               exercise={this.props.exercise}
               onSubmit={this.onSubmit}
               onDelete={this.onDelete}
            />
         </Container>
      );
   }
}

export default connect(null, { deleteExercise, updateExercise })(EditExercise);
