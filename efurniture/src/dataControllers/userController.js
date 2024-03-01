export const getUser = () => {
  return fetch("http://localhost:3344/users").then((res) => res.json());
};

export const getUserById = (id) => {
  return fetch(`http://localhost:3344/users/${id}`).then((res) => res.json());
};

export const addUser = () => {
  return fetch(`http://localhost:3344/users`, {
    method: 'POST',
  }).then(res => res.json())
}

export const updateUser = (id, data) => {
  return fetch(`htpp://localhost:3344/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}

export const deleteUser = (id) => {
  return fetch(`http://localhost:3344/users/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}
