import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, ListItem, Text, CheckBox, Right, Footer,
   FooterTab, H3, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getExercises, updateWorkoutForm } from '../actions';

class SelectExercises extends Component {
   constructor(props) {
      super(props);

      this.state = {
         exercisesSelected: Object.assign({}, props.exercisesSelected)
      };

      this.onListItemPress = this.onListItemPress.bind(this);
      this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
   }

   componentWillMount() {
      this.props.getExercises();
   }

   showExercises() {
      const { exercises, exercisesSelected } = this.props;

      return exercises.map((exercise) => {
         return (
            <ListItem key={exercise.name} button onPress={() => this.onListItemPress(exercise)}>
               <Text>{exercise.name}</Text>
               <Right>
                  <CheckBox
                     style={styles.checkBox}
                     checked={this.state.exercisesSelected[exercise.name] !== undefined}
                     onPress={() => this.onListItemPress(exercise)}
                  />
               </Right>
            </ListItem>
         );
      });
   }

   onListItemPress(exercise) {
      const newState = Object.assign({}, this.state);

      if (newState.exercisesSelected[exercise.name]) {
         delete newState.exercisesSelected[exercise.name];
      }
      else {
         newState.exercisesSelected[exercise.name] = exercise;
      }

      this.setState(newState);
   }

   onSaveButtonPress() {
      this.props.updateWorkoutForm(
         { prop: 'exercisesSelected', value: this.state.exercisesSelected }
      );
      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />

            <Content>
               {this.showExercises()}
            </Content>

            <Footer>
               <FooterTab>
                  <Button onPress={this.onSaveButtonPress} full primary>
                     <H3 style={{ color: 'white' }}>Save</H3>
                  </Button>
               </FooterTab>
            </Footer>
         </Container>
      );
   }

}

const styles = {
   checkBox: {
      marginLeft: 7
   }
};

const mapStateToProps = (state) => {
   const { exercises } = state;
   const { exercisesSelected } = state.workoutForm;

   return { exercises, exercisesSelected };
};

export default connect(mapStateToProps, { getExercises, updateWorkoutForm })(SelectExercises);
