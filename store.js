import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
  searchTerm: '',
  countries: [],
  countryDetail: null
};

export const actionTypes = {
  SEARCH_TEXT: 'SEARCH_TEXT',
  RETRIEVE_COUNTRIES: 'RETRIEVE_COUNTRIES',
  SET_COUNTRY_DETAIL: 'SET_COUNTRY_DETAIL',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_COUNTRIES:
      return Object.assign({}, state, {countries: action.resultData});
    case actionTypes.SEARCH_TEXT:
      return Object.assign({}, state, {searchTerm: action.searchTerm});
      case actionTypes.SET_COUNTRY_DETAIL:
      return Object.assign({}, state, {countryDetail: action.countryDetail});
    default:
      return state;
  }
};

export const handleSearchInput = term => dispatch => dispatch({type: actionTypes.SEARCH_TEXT, searchTerm: term});

export const addAllCountries = data => dispatch => dispatch({type: actionTypes.RETRIEVE_COUNTRIES, resultData: data});


export const setCountryDetail = data => dispatch => dispatch({type: actionTypes.SET_COUNTRY_DETAIL, countryDetail: data});


export const initStore = (initialState = exampleInitialState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
