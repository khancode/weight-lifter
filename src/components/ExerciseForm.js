import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Text, ListItem, Radio,
   Container, Content, Footer, FooterTab, Button, H3 } from 'native-base';
import { updateExerciseForm } from '../actions';

class ExerciseForm extends Component {

   constructor() {
      super();

      this.state = {
         validation: {
            name: {
               isError: false,
               description: null
            }
         }
      };

      this.onNameChange = this.onNameChange.bind(this);
      this.handleOnPress = this.handleOnPress.bind(this);

      this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
      this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
   }

   createWeightTypeRadioGroup() {
      const weightTypeRadioGroupArr = [];
      for (let weightTypeName in this.props.radioGroup) {
         const isWeightTypeSelected = this.props.radioGroup[weightTypeName];

         weightTypeRadioGroupArr.push(
            <ListItem
               key={weightTypeName}
               selected={isWeightTypeSelected}
               onPress={() => this.handleOnPress(weightTypeName)}
            >
               <Text>{weightTypeName}</Text>
               <Radio
                  style={styles.radioButton}
                  selected={isWeightTypeSelected}
                  onPress={() => this.handleOnPress(weightTypeName)}
               />
            </ListItem>
         );
      }

      return weightTypeRadioGroupArr;
   }

   onNameChange(text) {
      if (this.state.validation.name.isError) {
         const newState = Object.assign({}, this.state);
         newState.validation.name = {
            isError: false,
            description: null
         };
         this.setState(newState);
      }

      this.props.updateExerciseForm({ prop: 'name', value: text });
   }

   handleOnPress(weightType) {
      const radioGroup = Object.assign({}, this.props.radioGroup);

      for (const weightTypeName in radioGroup) {
         radioGroup[weightTypeName] = false;
      }

      radioGroup[weightType] = true;

      this.props.updateExerciseForm({ prop: 'radioGroup', value: radioGroup });
   }

   onDeleteButtonPress() {
      const { uuid, name, radioGroup } = this.props;

      this.props.onDelete({ uuid, name, radioGroup });
   }

   onSaveButtonPress() {
      // Perform validation
      const { exercises, uuid, name, radioGroup } = this.props;

      if (!name || name.length === 0) {
         const newState = Object.assign({}, this.state);
         newState.validation.name = {
            isError: true,
            description: 'Name cannot be empty'
         }
         this.setState(newState);
         return;
      }

      for (const i in exercises) {
         const exercise = exercises[i];

         if ((uuid && uuid !== exercise.uuid) && (name === exercise.name)) {
            const newState = Object.assign({}, this.state);
            newState.validation.name = {
               isError: true,
               description: 'Name already taken'
            }
            this.setState(newState);
            return;
         }
      }


      // Call function that was passed as prop from parent
      this.props.onSubmit({ name, radioGroup });
   }

   render() {
      const { validation } = this.state;

      return (
         <Container>

            <Content>
               <Form>
                  <Item stackedLabel error={validation.name.isError}>
                     <Label>Exercise Name</Label>
                     <Input onChangeText={this.onNameChange} value={this.props.name} />
                  </Item>
                  {
                     validation.name.isError &&
                     <Text style={{ color: 'red', marginLeft: 14 }}>
                        {validation.name.description}
                     </Text>
                  }
                  <Item stackedLabel>
                     <Label>Weight Type</Label>
                     {this.createWeightTypeRadioGroup()}
                  </Item>
               </Form>
            </Content>

            <Footer>
               <FooterTab>
                  {
                     this.props.onDelete &&
                     <Button onPress={this.onDeleteButtonPress} full danger>
                        <H3>Delete</H3>
                     </Button>
                  }
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
   radioButton: {
      marginLeft: 7
   },
   saveButtonText: {
      color: 'white'
   }
};

const mapStateToProps = (state) => {
   const { uuid, name, radioGroup } = state.exerciseForm;
   const { exercises } = state;

   return { exercises, uuid, name, radioGroup };
};

export default connect(mapStateToProps, { updateExerciseForm })(ExerciseForm);
