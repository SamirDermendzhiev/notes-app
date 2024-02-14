import Axios from "axios";
import { deleteNotesForAuthor } from "./notes.api";

const apiUrl = "http://localhost:3000/users";

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export async function getAllUsers(params) {
  const allUsers = await (await Axios.get(`${apiUrl}`)).data;
  if (!params) return allUsers;
  const lowerParam = params.toLowerCase();
  return allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerParam) ||
      user.email.toLowerCase().includes(lowerParam)
  );
}

export function getUserById(id) {
  return Axios.get(`${apiUrl}/${id}`);
}

export async function register(userData) {
  const users = await getAllUsers();

  if (users.find((u) => u.email === userData.email)) {
    throw new Error("Email already exists!");
  }

  userData = {
    ...userData,
    isActive: true,
    isAdmin: false,
    picture: "http://picsum.photos/200/300?random=2",
  };
  return Axios.post(`${apiUrl}`, userData);
}
export async function login(userData) {
  const users = await getAllUsers();

  const loggedUser = users.find(
    (u) =>
      u.email === userData.email && u.password.toString() === userData.password
  );

  if (loggedUser && !loggedUser.isActive) {
    throw new Error("The curent user has been blocked!");
  }

  if (loggedUser) {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    return;
  }

  throw new Error("Incorrect username/password");
}

export function logout() {
  localStorage.removeItem("loggedUser");
}

export function saveUser(userData) {
  if (userData.id) {
    return Axios.put(`${apiUrl}/${userData.id}`, userData);
  }

  return register(userData);
}

export function deleteUser(id) {
  deleteNotesForAuthor(id);
  return Axios.delete(`${apiUrl}/${id}`);
}
