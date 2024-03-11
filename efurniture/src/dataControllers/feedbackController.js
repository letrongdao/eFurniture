export const getFeedback = () => {
  return fetch("http://localhost:3344/feedbacks").then((res) => res.json());
};

export const getFeedbackById = (id) => {
  return fetch(`http://localhost:3344/feedbacks/${id}`).then((res) => res.json());
};

export const getFeedbackByProductId = (id) => {
  return fetch(`http://localhost:3344/feedbacks/product/${id}`).then((res) => res.json());
}

export const createFeedback = (data) => {
  return fetch(`http://localhost:3344/feedbacks`, {
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

export const updateFeedback = (id, data) => {
  return fetch(`http://localhost:3344/feedbacks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}

export const deleteFeedback = (id) => {
  return fetch(`http://localhost:3344/feedbacks/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}
