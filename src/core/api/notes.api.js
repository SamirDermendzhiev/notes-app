import Axios from "axios";
import { getLoggedUser } from "./users.api";

const apiUrl = "http://localhost:3000/notes";

export const NoteStatus = {
  Active: "Active",
  Pending: "Pending",
  Done: "Done",
};

export async function getAllNotes(params) {
  const allNotes = (await Axios.get(`${apiUrl}`)).data;
  if (!params) return allNotes;
  const lowerParam = params.toLowerCase();
  return allNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(lowerParam) ||
      note.content.toLowerCase().includes(lowerParam)
  );
}

export function getNoteById(id) {
  return Axios.get(`${apiUrl}/${id}`);
}

export async function getNotesByAuthorId(authorId, searchParams) {
  const allNotes = await getAllNotes(searchParams);

  return allNotes.filter((note) => note.authorId === authorId);
}

export function getMyNotes(searchParams) {
  const loggedUserId = getLoggedUser().id;

  return getNotesByAuthorId(loggedUserId, searchParams);
}

export function saveNote(noteData) {
  const loggedUser = getLoggedUser();

  if (noteData.id) {
    return Axios.put(`${apiUrl}/${noteData.id}`, noteData);
  }
  noteData.authorId = loggedUser.id;
  noteData.authorName = loggedUser.name;
  noteData.date = new Date();
  if (!noteData.status) noteData.status = NoteStatus.Active;

  return Axios.post(`${apiUrl}`, noteData);
}

export function deleteNote(id) {
  return Axios.delete(`${apiUrl}/${id}`);
}

export async function deleteNotesForAuthor(authorId) {
  const notes = await getNotesByAuthorId(authorId);

  notes.forEach((note) => {
    deleteNote(note.id);
  });
}
