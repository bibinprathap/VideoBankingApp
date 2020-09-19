// Initial State
const initialState = {
  counter: 0,
  basicprofile:{name:'', email:'', mobile:'', accounttype:false},
  CustomerInformation:{clicked:'',currency:'',status:''},
};

// Reducers (Modifies The State And Returns A New State)
const bankProfileReducer = (state = initialState, action) => {
switch (action.type) {
  // Increase Counter
  case 'INCREASE_COUNTER': {
    return {
      // State
      ...state,
      // Redux Store
      counter: state.counter + 1,
    }
  }

  // Decrease Counter
  case 'DECREASE_COUNTER': {
    return {
      // State
      ...state,
      // Redux Store
      counter: state.counter - 1,
    }
  }
  // Decrease Counter
  case 'INFO_CHANGED': {
      return {
        // State
        ...state,
        // Redux Store
        [action.payload.property]: action.payload.propertyvalue,
      }
    }

  // Default
  default: {
    return state;
  }
}
};

// Exports
export default bankProfileReducer;