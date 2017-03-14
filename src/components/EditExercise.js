import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header } from 'native-base';
import ExerciseForm from './ExerciseForm';
import { updateExerciseForm, deleteExercise, updateExercise } from '../actions';

class EditExercise extends Component {
   constructor(props) {
      super(props);

      this.onDelete = this.onDelete.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   componentWillMount() {
      const { exercise } = this.props;
      for (const prop in exercise) {
         this.props.updateExerciseForm({ prop, value: exercise[prop] });
      }
   }

   componentWillUnmount() {
      this.props.afterComponentUnmounts();
   }

   onDelete() { //({ uuid, name, radioGroup }) {
      const { uuid, name, radioGroup } = this.props;

      this.props.deleteExercise({ uuid, name, radioGroup });

      Actions.pop();
   }

   onSubmit() { //({ uuid, name, radioGroup }) {
      const { uuid, name, radioGroup } = this.props;

      this.props.updateExercise({ uuid, name, radioGroup });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />
            <ExerciseForm onSubmit={this.onSubmit} onDelete={this.onDelete} />
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   const { uuid, name, radioGroup } = state.exerciseForm;

   return { uuid, name, radioGroup };
};

export default connect(mapStateToProps,
   { updateExerciseForm, deleteExercise, updateExercise })(EditExercise);
