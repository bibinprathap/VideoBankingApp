import Axios from 'axios';
export const BookingServices = {
  createBooking: payload => {
    return new Promise((resolve, reject) => {
      Axios.post('/api/booking/createbooking', payload)
        .then(response => {
          resolve((response.data && response.data) || null);
        })
        .catch(err => {
          reject((err.response && err.response && err.response.data) || err);
        });
    });
  }
};
