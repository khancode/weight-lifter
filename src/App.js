import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

// TODO: remove import when deploying
import { AsyncStorage } from 'react-native';

class App extends Component {
   async componentWillMount() {
      // TODO: remove when deploying
      // await AsyncStorage.removeItem('WORKOUTS', null);
      // await AsyncStorage.removeItem('EXERCISES', null);
      // console.log('componentWillMount in App');
   }

   render() {
      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

      return (
         <Provider store={store}>
            <Router />
         </Provider>
      );
   }
}

export default App;
