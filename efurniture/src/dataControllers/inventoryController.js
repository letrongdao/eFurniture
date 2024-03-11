export const getInventoryItem = () => {
  return fetch("http://localhost:3344/inventoryItems").then((res) => res.json());
};

export const getInventoryItemById = (id) => {
  return fetch(`http://localhost:3344/inventoryItems/${id}`).then((res) => res.json());
};

export const createBooking = (data) => {
  return fetch(`http://localhost:3344/inventoryItems`, {
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

export const updateInventoryItem = (id, data) => {
  return fetch(`http://localhost:3344/inventoryItems/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}
