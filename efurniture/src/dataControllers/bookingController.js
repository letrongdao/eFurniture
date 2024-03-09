import axios from "axios";

export const getBooking = () => {
  return fetch("http://localhost:3344/bookings").then((res) => res.json());
};

export const getBookingById = (id) => {
  return fetch(`http://localhost:3344/bookings/${id}`).then((res) => res.json());
};

export const createBooking = (data) => {
  return fetch(`http://localhost:3344/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
    .then(responseData => {
      console.log("Update successful", responseData);
    })
    .catch(error => {
      console.error('There was a problem with the updateUser request:', error);
    });
}

export const updateBooking = (id, data) => {
  return fetch(`http://localhost:3344/bookings/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}

export const approveBooking = async (id) => {
  try {
    const response = await axios.patch(`http://localhost:3344/bookings/${id}`);
    console.log('Booking Approved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error marking booking approved:', error);
    throw error;
  }
};

export const deleteBooking = (id) => {
  return fetch(`http://localhost:3344/bookings/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}
