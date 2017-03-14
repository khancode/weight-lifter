import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content,
   Button, Footer, FooterTab, H3 } from 'native-base';
import ExerciseForm from './ExerciseForm';
import { clearExerciseForm, createExercise } from '../actions';

class CreateExercise extends Component {

   constructor() {
      super();

      this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
   }

   componentWillMount() {
      this.props.clearExerciseForm();
   }

   onSaveButtonPress() {
      const { name, radioGroup } = this.props;

      this.props.createExercise({ name, radioGroup });

      Actions.pop();
   }

   render() {
      return (
         <Container>
            <Header />

            <Content style={styles.content}>
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
   content: {
      marginRight: 15
   },
   saveButtonText: {
      color: 'white'
   }
};

const mapStateToProps = (state) => {
   const { name, radioGroup } = state.exerciseForm;

   return { name, radioGroup };
};

export default connect(mapStateToProps, { clearExerciseForm, createExercise })(CreateExercise);
