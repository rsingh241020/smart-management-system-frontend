const BASE = "http://localhost:8080";

const authHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

const parseResponse = async (res) => {
  const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.text();
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return parseResponse(res);
};

export const getMyTasks = async () => {
  const res = await fetch(`${BASE}/api/tasks/my`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to load tasks");
  }

  return parseResponse(res);
};

export const updateTask = async (id, status) => {
  const res = await fetch(`${BASE}/api/tasks/${id}/status?status=${status}`, {
    method: "PATCH",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }
};

export const getSummary = async () => {
  const res = await fetch(`${BASE}/api/tasks/summary`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to load summary");
  }

  return parseResponse(res);
};

export const getAllTasks = async () => {
  const res = await fetch(`${BASE}/api/tasks`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to load all tasks");
  }

  return parseResponse(res);
};

export const createTask = async (data) => {
  const res = await fetch(`${BASE}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return parseResponse(res);
};

export const createProject = async (data) => {
  const res = await fetch(`${BASE}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return parseResponse(res);
};
