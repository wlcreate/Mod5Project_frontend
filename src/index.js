import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css' // adds semantic ui

// ROUTING STUFF
import {BrowserRouter} from 'react-router-dom'

// REDUX STUFF
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

// Reducer (aka function definition)
  // Return value of this becomes the global state

// ------ Categories Reducer ------
let initialStateOfCategoryReducer = {
  categories: []
}

let categoryReducer = (state = initialStateOfCategoryReducer, action) => {
  switch(action.type){
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }
}

// ------ User Reducer ------
let initialStateOfUserReducer = {
  username: "",
  full_name: "",
  token: "",
  trips: [],
  chosen_trip: {},
  places: [],
  reflections: []
}

let userReducer = (state = initialStateOfUserReducer, action) => {
  switch(action.type){
    case "SET_USER_INFO":
      // console.log(action.payload)
      return {
        ...state,
        username: action.payload.user.username,
        full_name: action.payload.user.full_name,
        token: action.payload.token,
        trips: action.payload.user.trips
      }
    case "LOG_OUT_USER":
      // console.log("IN userReducer LOG_OUT_USER")
      return initialStateOfUserReducer
    case "SET_PLACES":
      // console.log("THIS IS FROM TRIP CARD:", action.payload)
      return {
        ...state,
        chosen_trip: action.payload,
        places: action.payload.places
      } 
    case "SET_REFLECTIONS":
      // console.log("THIS IS FROM PLACE CARD:", action.payload)
      return {
        ...state,
        reflections: action.payload
      }
    case "ADD_TRIP":
      let copyOfTrips = [...state.trips, action.payload]
      return {
        ...state,
        trips: copyOfTrips
      }
    case "ADD_PLACE":
      let copyOfPlaces = [...state.places, action.payload.place]
      return {
        ...state,
        trips: action.payload.user.trips,
        chosen_trip: action.payload.chosen_trip,
        places: copyOfPlaces
      }
    default:
      return state
  }
}

// combineReducers takes in a POJO
  // the keys of the POJO become the highest level keys of global state
  // the values of the POJO are the reducers

// Any time that an action gets dispatched, all the reducers handle it

let thePojo = {
  categories: categoryReducer,
  user: userReducer
}

let rootReducer = combineReducers(thePojo)

let storeObj = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={storeObj}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);