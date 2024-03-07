import axios from "axios";

export const getBooking = () => {
  return fetch("http://localhost:3344/bookings").then((res) => res.json());
};

export const getBookingById = (id) => {
  return fetch(`http://localhost:3344/bookings/${id}`).then((res) => res.json());
};

export const addBooking = () => {
  return fetch(`http://localhost:3344/bookings`, {
    method: 'POST',
  }).then(res => res.json())
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
