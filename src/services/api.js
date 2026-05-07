const BASE = "http://localhost:8080";

export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.text();
};

export const getMyTasks = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/api/tasks/my`, {
    headers: { Authorization: "Bearer " + token },
  });
  return res.json();
};

export const updateTask = async (id, status) => {
  const token = localStorage.getItem("token");
  await fetch(`${BASE}/api/tasks/${id}/status?status=${status}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + token },
  });
};

export const getSummary = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/api/tasks/summary`, {
    headers: { Authorization: "Bearer " + token },
  });
  return res.json();
};