export const getProduct = () => {
  return fetch("http://localhost:3344/products").then((res) => res.json());
};

export const getProductById = (id) => {
  return fetch(`http://localhost:3344/products/${id}`).then((res) => res.json());
}

export const addProduct = (data) => {
  return fetch(`http://localhost:3344/products`, {
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

export const updateProduct = (id, data) => {
  return fetch(`http://localhost:3344/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}

export const deleteProduct = (id) => {
  return fetch(`http://localhost:3344/products/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
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
