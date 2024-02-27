export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getProduct = () => {
  return fetch("http://localhost:3344/products").then((res) => res.json());
};

export const deleteProduct = (id) => {
  return fetch(`http://localhost:3344/products/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}

export const editProduct = (id) => {
  return fetch(`htpp://localhost:3344/products/${id}`, {
    method: 'PATCH',
  })
    .then(res => res.json());
}

export const getUser = () => {
  return fetch("http://localhost:3344/users").then((res) => res.json());
};

export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};