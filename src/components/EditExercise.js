import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, FooterTab, Button, H3 } from 'native-base';
import ExerciseForm from './ExerciseForm';
import { updateExerciseForm, updateExercise } from '../actions';

class EditExercise extends Component {
   constructor(props) {
      super(props);

      this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
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

   onSaveButtonPress() {
      const { name, radioGroup } = this.props;

      this.props.updateExercise({ name, radioGroup });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />
            <Content>
               <ExerciseForm />
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
   const { name, radioGroup } = state.exerciseForm;

   return { name, radioGroup };
};

export default connect(mapStateToProps, { updateExerciseForm, updateExercise })(EditExercise);
