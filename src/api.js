const API_URL = 'http://localhost:3001/api/v1';

// Auth API
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  });
  return await response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return await response.json();
};

// Task API
export const getTasks = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const addTask = async (task) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  return await response.json();
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token"); // if your backend uses JWT
  const response = await fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return true;
};


export const toggleTaskCompletion = async (id, completed) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ completed })
  });
  return await response.json();
};