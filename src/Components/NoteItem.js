import config from '../config';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";

function deleteNoteRequest(noteId, callback) {
  fetch(`${config.REACT_APP_DB_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      callback(noteId);
    })
    .catch(error => {
      console.error(error);
    });
}

export default class NoteItem extends Component {
  static contextType = NotefulContext;

  render() {
    const { id, name, date_modified } = this.props.note;
    const date = new Date(date_modified);

    return (
      <div className="main__note-item" key={id}>
        <div className="leftSide">
          <p className="itemName">{name}</p>
          <p>{date.toDateString()}</p>
        </div>
        <div className="rightSide">
          <button type="button" onClick={() => deleteNoteRequest(id, this.context.deleteNote)}>
            Delete note
          </button>
        </div>
      </div>
    );
  }
}
