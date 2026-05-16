// src/services/api.js

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// ===============================
// AUTH HEADER
// ===============================

const authHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

// ===============================
// RESPONSE PARSER
// ===============================

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

// ===============================
// ERROR HANDLER
// ===============================

const getErrorMessage = async (res, fallbackMessage) => {
  const payload = await parseResponse(res);

  if (typeof payload === "string" && payload.trim()) {
    return payload.trim();
  }

  if (payload && typeof payload === "object") {
    if (typeof payload.message === "string" && payload.message.trim()) {
      return payload.message.trim();
    }

    if (typeof payload.error === "string" && payload.error.trim()) {
      return payload.error.trim();
    }
  }

  return fallbackMessage;
};

// ===============================
// COMMON REQUEST FUNCTION
// ===============================

const request = async (
  path,
  options = {},
  fallbackMessage = "Request failed",
) => {
  try {
    const res = await fetch(`${BASE}${path}`, options);

    if (!res.ok) {
      throw new Error(await getErrorMessage(res, fallbackMessage));
    }

    return parseResponse(res);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Unable to reach server at ${BASE}`, { cause: error });
    }

    throw error;
  }
};

// ===============================
// AUTH APIs
// ===============================

export const loginUser = async (data) => {
  const res = await request(
    "/api/users/login",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },

    "Login failed",
  );

  return typeof res === "string" ? res : "";
};

export const registerUser = async (data) =>
  request(
    "/api/users/register",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },

    "Registration failed",
  );

// ===============================
// TASK APIs
// ===============================

// MY TASKS

export const getMyTasks = async () =>
  request(
    "/api/tasks/my",
    {
      headers: authHeaders(),
    },

    "Failed to load tasks",
  );

// ALL TASKS

export const getAllTasks = async () =>
  request(
    "/api/tasks",
    {
      headers: authHeaders(),
    },

    "Failed to load all tasks",
  );

// CREATE TASK

export const createTask = async (data) =>
  request(
    "/api/tasks",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },

      body: JSON.stringify({
        title: data.title,

        description: data.description,

        status: data.status,

        assignedTo: data.assignedTo,

        dueDate: data.dueDate,

        // ✅ PROJECT RELATION
        project: {
          id: Number(data.projectId),
        },
      }),
    },

    "Failed to create task",
  );

// UPDATE TASK STATUS

export const updateTask = async (id, status) => {
  await request(
    `/api/tasks/${id}/status?status=${status}`,
    {
      method: "PATCH",

      headers: authHeaders(),
    },

    "Failed to update task",
  );
};

// OVERDUE TASKS

export const getOverdueTasks = async () =>
  request(
    "/api/tasks/overdue",
    {
      headers: authHeaders(),
    },

    "Failed to load overdue tasks",
  );

// SUMMARY

export const getSummary = async () =>
  request(
    "/api/tasks/summary",
    {
      headers: authHeaders(),
    },

    "Failed to load summary",
  );

// ===============================
// PROJECT APIs
// ===============================

// CREATE PROJECT

export const createProject = async (data) =>
  request(
    "/api/projects",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },

      body: JSON.stringify(data),
    },

    "Failed to create project",
  );

// GET ALL PROJECTS

export const getAllProjects = async () =>
  request(
    "/api/projects",
    {
      headers: authHeaders(),
    },

    "Failed to load projects",
  );
