// Initial State
const initialState = {
    bookingDetails:{name:'', email: '',  mobile:'', mobiletwo:'', cityId: '', branchId: '', serviceTypeId: ''}
  };
  
// Reducers (Modifies The State And Returns A New State)
const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BOOKING_INFO': {
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
export default bookingReducer;