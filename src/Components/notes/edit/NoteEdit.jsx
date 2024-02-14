import React from "react";
import { useState } from "react";
import { saveNote, getNoteById } from "../../../core/api/notes.api";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

export function NoteEdit(props) {
  const [curentNote, setCurentNote] = useState({
    title: "",
    content: "",
    auhotId: "",
    authorName: "",
    date: "",
    status: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (props.computedMatch.params.id) {
      getNoteById(props.computedMatch.params.id).then((result) => {
        setCurentNote(result.data);
      });
    }
  }, [props.computedMatch.params.id]);

  const onInputChange = (event) => {
    event.persist();
    setCurentNote((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onNoteSave = (event) => {
    event.preventDefault();
    saveNote(curentNote)
      .then(() => {
        setShouldRedirect(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {shouldRedirect && <Redirect to="/notes" />}
      <div className="note-edit-wrapper">
        <form onSubmit={onNoteSave}>
          <div className="form-group">
            <label labelfor="title">Title:</label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              onChange={onInputChange}
              value={curentNote.title}
            />
          </div>
          <div className="form-group">
            <label labelfor="content">Content:</label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              onChange={onInputChange}
              value={curentNote.content}
            />
          </div>
          <div className="form-group">
            <label labelfor="staus">Status: </label>
            <select
              name="status"
              id="status"
              className="form-control"
              onChange={onInputChange}
              value={curentNote.status}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button className="btn btn-primary">Save note</button>
        </form>
      </div>
    </>
  );
}
