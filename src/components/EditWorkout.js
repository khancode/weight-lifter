import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header } from 'native-base';
import WorkoutForm from './WorkoutForm';
import { deleteWorkout, updateWorkout } from '../actions';

class EditWorkout extends Component {
   constructor(props) {
      super(props);

      this.onDelete = this.onDelete.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   componentWillUnmount() {
      this.props.afterComponentUnmounts();
   }

   onDelete({ uuid, name, exercisesSelected, days }) {
      this.props.deleteWorkout({ uuid, name, exercisesSelected, days });

      Actions.pop();
   }

   onSubmit({ uuid, name, exercisesSelected, days }) {
      this.props.updateWorkout({ uuid, name, exercisesSelected, days });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />
            <WorkoutForm
               workout={this.props.workout}
               onDelete={this.onDelete}
               onSubmit={this.onSubmit}
            />
         </Container>
      );
   }
}

export default connect(null, { deleteWorkout, updateWorkout })(EditWorkout);
