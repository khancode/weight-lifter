import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, ListItem, Text, Right,
   Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getExercises } from '../actions';

class ManageExercises extends Component {
   constructor() {
      super();

      this.state = {
         showSpinner: false
      };

      this.onListItemPress = this.onListItemPress.bind(this);
      this.hideSpinner = this.hideSpinner.bind(this);
   }

   componentWillMount() {
      this.props.getExercises();
   }

   showExercises() {
      const { exercises } = this.props;

      return exercises.map((exercise) => {
         return (
            <ListItem key={exercise.name} button onPress={() => this.onListItemPress(exercise)}>
               <Text>{exercise.name}</Text>
               <Right>
                  <Icon name="arrow-forward" />
               </Right>
            </ListItem>
         );
      });
   }

   onListItemPress(exercise) {
      Actions.editExercise({ exercise, afterComponentUnmounts: this.hideSpinner });

      this.showSpinner();
   }

   hideSpinner() {
      this.setState({ showSpinner: false });
   }

   showSpinner() {
      this.setState({ showSpinner: true });
   }

   render() {
      return (
         <Container>
            <Header />

            <Content>
               {
                  this.state.showSpinner
                  ? <Spinner color="blue" />
                  : this.showExercises()
               }
            </Content>
         </Container>
      );
   }

}

const mapStateToProps = (state) => {
   const { exercises } = state;

   return { exercises };
};

export default connect(mapStateToProps, { getExercises })(ManageExercises);
