// Increase Counter
export const increaseCounter = () => ({
    type: 'INCREASE_COUNTER',
  });
  
  // Decrease Counter
  export const decreaseCounter = () => ({
    type: 'DECREASE_COUNTER',
  });
  // Decrease Counter
  export const infoChanged = (property,propertyvalue ) => ({
    type: 'INFO_CHANGED',
    payload:{property,propertyvalue}
  });