// Initial State
const initialState = {
    env: 'bibin',
    title: 'test',
    baseURL: 'http://atexapi.urukit.com' 
  };
  
// Reducers (Modifies The State And Returns A New State)
const environmentReducer = (state = initialState, action) => {
  switch (action.type) { 
       // Decrease Counter
    case 'ENVIRONMENT_INFO_CHANGED': {
        return {
          // State
          ...state,
          // Redux Store
          ...action.payload.propertyvalue,
        }
      }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default environmentReducer;