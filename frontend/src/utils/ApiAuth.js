export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err));
}
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
  }
export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err));
};