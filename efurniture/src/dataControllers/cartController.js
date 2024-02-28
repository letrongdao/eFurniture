export const addItemToCart = (data) => {
  return fetch(`http://localhost:3344/cart`, {
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

//GET all cart_items with user_id
export const getCartItems = (user_id) => {
  return fetch(`http://localhost:3344/cart?user_id=${user_id}`).then((res) => res.json());
};

//POST delete from cart_items with user_id, product_id
export const deleteCartItem = (user_id, product_id) => {
  return fetch(`http://localhost:3344/cart?user_id=${user_id}&product_id=${product_id}`, {
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

//UPDATE cart_items with user_id, product_id, quantity
export const updateCartItem = (data) => {
  return fetch(`http://localhost:3344/cart`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}

//POST add product to cart_items with user_id, product_id, quantity
export const addProductToCart = (data) => {
  return fetch(`http://localhost:3344/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}